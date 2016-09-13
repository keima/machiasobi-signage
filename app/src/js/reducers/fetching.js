import {REQUEST_RUNNING, STEPS_SUCCESS, TELOP_SUCCESS} from "../actions/index";
import * as source from "../constants/fetching";

export default function fetching(state = [], action) {

  var set = new Set(state);

  switch (action.type) {
    case REQUEST_RUNNING:
      if (action.sources.length == 0) {
        return [source.SLIDE, source.CALENDAR, source.TELOP, source.DELAY, source.TRAFFIC]
      }

      action.sources.forEach(item => set.add(item));

      return Array.from(set);
    case STEPS_SUCCESS:
      set.delete(source.SLIDE);
      return Array.from(set);
    case TELOP_SUCCESS:
      set.delete(source.TELOP);
      return Array.from(set);
    default:
      return state;
  }

}