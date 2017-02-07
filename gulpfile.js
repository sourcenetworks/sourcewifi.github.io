var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var opener = require('opener');
var deploy = require('gulp-gh-pages');
var ejs = require("gulp-ejs");
var gutil = require('gulp-util');
var ext_replace = require('gulp-ext-replace');

function onError(err) {
  console.error(err);
}

gulp.task('sass', function(){
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Explorer >= 9', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
    }))
    .pipe(minify())
    .pipe(gulp.dest('css/build/'))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(livereload());
});

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('ejs', function() {
  return gulp.src(['**/*.ejs', '!node_modules/**/*', '!partials/**/*'])
    .pipe(ejs({}).on('error', gutil.log))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch('**/*.ejs', ['ejs']);
  gulp.watch('**/*.html', function (changeEvent) {
    livereload.changed(changeEvent.path);
  });
});

gulp.task('open', function(){
  opener('http://localhost:8080');
});

gulp.task('default', ['sass', 'ejs', 'watch', 'connect', 'open']);

gulp.task('deploy', ['sass'], function () {
  return gulp.src(['./**/*', '!node_modules/**/*'])
    .pipe(deploy());
});
