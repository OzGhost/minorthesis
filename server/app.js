
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
          + ' ORDER BY username'
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

app.post('/account', (req, res) => {
  const flat = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const payload = JSON.parse(flat)
  if (payload.role !== 1 && payload.role !== 2) {
    res.json({code: 400, cause: 'role'})
    return
  }
  if (!payload.name) {
    res.json({code: 400, cause: 'name'})
    return
  }
  const q = 'SELECT id FROM taikhoan WHERE username = \'' + payload.username + '\''
  performQuery(q, rows => {
    if (rows.length === 0)
      performAccountInsert(payload, res)
    else
      res.json({code: 400, cause: 'username'})

  })
})

const performAccountInsert = (payload, res) => {
  const pairArray = convertPayload(
    payload, accountKeyMap, accountKeyNumber, accountKeyEncrypt)
  const insertQuery = buildInsertQuery(pairArray, 'taikhoan')
  performQuery(insertQuery, (_, rowCount) => {
    rowCount === 1
      ? res.json({code: 200})
      : res.json({code: 500})
  })
}

const accountKeyMap = {
  username: 'username',
  passwd: 'password',
  name: 'hoten',
  idNumber: 'cmnd',
  address: 'diachi',
  role: 'chucvu'
}

const accountKeyNumber = {
  role: true
}

const accountKeyEncrypt = {
  passwd: true
}

convertPayload = (payload, keyMap, numberType, encryptField) => {
  let pairArray = []
  const keys = Object.keys(payload)
  const len = keys.length
  for (let i = 0; i < len; i++) {
    if (!keyMap[keys[i]])
      continue
    pairArray.push(keyMap[keys[i]])
    if (numberType[keys[i]])
      pairArray.push(payload[keys[i]])
    else if (encryptField[keys[i]])
      pairArray.push('md5('+'\''+payload[keys[i]]+'\''+')')
    else
      pairArray.push('\''+payload[keys[i]]+'\'')
  }
  return pairArray
}

buildInsertQuery = (pairArray, tableName) => {
  const len = pairArray.length
  if (len < 2)
    return ''
  let firstPhase = 'INSERT INTO '+tableName+'(' + pairArray[0]
  let secondPhase = 'VALUES(' + pairArray[1]
  for (let i = 2; i < len - 1; i+=2){
    firstPhase += (',' + pairArray[i])
    secondPhase += (',' + pairArray[i+1])
  }
  return firstPhase + ') ' + secondPhase + ')'
}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thửa đất' },
    { value: 'quihoach', label: 'Quy hoạch' }
  ]
  res.json(layers)
})

var server = app.listen(8080, () => {
  console.log("Server started")
})
