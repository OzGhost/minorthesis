
var app = require('express')();

const jsonResponse = (res, data) => {
  res.writeHead(200, {
    'ContentType': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  res.end(JSON.stringify(data))
}

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thua Dat' },
    { value: 'chusudung', label: 'Chu Su Dung' },
    { value: 'giaychungnhan', label: 'Giay Chung Nhan' },
    { value: 'quyhoach', label: 'Qui Hoach' },
    { value: 'dattochuc', label: 'Dat To Chuc' },
    { value: 'datduan', label: 'Dat Du An' }
  ]
  jsonResponse(res, layers)
})

const getFieldsByLayerName = layerName => {
  switch (layerName) {
    case 'thuadat':
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
    case 'chusudung':
      return [
        { value: 'TenChu', label: 'Ten Chu' },
        { value: 'DiaChi', label: 'Dia Chi' },
        { value: 'HoTen', label: 'Ho Ten' },
        { value: 'NamSinh', label: 'Nam Sinh' },
        { value: 'SoCMND', label: 'So CMND' },
        { value: 'NgayCap', label: 'Ngay Cap CMND' },
        { value: 'NoiCap', label: 'Noi Cap CMND' },
        { value: 'HoTen2', label: 'Ho Ten 2' },
        { value: 'NamSinh2', label: 'Nam Sinh 2' },
        { value: 'SoCMND2', label: 'So CMND 2' },
        { value: 'NgayCap2', label: 'Ngay Cap CMND 2' },
        { value: 'NoiCap2', label: 'Noi Cap CMND 2' },
        { value: 'Phuong', label: 'Ma Phuong' }
      ]
    case 'giaychungnhan':
      return [
        { value: 'SHBANDO', label: 'So Hieu Ban Do' },
        { value: 'SHThua', label: 'So Hieu Thua' },
        { value: 'SHGiayCN', label: 'So Hieu Giay CN' },
        { value: 'SeriCN', label: 'Seri CN' },
        { value: 'NgayVS', label: 'Ngay Vao So' },
        { value: 'ChinhLy', label: 'Chinh Ly' },
        { value: 'DTPL', label: 'Dien Tich Phap Ly' },
        { value: 'DTRieng', label: 'Dien Tich Rieng' },
        { value: 'DTChung', label: 'Dien Tich Chung' },
        { value: 'Phuong', label: 'Ma Phuong' }
      ]
    case 'quyhoach':
      return [
        { value: 'ObjectID', label: 'Ma Doi Tuong' },
        { value: 'Ma_QH', label: 'Ma Qui Hoach' },
        { value: 'LSD_QH', label: 'LSD_QH' },
        { value: 'KyHieu_QH', label: 'Ky Hieu Qui Hoach' },
      ]
    case 'dattochuc':
      return [
        { value: 'TenToChuc', label: 'Ten To Chuc' },
        { value: 'SoQD', label: 'So Quyet Dinh' },
        { value: 'MucDichSD', label: 'Muc Dinh Su Dung' },
        { value: 'Phuong', label: 'Ma Phuong' }
      ]
    case 'datduan':
      return [
        { value: 'RanhSo', label: 'Ranh So' },
        { value: 'TenDuan', label: 'Ten Du An' },
        { value: 'MucDichDua', label: 'Muc Dich Du An' },
        { value: 'Phuong_Xa', label: 'Phuong Xa' },
        { value: 'DienTich', label: 'Dien Tich' },
        { value: 'So_QD', label: 'So Quyet Dinh' }
      ]
    default:
      return []
  }
}

app.get('/map/layers/:layerName/fields', (req, res) => {
  jsonResponse(res, getFieldsByLayerName( req.params.layerName ))
})

var server = app.listen(3000, () => {
  console.log("Server started")
})
