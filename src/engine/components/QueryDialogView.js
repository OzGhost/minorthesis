import React from 'react'
import PropTypes from 'prop-types'
import QuerierFactory from '../common/QuerierFactory'
import Dialog from './Dialog'

class QueryDialogView extends Dialog {
  static propTypes = {
    targets: PropTypes.array.isRequired,
    userRole: PropTypes.string.isRequired,
    targetChangeListener: PropTypes.func.isRequired,
    queryFieldChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    isLoading: PropTypes.bool,
    isActive: PropTypes.bool
  }

  getMetaData = () => ({
    title: 'Truy vấn thuộc tính',
    icon: '../res/icon_query.png',
    styleClass: 'query-dialog'
  })

  buildDialogContent = () => {
    const {targets, targetChangeListener, isLoading, target,
            queryFieldChange, queryData, dispatch,
            hasNoResult} = this.props
    const querier = QuerierFactory.buildFor(target).withDispatch(dispatch)
    const block = { disabled: isLoading }
    return (
      <form onSubmit={event => {
        event.preventDefault()
        querier.performQuery(event, queryData, dispatch)
      }}>
        <div className="w3-row">
          <label>Đối tượng truy vấn:</label>
          <select
              value={target}
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
        <hr/>
        <div className="querier">
          { querier.getView(queryFieldChange, queryData) }
        </div>
        { hasNoResult
          ? (
            <div className="w3-center">
              <hr/>
              <span className="w3-text-orange">
                Không tìm thấy dữ liệu trùng khớp!
              </span>
            </div>
          )
          : ''
        }
        <hr/>
        {
          querier.isAutoLoad()
            ? ''
            : (
              <div className="w3-row">
                <button
                  type="submit"
                  className="w3-btn w3-block w3-blue"
                >
                  Truy vấn
                </button>
              </div>
            )
        }
      </form>
    )
  }
}

export default QueryDialogView

