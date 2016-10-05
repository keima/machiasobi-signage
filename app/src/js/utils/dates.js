import moment from "moment"

export function parseTime(date=new Date()) {
  return {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

export function formatTime(date, format = "yyyy-MM-dd HH:mm:ss") {
  return moment(date).format(format);
}
