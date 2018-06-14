import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'
import ModifierFactory from '../common/ModifierFactory'
import { EDIT_MODE, ADD_MODE } from '../common/Constants'

class ModifierDialogView extends Dialog {
  static propTypes = {
  }

  getMetaData = props => {
    const modifier = ModifierFactory.buildFor(props.target)
    props.mode === EDIT_MODE
      && modifier.turnOnEditMode()
    return {
      styleClass: 'modifier-dialog',
      title: modifier.getTitle(),
      icon: '../res/icon_modifier.png'
    }
  }

  buildDialogContent = () => {
    const { mode, onChange, targets, target, payload } = this.props
    const modifier = ModifierFactory.buildFor(target)
    modifier.setReactor(this.props.dispatch)
    return (
      <div>
      {
        mode === ADD_MODE
          ?
          <div>
            <div className="w3-row">
              <div className="w3-col s5">
                <label>Đối tượng thêm mới:</label>
              </div>
              <div className="w3-col s7">
                <select
                  className="w3-input w3-border"
                  value={target}
                  onChange={e => onChange('target', e.target.value) }
                >
                  {
                    targets.map(tg =>
                      <option
                        key={tg.code}
                        value={tg.code}
                      >
                        {tg.label}
                      </option>
                    )
                  }
                </select>
              </div>
            </div>
            <hr/>
          </div>
          : ''
      }
      { modifier.buildView(this.props) }
      </div>
    )
  }
}

export default ModifierDialogView
