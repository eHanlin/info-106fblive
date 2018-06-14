const Q = require('q')
const del = require('del')
const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const gcPub = require('gulp-gcloud-publish')
const Storage = require('@google-cloud/storage')
const templateUtil = require('gulp-template-util')

let bucketName = 'tutor-events'
let projectId = 'tutor-204108'
let keyFilename = './tutor.json'
let projectName = '106fblive'

const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
})

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
      .pipe(gulp.dest(dist))
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

let removeEmptyFiles = () => {
  let array = ['img', 'css', 'js', 'lib']
  array.forEach(emptyFiles => {
    storage
      .bucket(bucketName)
      .file(`/event/${projectName}/${emptyFiles}`)
      .delete()
      .then(() => {
        console.log(`gs://${bucketName}/${emptyFiles} deleted.`)
      })
      .catch(err => {
        console.error('ERROR:', err)
      })
  })
}

gulp.task('uploadGcp', () => {
  return gulp.src(['dist/**/*'])
    .pipe(gcPub({
      bucket: bucketName,
      keyFilename: keyFilename,
      projectId: projectId,
      base: `/event/${projectName}`,
      public: true,
      transformDestination: path => {
        return path
      },
      metadata: {
        cacheControl: 'max-age=315360000, no-transform, public'
      }
    }))
})

gulp.task('removeEmptyFiles', () => {
  removeEmptyFiles()
})

gulp.task('minifyJs', minifyJs('src/js/**/*.js'))
gulp.task('package', () => {
  let deferred = Q.defer()
  Q.fcall(() => {
    return templateUtil.logPromise(clean(dist))
  })
    .then(() => {
      return templateUtil.logStream(copyStaticTask('dist'))
    })
    .then(() => {
      return Q.all([templateUtil.logStream(buildJS)])
    })
  return deferred.promise
})
