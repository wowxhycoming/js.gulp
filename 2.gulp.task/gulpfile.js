var gulp = require('gulp');
var fs = require('fs');
var Q = require('q');
var gulpSequence = require('gulp-sequence')

// 任务会按照数组里书写的顺序来执行
gulp.task('default',['t1','t2','t3']);

gulp.task('t1', function() {
    console.log("task 1");
});

gulp.task('t2', function() {
    console.log("task 2");
});

gulp.task('t3', function() {
    console.log("task 3");
});

gulp.task('async', function() {
    setTimeout(function() {
        console.log('async');
    }, 3000);
})

gulp.task('includeAsync',['t1','async','t2'], function() {
    console.log('include async');
});

gulp.task('writeFile', function() {
    setTimeout(function() {
        fs.writeFile('info.txt', 'hello', function (err) {
        
        });
    }, 3000);
});

gulp.task('readFile', ['writeFile'], function() {
    fs.readFile('info.txt',function (err,data) {
        console.log(data);
    });
});

// cb 是任务函数提供的回调函数，用来通知任务已经完成（cb 是 gulp 提供的，就像中间件的 next 一样）
gulp.task('asyncType1', function (cb) {
    setTimeout(function() {
        
        console.log('asyncType1');
        // 执行回调，表示这个任务已经完成
        cb();
        
    }, 3000);
});

gulp.task('antherAsyncType1', function (cb) {
    setTimeout(function() {
        
        console.log('antherAsyncType1');
        cb();
        
    }, 3000);
});

gulp.task('asyncType3', function() {
    var deferred = Q.defer();
    
    // 一些异步操作
    setTimeout(function() {
        console.log('asyncType3');
    }, 1000);
    
    return deferred.promise;
});


gulp.task('asyncSerial', ['t1', 'asyncType1', 'asyncType3', 't2']);


gulp.task('gulpSequence', function(cb) {
    gulpSequence('t1', 'asyncType1', 'antherAsyncType1', 't2')(cb);
});

gulp.task('a', function (cb) {
    setTimeout(function() {
        
        console.log('a');
        cb();
        
    }, 1000);
});

gulp.task('b', function (cb) {
    setTimeout(function() {
        
        console.log('b');
        cb();
        
    }, 1000);
});

gulp.task('c', function (cb) {
    setTimeout(function() {
        
        console.log('c');
        cb();
        
    }, 1000);
});

gulp.task('d', function (cb) {
    setTimeout(function() {
        
        console.log('d');
        cb();
        
    }, 1000);
});

gulp.task('e', function (cb) {
    setTimeout(function() {
        
        console.log('e');
        cb();
        
    }, 1000);
});

gulp.task('f', function (cb) {
    setTimeout(function() {
        
        console.log('f');
        cb();
        
    }, 1000);
});

// usage 1, recommend
// 1. run 'a', 'b' in parallel;
// 2. run 'c' after 'a' and 'b';
// 3. run 'd', 'e' in parallel after 'c';
// 3. run 'f' after 'd' and 'e'.
gulp.task('sequence-1', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'));

// usage 2
gulp.task('sequence-2', function (cb) {
    gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f', cb);
});

// usage 3
gulp.task('sequence-3', function (cb) {
    gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f')(cb);
});