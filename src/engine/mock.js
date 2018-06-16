import RequestPacker from './common/RequestPacker'
import { host, CERTIFICATE_CODE } from './common/Constants'
import store from './store'
import { openModifier } from './actions'


const preprocessPayload = payload => {
  if (typeof(payload) === 'undefined')
    return {}
  let rs = JSON.stringify(payload).replace(/null/g, '""')
  let ors = JSON.parse(rs)
  delete ors.chinhly
  ors.privateArea = Number(ors.privateArea) || 0
  ors.publicArea = Number(ors.publicArea) || 0
  return ors
}

const mock = () => {
  fetch(
    host + '/certificate/4201010815',
    {headers: RequestPacker.buildHeader()}
  ).then(e=>e.json())
  .then(e => {
    store.dispatch(
      openModifier(
        {pageX: 100, pageY: 100},
        CERTIFICATE_CODE,
        preprocessPayload(e.payload),
        () => { /* do nothing */ }
      )
    )
  })
}

export default mock

