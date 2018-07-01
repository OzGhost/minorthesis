import React from 'react'
import { objectDump } from './DetailDialogView'

const ExtendableItem = ({obj, label}) => {
  return (
    <div className="extendable-item">
      <div className="lever">{label}</div>
      <div className="extension">
        {
          objectDump(obj).map(i => (
            <div className="w3-row" key={i.key}>
              <div className="w3-col s3">{i.key+':'}</div>
              <div className="w3-col s9">{i.value}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ExtendableItem
