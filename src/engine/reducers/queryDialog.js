import { QUERING, QUERY_TARGET_CHANGE, QUERY_FIELD_CHANGE,
          NO_RESULT_FOUND} from '../actions'
import DataLoader from '../common/DataLoader'

const queryDialog = (state = {target: 'plan', queryData: {}}, action) => {
  switch (action.type) {
    case QUERING:
      return {
        ...state,
        isLoading: true
      }

    case QUERY_TARGET_CHANGE:
      return {
        ...state,
        target: action.target,
        hasNoResult: false
      }

    case QUERY_FIELD_CHANGE:
      return {
        ...state,
        hasNoResult: false,
        queryData: DataLoader.load(state.queryData, action.locate, action.value)
      }

    case NO_RESULT_FOUND:
      if (action.target === 'query')
        return {
          ...state,
          hasNoResult: true
        }

    default:
      return state
  }
}

export default queryDialog

