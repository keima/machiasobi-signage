"use strict";

angular.module('myApp.constant', [])
  .value("API_ENDPOINT", "http://machiasobi-tools.appspot.com")
  //.value("API_ENDPOINT", "http://localhost:8080")
  .value("CalendarId", {
    SHINMACHI: 'p-side.net_ctrq60t4vsvfavejbkdmbhv3k4@group.calendar.google.com',
    RYOGOKU: 'p-side.net_timelrcritenrfmn86lco3qt9o@group.calendar.google.com',
    BIZAN: "p-side.net_m9s9a5ut02n6ap1s6prdj92ss4@group.calendar.google.com"
  })
  .value("PlacesValue", {
    SHINMACHI: {
      name: "新町橋東公園",
      calendarId: 'p-side.net_ctrq60t4vsvfavejbkdmbhv3k4@group.calendar.google.com'
    },
    RYOGOKU: {
      name: "両国橋西公園",
      calendarId: 'p-side.net_timelrcritenrfmn86lco3qt9o@group.calendar.google.com'
    },
    BIZAN: {
      name: "眉山林間ステージ",
      calendarId: "p-side.net_m9s9a5ut02n6ap1s6prdj92ss4@group.calendar.google.com"
    },
    CINEMA: {
      name: "ufotable cinema",
      calendarId: "p-side.net_j3mtcq3ejulrovek8kru6vgoe8@group.calendar.google.com"
    },
    AWAGIN: {
      name: "あわぎんホール",
      calendarId: "p-side.net_oa45stb6g4h9lqiq5vd1ov844s@group.calendar.google.com"
    },
    CORNE: {
      name: "コルネの泉",
      calendarId: "p-side.net_jo112m9l36p6nlkrv939sb9kr0@group.calendar.google.com"
    },
    POPPO: {
      name: "ポッポ街",
      calendarId: "p-side.net_0jj3pc9gbvp36qfm9nqltle94g@group.calendar.google.com"
    }
  })
  .value("PartialsValue", {
    shinmachi: './partials/place/shinmachi.html',
    ryogoku: './partials/place/ryogoku.html',
    bizan: './partials/place/bizan.html',
    museum: './partials/place/museum.html',
    ropeway: './partials/place/ropeway.html',
    bus: './partials/place/bus.html',
    sideviews: './partials/sideview/sideviews.html'
  })
;