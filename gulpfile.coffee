gulp = require 'gulp'
$ = require('gulp-load-plugins')() # injecting gulp-* plugin
browserSync = require 'browser-sync'
bowerFiles = require "main-bower-files"
runSequence = require 'run-sequence'
rimraf = require "rimraf"

# config
config =
  dir: './app/'
  index: './app/index.html'
  js: './app/js/**/*.js'
  css: './app/css/**/*.css'
  partials: './app/partials/**/*.html'
  copy: [
    './app/bower_components/octicons/octicons/octicons.{css,eot,woff,ttf,svg}',
    './app/json/*.json',
    './app/image/*.{jpg,png}',
    './app/favicon.png'
  ]
  output: './dist/'
  temp: './temp/'

#
# Task
#
gulp.task 'browser-sync', ->
  browserSync server:
    baseDir: config.dir
# for GAE Proxy
# browserSync proxy: 'localhost:8080'

gulp.task 'watch', ->
  gulp.watch config.partials, {debounceDelay: 1000}, browserSync.reload

  gulp.watch config.js, {debounceDelay: 1000}, ['inject']
  .on 'change', (file) ->
    gulp.src file.path
    .pipe browserSync.reload(stream: true, once: true)

  gulp.watch config.css, {debounceDelay: 1000}, ['inject']
  .on 'change', (file) ->
    gulp.src file.path
    .pipe browserSync.reload(stream: true)


gulp.task 'inject', ->
  bower = gulp.src bowerFiles(), {read: false}
  sources = gulp.src [config.js, config.css], {read: false}

  gulp.src config.index
  .pipe $.inject bower, {ignorePath: 'app', addRootSlash: false, name: 'bower'}
  .pipe $.inject sources, {ignorePath: 'app', addRootSlash: false}
  .pipe gulp.dest config.dir

gulp.task 'usemin', ->
  cssTask = (files, filename) ->
    files
#    .pipe $.debug("CSS:")
    .pipe $.cssRebaseUrls()
    .pipe $.pleeease(
#      import: {path: ["app/bower_components/octicons/octicons", "dist/fonts"]}
      rebaseUrls: false
      autoprefixer: {browsers: ["last 4 versions", "ios 6", "android 4.0"]}
#      out: config.output + filename
    )
    .pipe $.concat(filename)
    .pipe $.rev()

  jsTask = (files, filename) ->
    files.pipe $.ngAnnotate()
    .pipe $.uglify()
    .pipe $.concat(filename)
    .pipe $.rev()

  gulp.src config.index
  .pipe $.spa.html(
    assetsDir: config.dir
    pipelines:
      main: (files)->
        files.pipe $.minifyHtml(empty: true, conditionals: true)
#      vendorcss: (files)->
#        cssTask files, "vendor.css"
      css: (files)->
        cssTask files, "app.css"
      vendorjs: (files)->
        jsTask files, "vendor.js"
      js: (files)->
        jsTask files, "app.js"
  )
  .pipe gulp.dest(config.output)

gulp.task 'copy', ->
  gulp.src config.partials, {base: config.dir}
  .pipe $.minifyHtml(empty: true)
  .pipe gulp.dest config.output

  # other
  gulp.src config.copy, {base: config.dir}
  .pipe gulp.dest config.output


gulp.task 'clean', (cb) ->
  rimraf(config.output, cb);


gulp.task 'default', ['browser-sync', 'watch']

gulp.task 'build', (cb) -> runSequence(
  'clean', 'inject', 'copy', 'usemin'
  cb
)
