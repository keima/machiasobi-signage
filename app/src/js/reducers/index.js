import {combineReducers} from "redux";
import fetching from "./fetching"
import slide from "./slide";
import telop from "./telop";
import calendar from "./calendar"

const reducer = combineReducers({
  // isSuperFetching, bool
  fetching, //array [slide, telop] -> slide and telop are fetching now

  slide,
  // calendars,
  telop,
  // delay,
  // traffic
});

export default reducer;