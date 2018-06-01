import React from 'react'
import PropTypes from 'prop-types'
import Dialog from './Dialog'

class QueryDialogView extends Dialog {
  static propTypes = {
    targets: PropTypes.array.isRequired,
    userRole: PropTypes.string.isRequired,
    targetChangeListener: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    isLoading: PropTypes.bool,
    isActive: PropTypes.bool
  }

  getMetaData = () => ({
    title: 'Property Query',
    icon: '../res/icon_query.png',
    styleClass: 'query-dialog'
  })

  buildDialogContent = () => {
    const {targets, targetChangeListener, isLoading} = this.props
    const block = { disabled: isLoading }
    return (
      <div>
        <div className="w3-row">
          <label>Target:</label>
          <select
              onChange={ (event) => targetChangeListener(event.target.value) }
              className="w3-input w3-border"
              {...block}
          >
            { targets.map( target => (
              <option
                  key={target.value}
                  value={target.value}
              >{target.label}</option>
            ) ) }
          </select>
        </div>
      </div>
    )
  }
}

export default QueryDialogView

