
function genForecast(forecast) {
  var ret = forecast.dateLabel + "：" + forecast.telop;
  if (forecast.temperature.min !== null && forecast.temperature.max !== null) {
    ret += "（" + forecast.temperature.max.celsius + "℃/" + forecast.temperature.min.celsius + " ℃）";
  }
  return ret;
}

export function weatherTelop(weatherData) {
  var T = {
    city: weatherData.location.city,
    desc: weatherData.description.text.replace(/[\n\r]/g, "")
  };

  var forecasts = "";
  weatherData.forecasts.forEach(function(forecast) {
    forecasts += genForecast(forecast) + "　";
  });

  return "◇天気予報◇　" + T.city + "の天気" + "　" +
    // 予報
    forecasts + "　　" +
    // 概況
    "天気概況：" + T.desc + "　　　" +
    // コピーライト
    "データ提供：日本気象協会／API提供：Weather Hacks ©LINE Corporation";

}
