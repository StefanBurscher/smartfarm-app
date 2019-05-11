import ACTIONS from '../../constants/ACTIONS'

const initialState = {
  profile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return {
        ...state,
        expiredSession: true
      }

    case ACTIONS.LOGIN_USER_SUCCESS:
      return {
        ...state,
        tokens: action.tokens,
        profile: action.user
      }

    case ACTIONS.REGISTER_USER_SUCCESS:
      return {
        ...state,
        profile: action.user
      }

    default:
      return state
  }
}
