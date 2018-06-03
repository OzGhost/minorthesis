import React from 'react'
import { connect } from 'react-redux'
import TaskbarView from '../components/TaskbarView'
import { logout } from '../actions'

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
    name: 'modifier',
    handler: (event, dispatch) => console.log('Noop')
  },
  {
    icon: 'icon_logout.png',
    label: 'Thoát',
    handler: (event, dispatch) => dispatch(logout())
  }
]
const superAdminEntries = []

const stateToProps = state => {
  let items = []
  switch (state.taskbar.role) {

    case 'admin':
      items = [...baseEntries, ...adminEntries]
      break

    case 'superAdmin':
      items = [...baseEntries, ...superAdminEntries, ...adminEntries]
      break

    default:
      items = [...baseEntries, ...guestEntry]
      break
  }
  return { items }
}

const actToProps = dispatch => ( { } )

export default connect(stateToProps)(TaskbarView)

