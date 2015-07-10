'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');

gulp.task('install-hooks', function () {
    return gulp.src('./hooks/*', {base: './hooks/'}).pipe(gulp.dest('./.git/hooks/'));
});

gulp.task('lint', function () {
    return gulp.src(['*.js', 'src/**/*.js?(x)'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('default', ['lint']);
