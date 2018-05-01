
const { Pool, Client } = require('pg')
var app = require('express')()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thua Dat' },
    { value: 'chusudung', label: 'Chu Su Dung' },
    { value: 'giaychungnhan', label: 'Giay Chung Nhan' },
    { value: 'quyhoach', label: 'Qui Hoach' },
    { value: 'dattochuc', label: 'Dat To Chuc' },
    { value: 'datduan', label: 'Dat Du An' }
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
  pool.query('select gid, tenchu as name, ST_asGeoJSON(geom) as geo from thua_dat limit 3', (err, result) => {
    res.json(result.rows)
    pool.end()
  })
})

var server = app.listen(3000, () => {
  console.log("Server started")
})
