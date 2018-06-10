import React from 'react'
import Modifier from './Modifier'
import { host, ACCOUNT_CODE } from '../common/Constants'
import RequestPacker from '../common/RequestPacker'

const newModeOnlyFields = ['username', 'passwd', 'repasswd']
const whateverFieldNames = ['name', 'idNumber', 'address']

class AccountModifier extends Modifier {

  getTitle = () => (
    this.editMode ? 'Cập nhật thông tin tài khoản' : 'Thêm mới tài khoản'
  )

  getEditableFields = store => {
    return this.editMode
      ? this.getEditModeFields(store)
      : this.getNewModeFields(store)
  }

  getEditModeFields = store => {
    return [
      {...this.getFieldByFieldName(store, 'username'), readOnly: true},
      ...this.getWhateverFields(store)
    ]
  }

  getWhateverFields = store => {
    return whateverFieldNames.map(fieldName =>
      this.getFieldByFieldName(store, fieldName)
    )
  }

  getNewModeFields = store => {
    return [
      this.getFieldByFieldName(store, 'username'),
      {...this.getFieldByFieldName(store, 'passwd'), hide: true},
      {...this.getFieldByFieldName(store, 'repasswd'), hide: true},
      ...this.getWhateverFields(store)
    ]
  }

  getNamespace = () => (ACCOUNT_CODE)

  buildViewLowerPart = store => {
    const listener = this.makeListenerFor('role')
    return (
      <div className="w3-row">
        <div className="w3-col s5 w3-right-align">
          <label className="w3-text-blue">Nhóm:</label>
        </div>
        <div className="w3-col s7">
          <select
            className="w3-border w3-input"
            onChange={e => listener(Number(e.target.value))}
          >
            <option value="0">...</option>
            <option value="2">Cán bộ</option>
            <option value="1">Quản trị viên</option>
          </select>
        </div>
      </div>
    )
  }

  onSubmit = store => {
    if (!this.qualify(store))
      return
    let data = Object.assign({}, store)
    delete data.repasswd
    this.pendingUI()
    fetch(host + '/account', RequestPacker.packAsPost(data))
      .then(res => res.json())
      .then(resJson => {
        this.resumeUI()
        this.handleResult(resJson)
      })
  }

  qualify = store => {
    let passChecker = this.requiredFieldsFulfilled(
      [
        {value: store.username, trimApply: true, msg: 'Vui lòng nhập tên tài khoản!'},
        {value: store.passwd, msg: 'Vui lòng nhập mật khẩu!'},
        {value: store.repasswd, msg: 'Vui lòng nhập lại mật khẩu!'},
        {value: store.name, trimApply: true, msg: 'Vui lòng nhập tên người dùng!'}
      ]
    )
    if (!passChecker)
      return false
    if (!(store.role == 1 || store.role == 2)) {
      this.pushMessage('Vui lòng chọn nhóm tài khoản!', false)
      return false
    }
    if (store.passwd !== store.repasswd) {
      this.pushMessage('Mật khẩu được lại không trùng khớp!')
      return false
    }
    return true
  }

  requiredFieldsFulfilled = fields => {
    const len = fields.length
    let item
    for (let i = 0; i < len; i++) {
      item = fields[i]
      if (!item.value || (item.trimApply && !item.value.trim())) {
        this.pushMessage(item.msg, false)
        return false
      }
    }
    return true
  }

  handleResult = res => {
    if (res.code === 200) {
      this.pushMessage('Thao tác hoàn tất!', true)
    } else if (res.code === 400) {
      if (res.cause === 'username')
        this.pushMessage(
          'Tên tài khoản đã tồn tại, vui lòng chọn tên tài khoản khác')
      else
        this.pushMessage( 'Xảy ra lỗi cục bộ, vui lòng làm mới trang và thử lại!')
    } else if (res.code === 500) {
      this.pushMessage('Xảy ra lỗi hệ thống, vui lòng thử lại sau!')
    }
  }
}

export default new AccountModifier

