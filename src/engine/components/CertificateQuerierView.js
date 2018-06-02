import React from 'react'

const CertificateQuerierView = ({onChange, queryResult, resultSelect}) => (
  <div>
    <div className="w3-row">
      <label className="w3-text-blue">ID number/Passport:</label>
    </div>
    <div className="w3-row">
      <input
        type="number"
        className="w3-input w3-border"
        onChange={event => {
          onChange('certi.cache', undefined)
          onChange('certi.id', Number(event.target.value))
        }}
      />
    </div>
    {
      (queryResult && queryResult.certi && queryResult.certi.cache)
        ? (
          <div>
            <hr/>
            <span>Results:</span>
            <ul className="w3-ul w3-hoverable">
              { queryResult.certi.cache.map(i =>
                <li key={i.shgiaycn} onClick={event => resultSelect(event, i)}>
                  {'['+i.shgiaycn+']'+' '+i.ten}
                </li>)
              }
            </ul>
          </div>
        )
        : ''
    }
  </div>
)

export default CertificateQuerierView

