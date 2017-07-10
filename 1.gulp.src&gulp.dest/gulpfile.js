var gulp = require('gulp');

gulp.task('default', function() {
    gulp.src('app/src.js') // 获取要操作文件的流
    .pipe(gulp.dest('dist')); // dist() 的参数是路径名，不是文件名。也就是说dist()不能重命名文件。
});

gulp.task('multiDir', function() {
    gulp.src('app/src.js')
    .pipe(gulp.dest('dist/dist.js'));
});

gulp.task('pattern', function() {
    gulp.src('app/**/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('copyMultiSuffix', function() {
    gulp.src('app/**/*.{jpg,png}')
    .pipe(gulp.dest('dist'));
});

gulp.task('lostDir', function() {
    gulp.src('app/jquery/jquery.js') // 没有通配符，只会拷贝文件到目标文件夹
    .pipe(gulp.dest('dist')); //  jquery.js 位于 dist 文件夹下
});

gulp.task('basePath', function() {
    // 当不指定 base 时，基准路径默认以出现 之前的那部分路径
    // 指定 base 后，下面 base 路径为 'app/' , 拷贝路径为 'app/'之后的路径。这样就解决了路径丢失的问题。
    gulp.src(['app/bootstrap/bootstrap.js','app/jquery/jquery.js'],{base:'app'})
    .pipe(gulp.dest('dist'));
});

gulp.task('exclude', function() {
    // 排除 'app/bootstrap/bootstrap.js'
    gulp.src(['app/**/*.js','!app/bootstrap/bootstrap.js'])
    .pipe(gulp.dest('dist'));
});