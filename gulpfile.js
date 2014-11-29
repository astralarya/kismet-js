/* project settings */


/* node.js modules */

var gulp = require('gulp'),
    jison = require('gulp-jison'),
    mocha = require('gulp-mocha');


/* gulp.js tasks */

gulp.task('jison', function() {
  return gulp.src('./src/**/*.jison')
    .pipe(jison({moduleType: 'commonjs'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('test', ['build'], function() {
  return gulp.src('./test/**/*.js')
    .pipe(mocha());
});

gulp.task('build', ['jison']);

gulp.task('default', ['build']);
