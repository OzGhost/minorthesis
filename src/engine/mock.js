import store from './store'
import { host, CERTIFICATE_CODE, MODIFIER_DIALOG, PLAN_USER_CODE
        } from './common/Constants'
import { openDialog, valueChange } from './actions'


const mock=()=>{}

const smock = () => {
  const ev = {pageX: 100, pageY: 100}
  store.dispatch(openDialog(ev, MODIFIER_DIALOG))
  store.dispatch(valueChange(MODIFIER_DIALOG, 'target', PLAN_USER_CODE))
  const pa = [
    'kind', 1,
    'address', 'no address',
    'personalName', 'no personalName',
    'birthYear', '1991',
    'idNumber', '272416796',
    'nationality', 'Cook Islands',
    'kind', 3,
    'groupName', 'no groupName',
    'commerceId', '1233332',
    'provideDate', 1530154519000
  ]
  for (let i = 0; i < pa.length - 1; i+=2) {
    store.dispatch(valueChange(
      MODIFIER_DIALOG,
      PLAN_USER_CODE+'.'+pa[i],
      pa[i+1]
    ))
  }
}

export default mock

