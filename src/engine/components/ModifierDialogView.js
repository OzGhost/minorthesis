import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class ModifierDialogView extends Dialog {
  static propTypes = {
  }

  getMetaData = () => ({
    styleClass: 'modifier-dialog',
    title: 'Modifier',
    icon: '../res/icon_modifier.png'
  })

  buildDialogContent = () => {
    const { mode, onChange, targets } = this.props
    return (
      <div>
        {
          mode === 'add'
            ? <div>
                <div className="w3-row">
                  <label>Đối tượng thêm mới:</label>
                </div>
                <div className="w3-row">
                  <select
                    className="w3-input w3-border"
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
            : ''
        }
      </div>
    )
  }
}

export default ModifierDialogView
