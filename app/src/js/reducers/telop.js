import {TELOP_SUCCESS, TELOP_ROTATE_FORWARD} from "../actions/index";

export default function telop(state = {
  selectPos: 0,
  items: []
}, action) {
  switch (action.type) {
    case TELOP_SUCCESS:
      return Object.assign({}, state, {
        lastUpdatedAt: action.receivedAt,
        items: action.telops,
      });
    case TELOP_ROTATE_FORWARD:
      var pos = (state.selectPos + 1 >= state.items.length) ? 0 : state.selectPos + 1;

      return Object.assign({}, state, {
        selectPos: pos
      });
    default:
      return state;
  }
}