import axios from "axios";
import {weatherTelop} from "../utils/telops";

/* 開発メモ
 * "_RUNNING" : データ取得を開始したのを通知
 * "_FAILURE" : データ取得に失敗したのを通知(理由を添えて)
 * "_SUCCESS" : データ通知に成功したのを通知(結果を添えて)
 */

var api = axios.create({
  baseURL: "https://machiasobi-tools.appspot.com/api/v1/"
});
var gcal = axios.create({
  baseURL: "https://www.googleapis.com/calendar/v3/calendars",
  params: {
    key: "AIzaSyCgK3kr9bdc_Qv_SnSJTxAcS1npBGqyRgw",
    orderBy: "startTime",
    singleEvents: false,
    timeZone: "Asia/Tokyo",
    maxResults: 10,
    // timeMin: a.format(),
    // timeMax: a.endOf("day").format(),
  }
});

export const REQUEST_RUNNING = "REQUEST_RUNNING";
function requestRunning(...fetchName) {
  return {
    type: REQUEST_RUNNING,
    sources: fetchName
  }
}

export const STEPS_SUCCESS = "STEPS_SUCCESS";
function stepsSuccess(steps) {
  return {
    type: STEPS_SUCCESS,
    receivedAt: Date.now(),
    steps
  }
}

export const CALENDARS_SUCCESS = "CALENDARS_SUCCESS";
function calendarsSuccess(calendars) {
  return {
    type: CALENDARS_SUCCESS,
    receivedAt: Date.now(),
    calendars
  }
}

export const TELOP_SUCCESS = "TELOP_SUCCESS";
function telopSuccess(telop) {
  return {
    type: TELOP_SUCCESS,
    receivedAt: Date.now(),
    telops: [telop]
  }
}

export const TELOP_ROTATE_FORWARD = "TELOP_ROTATE_FORWARD";
function telopRotateForward() {
  return {
    type: TELOP_ROTATE_FORWARD
  }
}

export function fetchInitialData() {
  return function(dispatch) {

    dispatch(requestRunning());

    return axios.all([
      api.get("steps"),
      api.get("calendars"),
      api.get("weather/360010")
    ]).then(axios.spread(function(steps, calendars, weatherInfo) {
      dispatch(stepsSuccess(steps.data))
      dispatch(calendarsSuccess(calendars.data))
      dispatch(telopSuccess(weatherTelop(weatherInfo.data)))
    })).catch( err => {
      if (err.response) {
        console.log(err.response.status, err.response.data);
      } else {
        console.log("---", err.message)
      }
    });
  }
}