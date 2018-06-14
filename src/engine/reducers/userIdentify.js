import { IN_USERNAME, IN_PASSWORD, IN_LOGIN, LOGIN_RESULT,
          LOGIN_MSG } from '../actions'

const userIdentify = (state = {ua: '', passwd: ''}, action) => {
  switch(action.type) {
    
    case IN_USERNAME:
      return {
        ...state,
        ua: action.username,
        msg: ''
      }

    case IN_PASSWORD:
      return {
        ...state,
        passwd: action.password,
        msg: ''
      }

    case IN_LOGIN:
      return {
        ...state,
        isLoading: true,
        msg: ''
      }

    case LOGIN_RESULT:
      localStorage
        && localStorage.setItem('token', action.authenResult.token)
      return {
        ...state,
        ua: '',
        passwd: '',
        isLoading: false,
        msg: ''
      }

    case LOGIN_MSG:
      return {
        ...state,
        msg: action.msg
      }

    default:
      return state
  }
}

export default userIdentify

