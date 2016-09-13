import {combineReducers} from "redux";
import clock from "./clock";
import fetching from "./fetching"
import slide from "./slide";
import telop from "./telop";

const reducer = combineReducers({
  clock,

  // isSuperFetching, bool
  fetching, //array [slide, telop] -> slide and telop are fetching now

  slide,
  // calendars,
  telop,
  // delay,
  // traffic
});

export default reducer;