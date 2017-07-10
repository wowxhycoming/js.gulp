var gulp = require('gulp');

gulp.task('hello', function () {
    console.log('hello gulp');
});

gulp.task('default', function () {
    console.log('default task');
});

gulp.task('world', ['hello'], function () {
    console.log("dependency hello")
});