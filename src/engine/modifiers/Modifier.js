import React from 'react'
import { MODIFIER_DIALOG, FIELD_LABELS } from '../common/Constants'
import { valueChange, stateChange } from '../actions'
import ModifierSimpleRowView from '../components/ModifierSimpleRowView'
import DataLoader from '../common/DataLoader'

class Modifier {
  reactor = undefined
  editMode = false
  callback = false

  setReactor = reactor => {
    this.reactor = reactor
  }

  turnOnEditMode = () => {
    this.editMode = true
  }

  buildView = props => {
    const store = DataLoader.retrieve(props, this.getNamespace()) || {}
    const { msg, isGood, loading } = props
    this.callback = props.callback
    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.onSubmit(store)
      }}>
        <div className="modifier">
          { this.buildViewUpperPart(store) }
          {
            this.getEditableFields(store).map(field =>
              <ModifierSimpleRowView
                key={field.name}
                onChange={this.makeListenerFor(field.name)}
                field={field}
              />
            )
          }
          { this.buildViewLowerPart(store) }
        </div>
        {
          msg
            ? <div>
                <hr/>
                <p className={'w3-center w3-text-'+(isGood ? 'green' : 'red')}>
                  {msg}
                </p>
              </div>
            : ''
        }
        <hr/>
        <button
          className="w3-btn w3-block w3-blue"
          type="submit"
          disabled={!!loading}
        >
          {this.editMode ? 'Cập nhật' : 'Thêm'}
        </button>
      </form>
    )
  }

  buildViewUpperPart = () => ('')

  getEditableFields = () => ([])

  makeListenerFor = locate => value => {
    this.reactor(
      valueChange(MODIFIER_DIALOG, this.getNamespace()+'.'+locate, value)
    )
  }

  getNamespace = () => ('general')

  buildViewLowerPart = () => ('')

  onSubmit = () => {}

  pushMessage = (msg, isGood) => {
    this.reactor(stateChange(MODIFIER_DIALOG, {msg, isGood}))
  }

  getTitle = () => ('Modifier')

  getFieldByFieldName = (store, fieldName) => {
    return {
      name: fieldName,
      value: store[fieldName] || ''
    }
  }

  pendingUI = () => {
    this.reactor(stateChange(MODIFIER_DIALOG, {loading: true}))
  }

  resumeUI = () => {
    this.reactor(stateChange(MODIFIER_DIALOG, {loading: false}))
  }

  handlePayload = payload => payload

  handleResult = (res, payload) => {
    if (res.code === 200) {
      this.pushMessage('Thao tác hoàn tất!', true)
      this.callback(payload)
    } else if (res.code === 400) {
      if (this.handleErrorOnResult(res, payload))
        return
      else
        this.pushMessage( 'Xảy ra lỗi cục bộ,'
                              +' vui lòng làm mới trang và thử lại!')
    } else if (res.code === 500) {
      this.pushMessage('Xảy ra lỗi hệ thống, vui lòng thử lại sau!')
    }
  }

  handleErrorOnResult = () => false
}

export default Modifier

