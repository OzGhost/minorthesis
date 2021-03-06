import React from 'react'
import { connect } from 'react-redux'
import TaskbarView from '../components/TaskbarView'
import { logout } from '../actions'
import { MODIFIER_DIALOG, CHPASSWD_DIALOG,
          QUERY_DIALOG, FILTER_DIALOG, RULER_DIALOG,
          LOGIN_DIALOG } from '../common/Constants'

const baseEntries = [
  { icon: 'icon_query.png',   label: 'Truy vấn thuộc tính',  name: QUERY_DIALOG },
  { icon: 'icon_filter.png',  label: 'Ẩn/hiện lớp dữ liệu',  name: FILTER_DIALOG},
  { icon: 'icon_ruler.png',   label: undefined,     name: RULER_DIALOG}
]
const guestEntry = [ {
  icon: 'icon_authen.png',
  label: 'Đăng nhập',
  name: LOGIN_DIALOG
} ]
const adminEntries = [
  {
    icon: 'icon_change_passwd.png',
    label: 'Thay đổi mật khẩu',
    name: CHPASSWD_DIALOG
  },
  {
    icon: 'icon_logout.png',
    label: 'Thoát',
    handler: (event, dispatch) => dispatch(logout())
  }
]
const superAdminEntries = [
  {
    icon: 'icon_modifier.png',
    label: 'Thêm mới dữ liệu',
    name: MODIFIER_DIALOG
  }
]

const stateToProps = state => {
  let items = []
  switch (state.taskbar.role) {

    case 2:
      items = [...baseEntries, ...adminEntries]
      break

    case 1:
      items = [...baseEntries, ...superAdminEntries, ...adminEntries]
      break

    case -1:
      break

    default:
      items = [...baseEntries, ...guestEntry]
      break
  }
  return { items }
}

const actToProps = dispatch => ( { } )

export default connect(stateToProps)(TaskbarView)

