import {CALENDARS_SUCCESS} from "../actions"

export default function calendar(state = [], action) {
  switch (action.type) {
    case CALENDARS_SUCCESS:
      return
    default:
      return state
  }
}