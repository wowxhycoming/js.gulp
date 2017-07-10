var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); // 一定要执行

gulp.task('default', function () { // gulp 任务
    gulp.src('app/[ab].js') // app/ 下的 a.js 和 b.js
    .pipe($.concat('ab.js')) // pipe 到 gulp-concat 插件中，concat() 的参数为合并后的文件名
    .pipe(gulp.dest('dist')); // 生成文件
});

gulp.task('compile-less', function () {
    gulp.src('app/less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('server', function () {
    $.connect.server({
        root : 'dist', // 静态文件根目录
        port : 8080 // 服务器运行端口，默认为 8080
    });
});

// 文件发生变化的时候，实时刷新浏览器
gulp.task('copy-index-and-reload', function () {
    gulp.src('app/index.html') // 指定源文件
    .pipe(gulp.dest('dist')) // 拷贝到 dest 路径
    .pipe($.connect.reload()); // 通知浏览器刷新
});

gulp.task('watch-html', function () {
    gulp.watch('app/index.html', ['copy-index-and-reload']);// 当文件发生变化时，执行 copy-html 任务
});

gulp.task('livereload-server', function () {
    $.connect.server({
        root : 'dist',
        port : 8080,
        livereload : true // 开启实时刷新的功能
    })
});

gulp.task('auto-server', ['livereload-server','watch-html']);

// uglify
gulp.task('ugligy-src', function () {
    gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js']) // 包含src.js a.js b.js 排除 *.tmp.js
    .pipe($.concat('all.js')) // 连接所有 js 文件
    .pipe($.uglify()) // 压缩文件
    .pipe(gulp.dest('dist')) // 输出
});

// gulp-minify-html
gulp.task('minify-html', function () {
    gulp.src('app/index.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('dist'));
});

// gulp-rename
gulp.task('rename', function () {
    gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js'])
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('dist')) // 生成合并文件
    .pipe($.uglify())
    .pipe($.rename('all.min.js')) // 重命名文件
    .pipe(gulp.dest('dist')); // 生成压缩的合并文件
});

// 自定义重命名
gulp.task('rename-customer', function () {
    gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js'])
    .pipe($.concat('all.js'))
    .pipe(gulp.dest('dist')) // 生成合并文件
    .pipe($.uglify())
    .pipe($.rename(function (path) {
        path.dirname += '1'; // 原来 dir + '1'
        path.basename += '.min'; // 原来 文件名 + '.min'
        path.extname += '.js'; // 原来 文件后缀 + '.js'
    })) // 重命名文件
    .pipe(gulp.dest('dist')); // 生成压缩的合并文件
});

// jshint
gulp.task('check-js', function () {
    gulp.src('app/**/*.js')
    .pipe($.jshint()) // 执行代码检查
    .pipe($.jshint.reporter()) // 输出检查结果
});