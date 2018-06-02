import { noResultFound, host } from '../actions'
import PlanQuerierView from '../components/PlanQuerierView'

class Querier {

  dispatch = ''

  withDispatch = dispatch => { this.dispatch = dispatch; return this }

  getView = () => ('')
  
  performQuery = (event, data) => {
    fetch(host + this.buildQuery(data))
    .then(res => res.json())
    .then(resJson => {
      if (Object.keys(resJson).length == 0)
        this.handleFail()
      else
        this.receiveResult(event, resJson)
    })
  }

  handleFail = () => {
    this.dispatch(noResultFound(this.getTargetDialogName()))
  }

  buildQuery = data => ('')

  getTargetDialogName = () => ('')

  receiveResult = (res) => {}
}

export default Querier
