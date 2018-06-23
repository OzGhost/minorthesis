import store from './store'
import { host, CERTIFICATE_CODE, QUERY_DIALOG } from './common/Constants'
import { openDialog, queryTargetChangeTo } from './actions'


const mock = () => {
  const ev = {pageX: 100, pageY: 100}
  store.dispatch(openDialog(ev, QUERY_DIALOG))
  store.dispatch(queryTargetChangeTo('certi'))
}

export default mock

