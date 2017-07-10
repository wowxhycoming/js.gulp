var gulp = require('gulp');

gulp.task('default', [], function() {
    console.log('default');
});

gulp.task('copy_js', function() {
    console.log('copy_js');
});

gulp.watch('app/**/*.js', ['copy_js']);

gulp.watch('app/**/*.js', function (event) {
    console.log('event.type : ' + event.type);
    console.log('event.path : ' + event.path);
    console.log(event);
});