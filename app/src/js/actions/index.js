import axios from "axios";
import {parseTime} from "../utils/dates";

/* 開発メモ
 * "_RUNNING" : データ取得を開始したのを通知
 * "_FAILURE" : データ取得に失敗したのを通知(理由を添えて)
 * "_SUCCESS" : データ通知に成功したのを通知(結果を添えて)
 */

var api = axios.create({
  baseURL: "http://machiasobi-tools.appspot.com/api/v1/"
});

export const SYNC_DATE = "SYNC_DATE";
export function syncDate() {
  const time = parseTime(new Date());
  return {
    type: SYNC_DATE,
    ...time
  };
}

export const APP_INITIALIZE = "APP_INITIALIZE";
export function appInitialize() {
  return {
    type: APP_INITIALIZE
  }
}

export const REQUEST_RUNNING = "REQUEST_RUNNING";
function requestRunning() {
  return {
    type: REQUEST_RUNNING
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

export const TELOP_SUCCESS = "TELOP_SUCCESS";
function telopSuccess(telop) {
  return {
    type: TELOP_SUCCESS,
    receivedAt: Date.now(),
    telop
  }
}

export function fetchInitialData() {
  return function(dispatch) {
    dispatch(requestRunning());

    return axios.all([
      api.get("steps"),
      api.get("weather/360010")
    ]).then(axios.spread(function(steps, weatherInfo) {
      console.log(steps);

      dispatch(stepsSuccess(steps));
      dispatch(telopSuccess(weatherInfo))
    }))
  }
}