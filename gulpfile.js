const gulp = require('gulp')
const templateUtil = require('gulp-template-util')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const del = require('del')
const Q = require('q')

const basePath = {
  base: 'src'
}
const dist = 'dist'

function copyStaticTask (destination) {
  return function () {
    return gulp
      .src(
        ['src/**/*.html', 'src/img/**/*', 'src/lib/**/*', 'src/js/**/*.js', 'src/css/**/*.css'], {
          base: 'src'
        }
      )
      .pipe(gulp.dest(destination))
  }
}

function clean (source) {
  return function () {
    return del([source])
  }
}

function minifyJs (sourceJS) {
  return function () {
    return gulp
      .src(sourceJS, {
        base: 'babel-temp'
      })
      .pipe(
        uglify({
          mangle: false
        }).on('error', function (error) {
          console.log(error)
        })
      )
      .pipe(gulp.dest(dist))
  }
}

function babelJS (sourceJS) {
  return function () {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest('babel-temp'))
  }
}

function buildJS () {
  let deferred = Q.defer()

  Q.fcall(function () {
    return templateUtil.logStream(babelJS(['src/js/*.js']))
  })
    .then(function () {
      return templateUtil.logStream(minifyJs('babel-temp/js/**/*.js'))
    })
    .then(function () {
      return templateUtil.logPromise(clean('babel-temp'))
    })

  return deferred.promise
}

gulp.task('minifyJs', minifyJs('src/js/**/*.js'))
gulp.task('package', function () {
  var deferred = Q.defer()
  Q.fcall(function () {
    return templateUtil.logPromise(clean(dist))
  })
    .then(function () {
      return templateUtil.logStream(copyStaticTask('dist'))
    })
    .then(function () {
      return Q.all([templateUtil.logStream(buildJS)])
    })

  return deferred.promise
})
