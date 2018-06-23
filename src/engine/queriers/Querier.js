import { noResultFound } from '../actions'
import { host, QUERY_DIALOG } from '../common/Constants'
import PlanQuerierView from '../components/PlanQuerierView'
import RequestPacker from '../common/RequestPacker'

class Querier {

  dispatch = ''

  withDispatch = dispatch => { this.dispatch = dispatch; return this }

  getView = () => ('')

  isAutoLoad = () => false
  
  performQuery = (event, data) => {
    fetch(
      host + this.buildQuery(data),
      { headers: RequestPacker.buildHeader() }
    )
    .then(res => res.json())
    .then(resJson => {
      if (resJson.length == 0)
        this.handleFail()
      else
        this.receiveResult(event, resJson)
    })
  }

  handleFail = () => {
    this.dispatch(noResultFound(QUERY_DIALOG))
  }

  buildQuery = () => ('')

  receiveResult = () => {}
}

export default Querier
