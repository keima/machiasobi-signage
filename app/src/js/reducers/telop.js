import {TELOP_SUCCESS} from "../actions/index";

export default function telop(state = {}, action) {
  switch (action.type) {
    case TELOP_SUCCESS:
      return Object.assign({}, state, {
        lastUpdatedAt: action.receivedAt,
        item: state.telop,
      })
    default:
      return state;
  }
}