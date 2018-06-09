
const { Pool, Client } = require('pg')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser') 

const AS_NUMBER = 'format as number'
const AS_STRING = 'format as string'

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const performQuery = (queryStr, resolve, reject) => {
  const pool = new Pool()
  pool.query(queryStr, (err, result) => {
    result
      ? resolve(result.rows, result.rowCount)
      : reject(err, result)
    pool.end()
  })
}

app.get('/plan', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE shbando=' + (Number(req.query.msto) || 0)
                  + ' AND shthua=' + (Number(req.query.msthua) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/plan/features/:featureId', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE gid=' + (Number(req.params.featureId) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/certificate', (req, res) => {
  const shortInfo = 'c.ten, d.shgiaycn,'
  const fullInfo = shortInfo
                  + ' c.machu, c.loaichu, c.nam, c.sogiayto, c.ngaycap,'
                  + 'c.diachi, c.quoctich, '
  const additionalInfo = fullInfo
  const val = req.query.value
  const q = req.query.kind === 'certiNumber'
            ? buildCertificateQueryByCertificateNumber(val, additionalInfo)
            : buildCertificateQueryByOwnerId(val, additionalInfo)

  performQuery(q, (obj) => res.json(obj), true)
})

const buildCertificateQueryByCertificateNumber = (value, additionalInfo) => {
  return buildCertificateCoreQuery(additionalInfo)
    + ' WHERE d.shgiaycn=\'' + value + '\''
}

const buildCertificateQueryByOwnerId = (value, additionalInfo) => {
  return buildCertificateCoreQuery(additionalInfo)
    + ' WHERE c.sogiayto=\'' + value + '\''
}

const buildCertificateCoreQuery = additionalInfo => {
  return 'SELECT ' + additionalInfo
            + ' d.gid, d.shbando, d.shthua, d.dtpl, d.sonha, d.tenduong,'
            + ' d.phuong, d.thanhpho, d.tinh, ST_asGeoJSON(geom) as geo'
            + ' FROM chusudung c'
            + ' LEFT JOIN chusudung_giaychungnhan s ON s.machu = c.machu'
            + ' LEFT JOIN thuadat d ON d.shgiaycn = s.shgiaycn'
}

app.get('/government-doc', (req, res) => {
  const q = 'SELECT sohieu, noidung, link FROM vanbannhanuoc'
  performQuery(q, objs => res.json(objs), true)
})

app.get('/account', (req, res) => {
  const q = 'SELECT id, username, hoten, cmnd, diachi, chucvu'
          + ' FROM taikhoan'
  performQuery(q, objs => res.json(objs), true)
})

app.post('/account/reset-passwd', (req, res) => {
  const bodyStr = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const body = JSON.parse(bodyStr)
  const checkPasswdScript = 'SELECT id'
                          + ' FROM taikhoan'
                          + ' WHERE id = 9'
                          + ' AND password = md5(\'' + body.oldPass + '\')'
  const updateScript = 'UPDATE taikhoan'
                        + ' SET password = md5(\'' + body.newPass + '\')'
                        + ' WHERE id = 9'
  performQuery(checkPasswdScript, rows => {
    if (rows.length === 1) {
      performQuery(updateScript, (_, rowCount) => {
        if (rowCount === 1)
          res.json({done: true})
        else
          res.json({done: false, code: 500})
      })
    } else {
      res.json({done: false, code: 401})
    }
  })
})

app.get('/plan-user', (req, res) => {
  const kind = InputHandler.format(req.query.kind, AS_STRING)
  const value = InputHandler.format(req.query.value, AS_STRING)
  const fieldName = getPlanUserFieldNameByKind(kind)
  const condition = getConditionPhase(fieldName, value)
  const queryStr = 'SELECT * FROM chusudung WHERE ' + condition
  performQuery(queryStr, objs => res.json(objs), true)
})

getPlanUserFieldNameByKind = kind => {
  switch(kind) {
    case 'name':
      return 'ten'
    case 'id':
    default:
      return 'sogiayto'
  }
}

getConditionPhase = (fieldName, value) => {
  switch(fieldName) {
    case 'ten':
      return "UPPER(ten) like '%"+value.toUpperCase()+"%'"
    case 'sogiayto':
      return "sogiayto = '"+value+"'"
    default:
      return '0=1'
  }
}

InputHandler = {
  format: (input, outputFormat) => {
    switch(outputFormat) {
      case AS_NUMBER:
        return Number(input)
      case AS_STRING:
        return (''+input).replace("'", "''")
      default:
        return undefined
    }
  }
}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thửa đất' },
    { value: 'quihoach', label: 'Quy hoạch' }
  ]
  res.json(layers)
})

const getFieldsByLayerName = layerName => {
  switch (layerName) {
    default:
      return [
        { value: 'ThuaID', label: 'Ma Thua' },
        { value: 'XaID', label: 'Ma Xa' },
        { value: 'SHBanDo', label: 'So Hieu Ban Do' },
        { value: 'SHThua', label: 'So Hieu Thua' },
        { value: 'TenChu', label: 'Ten Chu' },
        { value: 'KH2003', label: 'Ke Hoach 2003' },
        { value: 'SHGiayCN', label: 'So Hieu Giay Chung Nhan' },
        { value: 'DTPL', label: 'Dien Tich Phap Ly' },
        { value: 'SoNha', label: 'So Nha' },
        { value: 'TenDuong', label: 'Ten Duong' },
        { value: 'Phuong', label: 'Ma Phuong' }
      ]
  }
}

app.get('/map/layers/:layerName/fields', (req, res) => {
  res.json(getFieldsByLayerName( req.params.layerName ))
})

app.get('/map/layers/:layerName/fields/:field/values', (req, res) => {
  res.json([
    "Dump value 01",
    "Dump value 02"
  ])
})

const connectString = 'postgresql://oz:ngaymai@localhost:5432/mydb'

app.get('/map/layers/:layerName/fields/:field/values/:val', (req, res) => {
  const pool = new Pool()
  pool.query('select gid, tenchu as name, ST_asGeoJSON(geom) as geo from thuadat limit 3', (err, result) => {
    res.json(result.rows)
    pool.end()
  })
})

app.post('/login', (req, res) => {
  let result = {}
  switch (req.body.username) {
    case 'admin':
      result.isPass = true
      result.role = 'admin'
      break
    case 'su':
      result.isPass = true
      result.role = 'superAdmin'
      break
    default:
      result.isPass = false
      break
  }
  res.json(result)
})

var server = app.listen(3000, () => {
  console.log("Server started")
})
