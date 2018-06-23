import { QUERING, QUERY_TARGET_CHANGE, QUERY_FIELD_CHANGE,
          NO_RESULT_FOUND, UPDATE_ACCOUNT, ROLE_CHANGED,
          OPEN_DIALOG, VALUE_CHANGE } from '../actions'
import { QUERY_DIALOG } from '../common/Constants'
import DataLoader from '../common/DataLoader'

const defaultState = { target: 'plan', queryData: {} }

const queryDialog = (state = defaultState, action) => {
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
      if (action.target === QUERY_DIALOG)
        return {
          ...state,
          hasNoResult: true
        }
    case UPDATE_ACCOUNT:
      const users = state.queryData.users || []
      const nextUsers = users.map(e => {
        return e.id === action.account.id
          ? action.account
          : e
      })
      return {
        ...state,
        queryData: {
          ...state.queryData,
          users: nextUsers
        }
      }

    case ROLE_CHANGED:
      return defaultState

    case OPEN_DIALOG:
      if (action.dialogName === QUERY_DIALOG)
        return {
          ...state,
          offset: action.offset
        }

    default:
      return state
  }
}

export default queryDialog

