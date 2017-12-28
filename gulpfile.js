const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps =  require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

const SASS_PATH = 'public/scss/**/*.sass';
const CSS_OUTPUT = 'public/css';

// Styles
gulp.task('styles', function () {
  console.log('Running styles task');
  let processors = [
    autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 8']
    }),
    cssnano
  ];
  return gulp.src(SASS_PATH)
    .pipe(plumber(function (err) {
      console.log('Styles task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: 'compressed'
    }))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(CSS_OUTPUT))
    .pipe(browserSync.stream())
});

// Watch
gulp.task('watch', function () {
  console.log('Starting watch task');
  browserSync.init({
    server: "./public"
  });
  gulp.watch(SASS_PATH, ['styles'], browserSync.reload);
});

gulp.task('default', ['styles', 'watch'], () => {
  console.log('Starting default task');
});