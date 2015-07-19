'use strict';

var debug = require('gulp-debug');
var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('install-hooks', function () {
    return gulp.src('./hooks/*', {base: './hooks/'})
        .pipe(debug())
        .pipe(gulp.dest('./.git/hooks/'));
});

gulp.task('lint', function () {
    return gulp.src(['./*.js', './src/**/*.js'])
        .pipe(debug())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', ['lint']);
