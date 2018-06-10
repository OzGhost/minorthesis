import { IN_USERNAME, IN_PASSWORD, IN_LOGIN, LOGIN_RESULT } from '../actions'

const userIdentify = (state = {username: '', password: ''}, action) => {
  switch(action.type) {
    
    case IN_USERNAME:
      return {
        ...state,
        username: action.username
      }

    case IN_PASSWORD:
      return {
        ...state,
        password: action.password
      }

    case IN_LOGIN:
      return {
        ...state,
        isLoading: true
      }

    case LOGIN_RESULT:
      if (action.authenResult.isPass) {
        return {
          ...state,
          username: '',
          password: '',
          isLoading: false,
          result: action.authenResult
        }
      } else {
        return {
          ...state,
          isLoading: false,
          result: action.authenResult
        }
      }

    default:
      return state
  }
}

export default userIdentify

