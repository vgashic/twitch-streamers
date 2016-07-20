/*jslint browser: true*/
/*global require*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    "use strict";
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

//Watch task
gulp.task('default', function() {
    "use strict";
    gulp.watch('scss/**/*.scss', ['styles']);
});