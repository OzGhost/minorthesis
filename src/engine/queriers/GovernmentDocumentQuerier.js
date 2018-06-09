import React from 'react'
import Querier from './Querier'
import DataLoader from '../common/DataLoader'
import { loadDocs, host, queryFieldChange } from '../actions'

class GovernmentDocumentQuerier extends Querier {
  didInitial = false

  getView = (onChange, queryData) => {
    if (!queryData.doc)
      this.loadDocs()

    const docs = DataLoader.retrieve(queryData, 'doc.docs') || []
    return(
      <div>
        <div className="w3-row">
          <label className="w3-text-blue">Văn bản nhà nước:</label>
        </div>
        <div className="w3-row">
          <select
            className="w3-input w3-border"
            onChange={event => {
              onChange('doc.selected', Number(event.target.value))
            }}
          >
            {
              docs.map((item, index) =>
                <option
                    key={item.sohieu}
                    value={index}
                >
                  {'['+item.sohieu+'] '+item.noidung}
                </option>
              )
            }
          </select>
        </div>
      </div>
    )
  }

  loadDocs = () => {
    if (this.didInitial)
      return
    this.didInitial = true
    fetch(host + '/government-doc')
      .then(res => res.json())
      .then(json => {
        this.dispatch(queryFieldChange('doc.docs', json))
      })
  }
  
  performQuery = (event, queryData) => {
    const docs = DataLoader.retrieve(queryData, 'doc.docs')
    const index = DataLoader.retrieve(queryData, 'doc.selected') || 0
    const tag = document.createElement('a')
    tag.href = docs[index].link
    tag.target = '_blank'
    document.body.appendChild(tag)
    tag.click()
    document.body.removeChild(tag)
  }
}

export default new GovernmentDocumentQuerier
