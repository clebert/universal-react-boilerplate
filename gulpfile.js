'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src(['*.js', 'app/**/*.js', 'server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
