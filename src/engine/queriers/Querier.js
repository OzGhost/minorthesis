import { noResultFound } from '../actions'
import { host } from '../common/Constants'
import PlanQuerierView from '../components/PlanQuerierView'

class Querier {

  dispatch = ''

  withDispatch = dispatch => { this.dispatch = dispatch; return this }

  getView = () => ('')

  isAutoLoad = () => false
  
  performQuery = (event, data) => {
    fetch(host + this.buildQuery(data))
    .then(res => res.json())
    .then(resJson => {
      if (resJson.length == 0)
        this.handleFail()
      else
        this.receiveResult(event, resJson)
    })
  }

  handleFail = () => {
    this.dispatch(noResultFound('query'))
  }

  buildQuery = () => ('')

  receiveResult = () => {}
}

export default Querier
