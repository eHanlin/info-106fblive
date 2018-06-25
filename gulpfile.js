const Q = require('q')
const del = require('del')
const gulp = require('gulp')
const babel = require('gulp-babel')
const cache = require('gulp-cache')
const uglify = require('gulp-uglify-es').default
const imageMin = require('gulp-imagemin')
const gcPub = require('gulp-gcloud-publish')
const pngquant = require('imagemin-pngquant')
const templateUtil = require('gulp-template-util')

let bucketNameForTest = 'tutor-events-test'
let bucketNameForProd = 'tutor-events'
let projectId = 'tutor-204108'
let keyFilename = 'tutor.json'
let projectName = 'event/info-106fblive/'

const basePath = {
  base: 'src'
}
const dist = 'dist'

let copyStaticTask = destination => {
  return () => {
    return gulp
      .src(
        ['src/**/*.html', 'src/img/**/*', 'src/lib/**/*', 'src/js/**/*.js', 'src/css/**/*.css'], {
          base: 'src'
        }
      )
      .pipe(gulp.dest(destination))
  }
}

let clean = source => {
  return () => {
    return del([source])
  }
}

let minifyJs = sourceJS => {
  return () => {
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
      .pipe(gulp.dest('./dist'))
  }
}

let babelJS = sourceJS => {
  return () => {
    return gulp
      .src(sourceJS, basePath)
      .pipe(babel())
      .pipe(gulp.dest('babel-temp'))
  }
}

let buildJS = () => {
  let deferred = Q.defer()

  Q.fcall(() => {
    return templateUtil.logStream(babelJS(['src/js/*.js']))
  })
    .then(() => {
      return templateUtil.logStream(minifyJs('babel-temp/js/**/*.js'))
    })
    .then(() => {
      return templateUtil.logPromise(clean('babel-temp'))
    })
  return deferred.promise
}

let minifyImage = sourceImage => {
  return gulp
    .src(sourceImage, {
      base: './src'
    })
    .pipe(cache(imageMin({
      use: [pngquant({
        speed: 7
      })]
    })))
    .pipe(gulp.dest('./dist'))
}

let uploadGCS = bucketName => {
  return gulp
    .src([
      './dist/*.html',
      './dist/css/**/*.css',
      './dist/js/**/*.js',
      './dist/lib/**/*.@(js|json)',
      './dist/img/**/*.png'
    ], {
      base: `${__dirname}/dist/`
    })
    .pipe(gcPub({
      bucket: bucketName,
      keyFilename: keyFilename,
      base: projectName,
      projectId: projectId,
      public: true,
      metadata: {
        cacheControl: 'private, no-transform'
      }
    }))
}

gulp.task('uploadGcpTest', uploadGCS.bind(uploadGCS, bucketNameForTest))
gulp.task('uploadGcpProd', uploadGCS.bind(uploadGCS, bucketNameForProd))
gulp.task('minifyJs', minifyJs('src/js/**/*.js'))
gulp.task('package', () => {
  let deferred = Q.defer()
  Q.fcall(() => {
    return templateUtil.logPromise(clean(dist))
  })
    .then(() => {
      return Q.all([
        templateUtil.logStream(minifyImage.bind(minifyImage, './src/img/**/*.png'))
      ])
    })
    .then(() => {
      return templateUtil.logStream(copyStaticTask('dist'))
    })
    .then(() => {
      return Q.all([templateUtil.logStream(buildJS)])
    })
  return deferred.promise
})
