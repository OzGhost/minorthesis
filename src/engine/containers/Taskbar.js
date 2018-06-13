import React from 'react'
import { connect } from 'react-redux'
import TaskbarView from '../components/TaskbarView'
import { logout } from '../actions'
import { MODIFIER_DIALOG, CHPASSWD_DIALOG } from '../common/Constants'

const baseEntries = [
  { icon: 'icon_query.png',   label: 'Truy vấn thuộc tính',    name: 'query' },
  { icon: 'icon_filter.png',  label: 'Ẩn/hiện lớp dữ liệu',  name: 'filter' },
  { icon: 'icon_ruler.png',   label: undefined,     name: 'ruler' }
]
const guestEntry = [ { icon: 'icon_authen.png', label: 'Đăng nhập', name: 'login' } ]
const adminEntries = [
  {
    icon: 'icon_modifier.png',
    label: 'Thêm mới dữ liệu',
    name: MODIFIER_DIALOG
  },
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

const stateToProps = state => {
  let items = []
  switch (state.taskbar.role) {

    case 2:
      items = [...baseEntries]
      break

    case 1:
      items = [...baseEntries, ...adminEntries]
      break

    default:
      items = [...baseEntries, ...guestEntry]
      break
  }
  return { items }
}

const actToProps = dispatch => ( { } )

export default connect(stateToProps)(TaskbarView)

