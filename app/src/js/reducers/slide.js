import {STEPS_SUCCESS} from "../actions/index";

export default function slide(state = {}, action) {

  switch(action.type){
    case STEPS_SUCCESS:
      return Object.assign({}, state, {
        lastUpdatedAt: action.receivedAt,
        items: action.steps,
      });
    default:
      return state;
  }

}