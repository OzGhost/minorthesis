
const { Pool, Client } = require('pg')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser') 

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const performQuery = (queryStr, callback, all) => {
  const pool = new Pool()
  pool.query(queryStr, (err, result) => {
    const obj = (result && result.rows.length > 0)
      ? (all ? result.rows : result.rows[0])
      : {}
    pool.end()
    callback(obj)
  })
}

app.get('/thuadat', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE shbando=' + (Number(req.query.msto) || 0)
                  + ' AND shthua=' + (Number(req.query.msthua) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/thuadat/features/:featureId', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE gid=' + (Number(req.params.featureId) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/giaychungnhan', (req, res) => {
  const shortInfo = 'c.ten, d.shgiaycn,'
  const fullInfo = shortInfo
                  + ' c.machu, c.loaichu, c.nam, c.sogiayto, c.ngaycap,'
                  + 'c.diachi, c.quoctich, '
  const q = 'SELECT ' + shortInfo
            + ' d.gid, d.shbando, d.shthua, d.dtpl, d.sonha, d.tenduong,'
            + ' d.phuong, d.thanhpho, d.tinh, ST_asGeoJSON(geom) as geo'
            + ' FROM chusudung c'
            + ' LEFT JOIN chusudung_giaychungnhan s ON s.machu = c.machu'
            + ' LEFT JOIN thuadat d ON d.shgiaycn = s.shgiaycn'
            + ' WHERE c.sogiayto=\'' + (Number(req.query.id) || 0) + '\''

  performQuery(q, (obj) => res.json(obj), true)
})

app.get('/vanbannhanuoc', (req, res) => {
  const q = 'SELECT sohieu, noidung, link FROM vanbannhanuoc'
  performQuery(q, objs => res.json(objs), true)
})


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thua Dat' },
    { value: 'quihoach', label: 'Qui Hoach' }
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
