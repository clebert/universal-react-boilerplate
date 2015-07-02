'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src(['*.js', 'src/**/*.js?(x)'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
