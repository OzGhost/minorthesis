import React from 'react'

export const host = 'http://localhost:8080'
export const BASE_HASH = 'b4c1db7e5a0dc91b7b739db0c3ece205dd8c9a66'

export const ACCOUNT_CODE = 'accountCode'
export const CERTIFICATE_CODE = 'certificateCode'
export const GOVERN_DOC_CODE = 'governmentDocCode'
export const PLAN_USER_CODE = 'planUserCode'

export const MODIFIER_DIALOG = 'modifierDialog'
export const CHPASSWD_DIALOG = 'chpasswdDialog'
export const DETAIL_DIALOG = 'detailDialog'
export const QUERY_DIALOG = 'queryDialog'
export const FILTER_DIALOG = 'filterDialog'
export const RULER_DIALOG = 'rulerDialog'
export const LOGIN_DIALOG = 'loginDialog'

export const EDIT_MODE = 'edit_mode_for_modifier'
export const ADD_MODE = 'add_mode_for_modifier'

export const FIELD_MASK = {
  kind: k => {
    switch (k) {
      case 2:
        return 'Tôn giáo/Cộng đồng/Ngoại giao'
      case 3:
        return 'Tổ chức kinh doanh'
      default:
        return 'Cá nhân'
    }
  },
  dtpl: maskingArea
}

const maskingArea = area => {
  return (
    <span>
      <span>{area + ' m'}</span>
      <sp>2</sp>
    </span>
  )
}

export const FIELD_LABELS = {
  mucdichsudung: 'Mục đích sử dụng',
  kind: 'Loại chủ sử dụng',
  puserId: 'Mã chủ sử dụng',
  username: 'Tên tài khoản',
  hoten: 'Họ tên',
  cmnd: 'CMND',
  diachi: 'Địa chỉ',
  chucvu: 'Chức vụ',
  shbando: 'Số tờ',
  shthua: 'Số thửa',
  dtpl: 'Diện tích',
  sonha: 'Số nhà',
  tenduong: 'Tên đường',
  thanhpho: 'Thành phố',
  tinh: 'Tỉnh',
  ten: 'Chủ sở hữu',
  shgiaycn: 'Số hiệu GCN',
  nam: 'Năm',
  sogiayto: 'CMND',
  ngaycap: 'Ngày cấp',
  diachi: 'Địa chỉ',
  quoctich: 'Quốc tịch',
  phuong: 'Phường',
  passwd: 'Mật khẩu',
  repasswd: 'Nhập lại mật khẩu',
  name: 'Tên người dùng',
  idNumber: 'CMND/Hộ chiếu',
  address: 'Địa chỉ',
  role: 'Chức vụ',
  docCode: 'Số hiệu văn bản',
  docContent: 'Nội dung',
  docLink: 'Liên kết',
  nationality: 'Quốc tịch',
  groupName: 'Tên tổ chức',
  commerceId: 'Số giấy phép kinh doanh',
  personalName: 'Tên cá nhân',
  birthYear: 'Năm sinh'
}

export const NATIONALITIES = [
  'United States',
  'United Kingdom',
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, The Democratic Republic of The',
  'Cook Islands',
  'Việt Nam'
]
