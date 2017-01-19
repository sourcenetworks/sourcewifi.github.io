var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var opener = require('opener');

function onError(err) {
  console.error(err);
}

gulp.task('sass', function(){
  return gulp.src('styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Explorer >= 9', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
    }))
    .pipe(minify())
    .pipe(gulp.dest('css/'))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(livereload());
});

gulp.task('html')

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch('index.html', function (changeEvent) {
    livereload.changed(changeEvent.path);
  });
});

gulp.task('open', function(){
  opener('http://localhost:8080');
});

gulp.task('default', ['sass', 'watch', 'connect', 'open']);
