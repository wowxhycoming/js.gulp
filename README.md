# gulp

## 全局安装 gulp

1. 全局安装

        npm i -g gulp
        sudo npm i -g gulp (mac 或 linux 下使用)

2. 检查 gulp 是否安装成功。

        gulp --help
        
    执行命令后会看到
    >Local gulp not found in `this project root path`  
     Try running: npm install gulp

    表示安装成功，这个提示是因为没有本地安装 `gulp`

## 本地安装 gulp

1. 初始化项目

        npm init
   
    按提示信息回答问题至结束。

2. 本地安装`gulp`

        npm i gulp -D (或 npm i gulp --save-dev)
        
    > 安装完成后会在 package.json 的 devDependencies 依赖下添加此引用 
    >``` 
    >"devDependencies": {
    >   "gulp": "^3.9.1"
    >}
    >```

3. 验证安装结果

    在命令行下执行
    
        gulp
        
    执行命令后会看到
    >No gulpfile found  
    
    表示本地安装成功，只是缺少一个 `gulpfile` 。
    
## 运行 gulp

1. 在项目根目录下创建 `gulpfile.js`
2. 在 gulpfile.js 文件顶部引入 `gulp`

        var gulp = require('gulp');
        
3. 创建 `gulp` 任务

        var gulp = require('gulp');
        
        gulp.task('hello', function() {
            console.log('hello gulp');
        });
        
    `gulp.task()` 这里方法有两个参数，第一个为`task的名称`，第二个为`tast的行为`。总结一下就是，执行任务  就是让后面的函数执行。

4. 运行gulp命令  
    打开命令行工具，定位到项目根目录（gulpfile.js所在的文件目录）
        
        gulp hello
        
    会返回
    >[23:13:31] Using gulpfile `path\gulpfile.js`  
     [23:13:31] Starting 'hello'...  
     hello gulp  
     [23:13:31] Finished 'hello' after 138 μs  
    
    命令行 `gulp hello` 中的 hello 是任务的名字，如果不输入名字的话，会默认的找 `gulpfile.js` 中名字为 `default` 的任务，找不到就报错。

        gulp
    报错信息
    >[23:20:56] Using gulpfile `path\gulpfile.js`  
     [23:20:56] Task 'default' is not in your gulpfile  
     [23:20:56] Please check the documentation for proper gulpfile formatting  

5. 创建一个`default`任务

    在 `gulpfile.js` 中添加
    
        gulp.task('default', function() {
            console.log('default task');
        });

    回到命令行工具，运行
    
        gulp
        
    返回结果
    >[23:23:31] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\gulpfile.js  
     [23:23:31] Starting 'default'...  
     default task  
     [23:23:31] Finished 'default' after 68 μs  

6. 执行多个任务

        gulp default hello
        
    运行结果
    >[23:30:00] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\gulpfile.js  
     [23:30:00] Starting 'default'...  
     default task  
     [23:30:00] Finished 'default' after 73 μs  
     [23:30:00] Starting 'hello'...  
     hello gulp  
     [23:30:00] Finished 'hello' after 43 μs  

## gulp的命令行

1. 查看gulp版本

        gulp -v
        
    返回结果
    >[23:30:30] CLI version 3.9.1  
     [23:30:30] Local version 3.9.1  
    
    >1.CLI 是 client interface 为命令行工具  
     2.Local version 为本地版本

2. 手动指定 gulpfile.js 的位置

        gulp --gulpfile <file>
    
    默认情况下 `gulpfile.js` 位于项目根目录下，如果位置变化了 或 有很多个 `gulpfile` 就需要手动指定了。

3. 手动指定CWD
    CWD 是 current working directory ， 默认工作路径，定义 `gulpfile` 查找文件的位置。
    
        gulp --cwd <path>
    
    当 `gulpfile.js` 不在当前命令行所在路径时 ，下面两种写法都能正确执行
    
    执行默认任务
    
        gulp --gulpfile gulpWorkingPath1/gulpfile.js
        gulp --cwd gulpWorkingPath1 
    执行 hello 任务
    
        gulp hello --gulpfile gulpWorkingPath1/gulpfile.js
        gulp hello --cwd gulpWorkingPath1 

    如果 `gulpfile` 的默认路径和名称都发生变化了，还是用 `gulp --gulpfile` 吧。
    
4. 显示依赖树

        gulp -T
    或   

        gulp --tasks

    gulp 的任务之间是可以互相依赖的。在 gulpfile.js 中添加下面代码：
    
        gulp.task('world', ['hello'], function () {
            console.log("dependency hello")
        });
    
    >golp.task() 的第二个参数是一个数组，存放依赖任务的列表
    
    执行 world 任务，的执行结果
    
        [11:39:38] Starting 'hello'...
        hello gulp
        [11:39:38] Finished 'hello' after 71 μs
        [11:39:38] Starting 'world'...
        dependency hello
        [11:39:38] Finished 'world' after 136 μs

    查看 CWD 下 gulpfile.js 所有任务的依赖树的执行结果
    
        [11:39:48] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\gulpfile.js
        [11:39:48] Tasks for D:\SE_NodejsProject_WebStrom\nodejs.gulp\gulpfile.js
        [11:39:48] ├── hello
        [11:39:48] ├── default
        [11:39:48] └─┬ world
        [11:39:48]   └── hello

## gulp 工作流程

### gulp 的工作方式

gulp的使用流程一般是：  
1. 通过 `gulp.src()` 方法获取想要处理的文件流
2. 把文件流通过 `pipe()` 方法导入到 gulp 插件中
3. 把经过 gulp 插件处理后的流再通多 `pipe()` 方法导入到 `gulp.dest()` 中
4. `gulp.dest()` 方法把流中的内容写入到文件中

### simple work

#### 切换环境

1. 新建路径 `1.gulp.src&gulp.dist` ，这个阶段的命令行和文件都创建到这个文件夹下
2. 新建路径 `1.gulp.src&gulp.dist/app` ，用于存放项目源文件
3. 新建文件 `1.gulp.src&gulp.dist/app/src.js` , 被操作的文件
4. 新建路径 `1.gulp.src&gulp.dist/dist` ，用于存放 gulp 处理过的文件
5. 新建 `1.gulp.src&gulp.dist/gulpfile.js` 文件，开始新的实践
6. ***使命令行进入 `1.gulp.src&gulp.dist` 文件夹***

#### 开始实践

1. 修改 `gulpfile.js` 文件

        var gulp = require('gulp');
        
        gulp.task('default', function () {
            gulp.src('app/src.js') // 获取要操作文件的流
            .pipe(gulp.dest('dist')); // dest() 的参数是路径名，不是文件名。也就是说dest()不能重命名文件。
        });
        
        gulp.task('multiDir', function () {
            gulp.src('app/src.js')
            .pipe(gulp.dest('dist/dist.js'));
        });
        
2. 运行 gulp

        gulp default multiDir

3. 查看结果

    >1. default 任务的运行结果  
    >文件夹 `1.gulp.src&gulp.dest/dist` 下多了一个 `src.js`  
    >2. multiDir 任务的运行结果  
    >文件夹 `1.gulp.src&gulp.dest/dist` 下多了一个 `dist.js` 文件夹，其下面有一个 `src.js` 文件  
    >证明了 `dist()` 方法只拷贝，不做其他的任务事情，包括重命名文件。
    
    >这只是一个简单的文件拷贝


## gulp API

### gulp.src()

1. 介绍  
在 Gulp 中，使用的是 nodejs 中的 Stream。  
Gulp 使用的流不是原始文件流，而是 *虚拟文件对象流(vinyl files)* , 这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息。  
（PS:上一个例子上，dest()方法只指定了文件路径，文件名确与原始文件相同，可以说明虚拟文件对象保存的信息。查看 [vinyl](https://github.com/gulpjs/vinyl) 项目。）
2. 语法

        gulp.src(globs[,options])

    globs 参数是文件匹配模式（类似正则表达式，语法不完全一样），用于匹配文件路名（包括文件名）。当有多个匹配模式时，该参数为一个数组。  
    options 可选参数，通常用不到。

3. globs 语法

    gulp 内部使用了 node-glob 模块来实现文件匹配功能。使用下面特殊字符来匹配想要得到的文件：  

    匹配符 | 说明
    ---|---
    \* | 0个或多个字符，不会匹配路径分隔符，除非路径分隔符出现在文件的末尾
    \*\* | 匹配文件路径中的多个目录及其子目录，需要单独出现，即它左右不能有其他字符。如果出现在末尾，也能匹配文件
    \? | 匹配文件路径中的一个字符，不能匹配路径分隔符
    \[...\] | 匹配方括号中出现的任意一个字符。方括号中的第一个字符如果是 `^` 或 `!` 表示不匹配方括号中出现的任意一个字符
    \!(pattern\|pattern\|pattern) | 匹配不在()中出现的任意一个模式
    \?(pattern\|pattern\|pattern) | 匹配()中出现的任意一个模式，0次或1次
    \+(pattern\|pattern\|pattern) | 匹配()中出现的任意一个模式，至少1次
    \*(pattern\|pattern\|pattern) | 匹配()中出现的任意一个模式，0次或多次
    \@(pattern\|pattern\|pattern) | 匹配()中出现的任意一个模式，1次

### gulp.dest()

1. 介绍  
用流生成文件

2. 语法

        gulp.dest(path[,options])

    path 为文件写入的路径。只能指定文件路径，不能指定文件名，文件名来源于导入流的文件名。    
    options 通常不用

    > 想要改名需要使用 *gulp-rename* 插件
    
#### gulp.dest() 实践（包括gulp.src()）

1. 新建路径 `1.gulp.src&gulp.dest\app\jquery` ，用于匹配多路径
2. 新建文件 `1.gulp.src&gulp.dest\app\jquery\jquery.js` 
3. 更改文件 `1.gulp.src&gulp.dest\gulpfile.js` ，新增task

        gulp.task('pattern', function () {
            gulp.src('app/**/*.js')
            .pipe(gulp.dest('dist'));
        });

    `app/**` 匹配 `app` 下的所有文件夹  
    `app/**/*.js` 匹配 `app` 下所有文件夹的 `.js` 文件

4. 运行 pattern 任务

        gulp pattern
        
5. 结果

    app 下的文件（.js文件）和文件夹全部拷贝到了 dest 下。
    
#### 拷贝多个指定后缀的文件
1. 新建路径 `app/images/`
2. 新建文件 `app/images/a.jpg` 和 `app/images/b.png`
3. 更改文件 `1.gulp.src&gulp.dest\gulpfile.js` ，新增task

        gulp.task('copyMultiSuffix', function() {
            gulp.src('app/**/*.{jpg,png}') // 类似正则，正则是使用[]
            .pipe(gulp.dest('dist'));
        });
        
4. 运行 copyMultiSuffix 任务

5. 结果

    a.jpg 和 b.png 位于 `dist/images` 目录下。

#### 丢失路径结构

1. 更改文件 `1.gulp.src&gulp.dest\gulpfile.js` ，新增task
   
           gulp.task('lostDir', function () {
               gulp.src('app/jquery/jquery.js') // 没有通配符，只会拷贝文件到目标文件夹
               .pipe(gulp.dest('dist')); //  jquery.js 位于 dest 文件夹下
           });
           
2. 运行 lostDir 任务

        gulp lostDir
        
3. 结果

    jquery.js 位于 `dist/` 文件夹下。并没有像期望的那样位于 `dist/jquery/` 
    
#### 用 base 基准路径解决拷贝文件丢失路径结构的问题

1. 新建路径 `app/bootstrap/` 
2. 新建文件 `app/bootstrap/bootstrap.js` 
3. 使用基准路径解决问题，更改文件 `1.gulp.src&gulp.dest\gulpfile.js` ，新增task

        gulp.task('basePath', function () {
            // 当不指定 base 时，基准路径默认以出现 之前的那部分路径
            // 指定 base 后，下面 base 路径为 'app/' , 拷贝路径为 'app/'之后的路径。这样就解决了路径丢失的问题。
            gulp.src(['app/bootstrap/bootstrap.js','app/jquery/jquery.js'],{base:'app'})
            .pipe(gulp.dest('dist'));
        });
4. 运行 basePath 任务

        gulp basePath
        
5. 结果

    dest  
    |-bootstrap  
    ....|-bootstrap.js  
    |-jquery  
    ....|-jquery.js  
    路径没有丢失
    
6. 对比以前的任务

        gulp.task('pattern', function () {
            // base 为 'app/' ,  ** 为路径通配符
            gulp.src('app/**/*.js')
            .pipe(gulp.dest('dist'));
        });
        
        gulp.task('lostDir', function () {
           // base 为 'app/jquery'
           gulp.src('app/jquery/jquery.js')
           .pipe(gulp.dest('dist'));
        });
        
#### some more

1. 排除某个文件。更改文件 `1.gulp.src&gulp.dest\gulpfile.js` ，新增 exclude 任务

        gulp.task('exclude', function () {
            // 排除 'app/bootstrap/bootstrap.js'
            gulp.src(['app/**/*.js','!app/bootstrap/bootstrap.js'])
            .pipe(gulp.dest('dist'));
        });


### gulp.task()

1. 介绍  
gulp.task() 用来定义任务。

2. 语法

        gulp.task(name,[,deps], fn)

    name 任务的名字  
    deps 依赖的任务列表，在所有依赖的任务执行完毕后，才开始执行本任务  
    fn 任务执行的方法  

#### 多个任务实践

1. *清晰起见，新建一个工作路径 :* `2.gulp.task` 
2. 新建文件 `2.gulp.task/gulpfile.js`

        var gulp = require('gulp');
        
        // 任务会按照数组里书写的顺序来执行
        gulp.task('default',['t1','t2','t3']);
        
        gulp.task('t1', function () {
            console.log("task 1");
        });
        
        gulp.task('t2', function () {
            console.log("task 2");
        });
        
        gulp.task('t3', function () {
            console.log("task 3");
        });

3. 运行

        gulp
        
4. 结果

    >[16:33:55] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [16:33:55] Starting 't1'...  
     task 1  
     [16:33:55] Finished 't1' after 70 μs  
     [16:33:55] Starting 't2'...  
     task 2  
     [16:33:55] Finished 't2' after 79 μs  
     [16:33:55] Starting 't3'...  
     task 3  
     [16:33:55] Finished 't3' after 95 μs  
     [16:33:55] Starting 'default'...  
     [16:33:55] Finished 'default' after 3.58 μs  

#### 出现包含异步的任务，执行顺序被打乱

1. 介绍  
gulp 并不会等待异步任务的完成，而是接着执行后面的任务
2. 修改 `2.gulp.task/gulpfile.js` ， 增加异步任务

        gulp.task('async', function () {
            setTimeout(function () {
                console.log('async');
            }, 3000);
        })
        
        gulp.task('includeAsync',['t1','async','t2'], function () {
            console.log('include async');
        });
        
3. 执行

        gulp includeAsync

3. 结果

    >[22:57:16] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [22:57:16] Starting 't1'...  
     task 1  
     [22:57:16] Finished 't1' after 106 μs  
     [22:57:16] Starting 'async'...  
     [22:57:16] Finished 'async' after 259 μs  
     [22:57:16] Starting 't2'...  
     task 2  
     [22:57:16] Finished 't2' after 75 μs  
     [22:57:16] Starting 'includeAsync'...  
     include async  
     [22:57:16] Finished 'includeAsync' after 53 μs  
     async  

    >可以看出 't2' 和 'includeAsycn' 并没有等待 'async' 完成再执行，但是同步任务都是依次执行的

4. one more example, 修改 `2.gulp.task/gulpfile.js` ， 增加一个新的异步任务

        var fs = require('fs);
        
        gulp.task('writeFile', function () {
            setTimeout(function () {
                fs.writeFile('info.txt', 'hello', function (err) {
                
                });
            }, 3000);
        });

        
        gulp.task('readFile', ['writeFile'], function () {
            fs.readFile('info.txt',function (err,data) {
                console.log(data);
            });
        });
        
5. 执行

        gulp readFile
        
6. 结果

    >[23:11:47] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [23:11:47] Starting 'writeFile'...  
     [23:11:47] Finished 'writeFile' after 175 μs  
     [23:11:47] Starting 'readFile'...  
     [23:11:47] Finished 'readFile' after 330 μs  
     undefined  

7. 影响

    这样就会出现问题，如果两个任务有很强的先后顺序依赖，就会导致任务执行失败。

#### 等待异步任务完成后再执行（次节慎看，事件结果不正确）

有三种方法解决包含异步代码的 task 的执行顺序

##### 回调函数的方式实现
 
在异步操作完成后执行一个回调函数来通知 gulp 这个异步任务已经完成，这个回调函数就是任务函数的第一个参数。

1. 修改 `2.gulp.task/gulpfile.js` ， 增加一个新的异步任务

        // cb 是任务函数提供的回调函数，用来通知任务已经完成（cb 是 gulp 提供的，就像中间件的 next 一样）
        gulp.task('asyncType1', function (cb) {
            setTimeout(function () {
                
                console.log('asyncType1');
                // 执行回调，表示这个任务已经完成
                cb();
        
            }, 3000);
        });


##### 流对象方式实现

在没有能力自己写插件的情况下，先略。

##### promise 的方式实现

1. 本地安装 `q` ,它是一个实现了 promise 的工具，在命令行执行

        npm i q

2. 修改 `2.gulp.task/gulpfile.js` ， 增加一个新的异步任务

        gulp.task('asyncType3', function () {
            var deferred = Q.defer();
            
            // 一些异步操作
            setTimeout(function () {
                console.log('asyncType3');
            }, 1000);
            
            return deferred.promise;
        });

3. 修改 `2.gulp.task/gulpfile.js` ， 增加一个新的组合任务，同时包含同步和异步任务

        gulp.task('asyncSerial', ['t1', 'asyncWriteFileType1', 'asyncWriteFileType3', 't2']);

4. 运行

        gulp asyncSerial

5. 结果

    >[23:51:59] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [23:51:59] Starting 't1'...  
     task 1  
     [23:51:59] Finished 't1' after 71 μs  
     [23:51:59] Starting 'asyncType1'...  
     [23:51:59] Starting 'asyncType3'...  
     [23:51:59] Starting 't2'...  
     task 2  
     [23:51:59] Finished 't2' after 67 μs  
     asyncType3  
     asyncType1  
     [23:52:05] Finished 'asyncType1' after 6 s  

    >这特么就尴尬了，没有按预定义的执行顺序不说， 任务 'asyncType3' 的 Finished 也没有打印。  
    哪里有问题？
    
#### 使用 gulp-sequence 插件解决异步任务的执行顺序

1. 安装 gulp-sequence

        npm i gulp-sequence --D
        
2. 注意

    使用 gulp-sequence 插件，必须在每个子任务中指定 callback
    
3. 修改 `2.gulp.task/gulpfile.js` ，新增另外一个 asyncType1

        gulp.task('antherAsyncType1', function (cb) {
            setTimeout(function () {
                
                console.log('antherAsyncType1');
                cb();
                
            }, 3000);
        });

4. 修改 `2.gulp.task/gulpfile.js` ， 使用插件的方式新建一个组合任务

        gulp.task('gulpSequence', function(cb) {
            gulpSequence('t1', 'asyncType1', 'antherAsyncType1', 't2')(cb);
        });
        
5. 运行

        gulp gulpSequence

6. 结果

    >[00:13:21] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [00:13:21] Starting 'gulpSequence'...  
     [00:13:21] Starting 't1'...  
     task 1  
     [00:13:21] Finished 't1' after 101 μs  
     [00:13:21] Starting 'asyncType1'...  
     asyncType1  
     [00:13:24] Finished 'asyncType1' after 3 s  
     [00:13:24] Starting 'antherAsyncType1'...  
     antherAsyncType1  
     [00:13:27] Finished 'antherAsyncType1' after 3.01 s  
     [00:13:27] Starting 't2'...  
     task 2  
     [00:13:27] Finished 't2' after 228 μs  
     [00:13:27] Finished 'gulpSequence' after 6.03 s  
     
    >这回运行结果让人很舒爽

#### gulp-sequence 其他用法

1. 介绍

    gulp-sequence 提供了多种执行任务的方式
    
2. 修改 `2.gulp.task/gulpfile.js` ， 新增一些异步方法，按照下面方法增加 b c d e f 任务

        gulp.task('a', function (cb) {
            setTimeout(function () {
                
                console.log('a');
                cb();
                
            }, 1000);
        });
        
3. 修改 `2.gulp.task/gulpfile.js` ，新增组合任务，一种使用方法

        // usage 1, recommend
        // 1. run 'a', 'b' in parallel;
        // 2. run 'c' after 'a' and 'b';
        // 3. run 'd', 'e' in parallel after 'c';
        // 3. run 'f' after 'd' and 'e'.
        gulp.task('sequence-1', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'));
        
4. 运行 

        gulp sequence-1

5. 结果

    >[00:22:04] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\2.gulp.task\gulpfile.js  
     [00:22:04] Starting 'sequence-1'...  
     [00:22:04] Starting 'a'...  
     [00:22:04] Starting 'b'...  
     a  
     [00:22:05] Finished 'a' after 1 s  
     b  
     [00:22:05] Finished 'b' after 1 s  
     [00:22:05] Starting 'c'...  
     c  
     [00:22:06] Finished 'c' after 1.01 s  
     [00:22:06] Starting 'd'...  
     [00:22:06] Starting 'e'...  
     d  
     [00:22:07] Finished 'd' after 1 s  
     e  
     [00:22:07] Finished 'e' after 1.01 s  
     [00:22:07] Starting 'f'...  
     f  
     [00:22:08] Finished 'f' after 1.01 s  
     [00:22:08] Finished 'sequence-1' after 4.05 s  

6. 修改 `2.gulp.task/gulpfile.js` ，新增组合任务，另一种使用方法

        // usage 2
        gulp.task('sequence-2', function (cb) {
          gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f', cb);
        });

7. 修改 `2.gulp.task/gulpfile.js` ，新增组合任务，又一种使用方法

        // usage 3
        gulp.task('sequence-3', function (cb) {
            gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f')(cb);
        });

### gulp.watch()

1. 简介
gulp.watch() 用来监视文件的变化，当文件发生变化后，可以用它来执行相应的任务，例如压缩文件、更新服务等。

2. 语法

        gulp.watch(glob [,opts], tasks)
        gulp.watch(glob,[,opts, cb])

glob 为要监视文件的匹配模式  
opts 为一些可选的配置项  
tasks 文件变化后需要执行的任务，是一个数组  
cb 为回调函数，每当监视的文件发生变化，就会调用这个函数，并传入一个对象，该对象包含了文件变化的信息。
type 属性为变化类型，可以是 add、changed、deleted；path属性为发生变化的文件路径。

#### 监控指定文件变化，然后拷贝到 dest 目录下

1. 新建路径 `3.gulp.watch`
2. 拷贝路径 `1.gulp.src&gulp.dest/app` 到 `3.gulp.watch/app`
3. 新建文件 `3.gulp.watch/gulpfile.js` , 新增 gulp.watch() 功能，使用 `gulp.watch(glob [,opts], tasks)` API

        var gulp = require('gulp');
        
        gulp.task('default', [], function () {
            console.log('default');
        });
        
        gulp.task('copy_js', function () {
            console.log('copy_js');
        });
        
        gulp.watch('app/**/*.js', ['copy_js']);
        
    >当然，也可以把 `gulp.watch('app/**/*.js', ['copy_js']);` 写到 `default` 任务里。
    
    >虽然 `default` 任务没有调用 `watch` 但是，该 gulpfile 可以运行，`watch` 就会生效。
    
4. 运行

        gulp
        
5. 结果

    这时会发现任务并没有退出，这时 `watch` 任务的特点。
    
    随便在路径 `3.gulp.watch/app` 下创建一个 `.js` 文件 或者 改变 `.js` 文件的内容。
    
    >D:\SE_NodejsProject_WebStrom\nodejs.gulp\3.gulp.watch>gulp  
     [22:06:30] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\3.gulp.watch\gulpfile.js  
     [22:06:30] Starting 'default'...  
     default  
     [22:06:30] Finished 'default' after 142 μs  
     [22:06:36] Starting 'copy_js'...  
     copy_js  
     [22:06:36] Finished 'copy_js' after 169 μs  
     [22:06:37] Starting 'copy_js'...  
     copy_js  
     [22:06:37] Finished 'copy_js' after 850 μs  
     
6. 修改文件 `3.gulp.watch/gulpfile.js` , 使用 `gulp.watch(glob,[,opts, cb])` API

        gulp.watch('app/**/*.js', function (event) {
            console.log('event.type : ' + event.type);
            console.log('event.path : ' + event.path);
            console.log(event);
        });
        
7. 运行

        gulp

8. 结果，当然，对 `.js` 文件做些什么才能看到结果

    >D:\SE_NodejsProject_WebStrom\nodejs.gulp\3.gulp.watch>gulp  
     [22:27:17] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\3.gulp.watch\gulpfile.js  
     [22:27:17] Starting 'default'...  
     default  
     [22:27:17] Finished 'default' after 98 μs  
     [22:27:20] Starting 'copy_js'...  
     copy_js  
     [22:27:20] Finished 'copy_js' after 332 μs  
     event.type : changed  
     event.path : D:\SE_NodejsProject_WebStrom\nodejs.gulp\3.gulp.watch\app\router.js  
     { type: 'changed',  
       path: 'D:\\SE_NodejsProject_WebStrom\\nodejs.gulp\\3.gulp.watch\\app\\router.js' }  

## gulp 插件

1. 简介

    gulp 提供了 4 个很实用的 API ，但是 gulp 本身并不能做太多事情。很多复杂的功能需要借助插件来实现。如：
    * 编译 sass : gulp-sass
    * 编译 less : gulp-less
    * 合并文件 : gulp-concat
    * 压缩 js 文件 : gulp-uglify
    * 重命名 js 文件 : gulp-rename
    * 优化图像大小 : gulp-imagemin
    * 压缩 css : gulp-minify-css
    * 创建本地服务器 和 实时预览: gulp-connect
    
2. 实用插件步骤

    2.1. 安装插件、
    
        npm i gulp-xxx -D

    2.2. 引入插件
    2.3. 使用插件
    
### gulp-load-plugins

1. 介绍 gulp-load-plugins

    `gulp-load-plugins` 插件能自动加载 `package.json` 文件里的 `gulp` 插件。  
    假如 `package.json` 文件中有一下插件：
    
        "devDependencies": {
            "gulp": "^3.9.1",
            "gulp-concat": "^2.6.1",
            "gulp-connect": "^5.0.0",
            "gulp-rename": "^1.2.2",
            "gulp-sequence": "^0.4.6",
            "gulp-uglify": "^2.1.2"
          }
    这样在 `gulpfile.js` 中逐个引用是非常麻烦，使用 `gulp-load-plugins` 插件可以简化引用 gulp 插件。  
    使用 `$.concat`,`$.rename` 来代替，也就是原始插件名去掉 `gulp-` 前缀，之后的部分再转换为驼峰命名。  
    
2. 拷贝 `1.gulp.src&gulp.dest/app` 到  `4.plugins/app`
3. 新建文件 `a.js` 和 `b.js` 内容分别为

    a.js
    
        console.log('a');

    b.js
    
        console.log('b');
        
4. 修改 `4.plugins/app/gulpfile.js` ， 使用 `gulp-concat` 插件配合出演

        var gulp = require('gulp');
        var $ = require('gulp-load-plugins')(); // 一定要执行
        
        gulp.task('default', function () { // gulp 任务
            gulp.src('app/[ab].js') // app/ 下的 a.js 和 b.js
            .pipe($.concat('ab.js')) // pipe 到 gulp-concat 插件中，concat() 的参数为合并后的文件名
            .pipe(gulp.dest('dist')); // 生成文件
        });
        
5. 运行

        gulp
        
6. 结果

    在 `dist` 文件夹下，出现了 `ab.js` 内容为
    
        console.log('a');
        console.log('b');

### gulp-less

1. 简介

    

2. 目标

    将 `app/less` 下的 `.less` 文件编译到 `/dist/css` 下。
    
3. 安装插件

        npm i gulp-less -D

4. 新建路径 `4.plugins/app/less`
5. 新建文件 `4.plugins/app/less/page.less` ， 简单增加点内容

        @baseColor: purple;
        
        body{
          coler: @baseColor;
        }
        
        basefont{
          color: @baseColor;
        }
        
6. 修改文件 `4.plugins/gulpfile.js` , 增加编译 less 的任务

        gulp.task('compile-less', function () {
            gulp.src('app/less/*.less')
            .pipe($.less())
            .pipe(gulp.dest('dist/css'));
        });
        
7. 运行

        gulp compile-less
        
8. 结果

    路径 `dist/css` 下出现 `page.css` ， 内容为
    
            @baseColor: purple;
            
            body{
              coler: @baseColor;
            }
            
            basefont{
              color: @baseColor;
            }

### gulp-sass   
跟 less 差不多

### gulp-connect 

1. 简介

    可以帮助将文件放到本地服务器上预览， `gulp-conncet` 可以创建本地服务器并运行项目。
    
2. 安装

    npm i gulp-connect -D
    
3. 修改文件 `4.plugins/app/gulpfile.js`

        gulp.task('server', function () {
            $.connect.server({
                root : 'dist', // 静态文件根目录
                port : 8080 // 服务器运行端口，默认为 8080
            });
        });
        
4. 运行

        gulp server
        
5. 结果

    访问 `http://localhost:8080` 查看结果。可以访问文件和文件夹。
    
    >如果 `dist` 下有 `index.html` 文件，则会默认访问 `index.html` 。
    
### 当文件发生变化的时候，实时刷新浏览器

1. 新建文件 `4.plugins/app/index.html` 

2. 修改文件 `4.plugins/gulpfile.js`

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

3. 运行

        gulp aotu-server
4. 结果

    控制台：
    >[19:29:49] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\4.plugins\gulpfile.js  
     [19:29:49] Starting 'livereload-server'...  
     [19:29:49] Finished 'livereload-server' after 168 ms  
     [19:29:49] Starting 'watch-html'...  
     [19:29:49] Finished 'watch-html' after 5.9 ms  
     [19:29:49] Starting 'auto-server'...  
     [19:29:49] Finished 'auto-server' after 3.83 μs  
     [19:29:49] Server started http://localhost:8080  
     [19:29:49] LiveReload started on port 35729  
     [19:29:56] Starting 'copy-index-and-reload'...  
     [19:29:56] Finished 'copy-index-and-reload' after 5.18 ms  
     
     这里会启动两个server
     >[19:29:49] Server started http://localhost:8080  
      [19:29:49] LiveReload started on port 35729  

    修改 `4.plugins/app/index.html` 文件，观察浏览器变化。
    
5. 原理

    右键页面，查看源文件。发现有这样一个 `script` 
    
        <script src="//localhost:35729/livereload.js?snipver=1" async="" defer=""></script>
    
    这其实是一个 `websocket` （长）连接 `LiveReload` 这个 server 。

### gulp-uglify

1. 简介

    压缩 `JS` 文件。
    
2. 安装

    npm i gulp-uglify -D
    
3. 修改文件 `4.plugins/src.js` ，增加一个用于压缩的JS方法

        // a(1) 打印 1
        var a = function (b) {
            console.log(b);
        };

4. 修改文件 `4.plugins/gulpfile.js` 文件

        gulp.task('ugligy-src', function () {
            gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js']) // 包含src.js a.js b.js 排除 *.tmp.js
            .pipe($.concat('all.js')) // 连接所有 js 文件
            .pipe($.uglify()) // 压缩文件
            .pipe(gulp.dest('dist')) // 输出
        });
        
5. 运行

        gulp ugligy-src
        
6. 结果

    查看 `4.plugins/dist/all.js` 内容为
    
        var a=function(o){console.log(o)};console.log("a"),console.log("b");
        
### gulp-minify-html

1. 简介

    压缩 `html` 文件。

2. 安装

    npm i gulp-minify-html -D

3. 压缩前的 `index.html` 文件

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            hello1
        </body>
        </html>

4. 修改文件 `4.plugins/gulpfile.js` 文件 , 增加压缩 `html` 任务

        // gulp-minify-html
        gulp.task('minify-html', function () {
            gulp.src('app/index.html')
            .pipe($.minifyHtml())
            .pipe(gulp.dest('dist'));
        });
        
5. 运行

    gulp minify-html
    
6. 结果

    压缩后的 html 文件 
    
        <!DOCTYPE html><html lang=en><head><meta charset=UTF-8><title>Title</title></head><body>hello1</body></html>
        
### gulp-rename

1. 简介

    重命名文件
    
2. 安装

    npm i gulp-rename -D

3. 修改文件 `4.plugins/gulpfile.js` 文件 , 增加一个任务：合并文件、压缩合并后的文件，当然，两个文件是没办法重名的

        // gulp-rename
        gulp.task('rename', function () {
            gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js'])
            .pipe($.concat('all.js'))
            .pipe(gulp.dest('dist')) // 生成合并文件
            .pipe($.uglify())
            .pipe($.rename('all.min.js')) // 重命名文件
            .pipe(gulp.dest('dist')); // 生成压缩的合并文件
        });
        
4. 运行

    gulp rename
    
5. 结果

    查看 `4.plugins/dist` 下的两个文件目标文件
    
    all.js
    
            // a(1) 打印 1
            var a = function (b) {
                console.log(b);
            };
            
            console.log('a');
            console.log('b');

    all.min.js
    
        var a=function(o){console.log(o)};console.log("a"),console.log("b");
        
6. 自定义路径名

        // 自定义重命名
        gulp.task('rename-customer', function () {
            gulp.src(['app/src.js', 'app/[ab].js', '!app/*.tmp.js'])
            .pipe($.concat('all.js'))
            .pipe(gulp.dest('dist')) // 生成合并文件
            .pipe($.uglify())
            .pipe($.rename(function (path) {
                path.dirname += '1'; // 
                path.basename += '.min';
                path.extname += '.js';
            })) // 重命名文件
            .pipe(gulp.dest('dist')); // 生成压缩的合并文件
        });

7. 运行

        gulp rename-customer
        
8. 结果

    生成的文件路径 `/dist/all.js` 和 `/dist/.1/all.min.js.js`
        

### gulp-minify-css

### gulp-igagemin

### jshint

1. 简介

    代码检查，帮助发现一些代码中潜在的问题。
    
2. 安装

    *必须同时安装 `jshint` 和 `gulp-jshint` 两个插件*。
    
        npm i jshint gulp-jshint -D

3. 使用方法

    * `jshint` 需要依赖 `.jshintrc` 文件指定的检查项来执行检查，如果没有这个文件或者没有配置任何检查项，那 `jshint` 是不会做任何事情的。
    * `jshint` 的检查项请参照 [全部检查选项](http://jshint.com/docs/options/)
    
4. 修改文件 `4.plugins/gulpfile.js` 文件 , 增加 `jshint` 任务

        // jshint
        gulp.task('check-js', function () {
            gulp.src('app/**/*.js')
            .pipe($.jshint()) // 执行代码检查
            .pipe($.jshint.reporter()) // 输出检查结果
        });
        
5. 运行

        gulp check-js
        
6. 结果 

    >[22:56:05] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\4.plugins\gulpfile.js  
     [22:56:05] Starting 'check-js'...  
     [22:56:05] Finished 'check-js' after 203 ms  

    >其实是什么都没有做，因为没有在 `jshintrc` 中配置检查规则。
    
7. 新建文件 `4.plugins/app/useful.js` ，在其中写一些错误代码

        // 变量没有声明就引用
        function add(a) {
             return a + b;
        }
        
        // 变量没有使用过
        function say(sentence) {
            console.log('catch me');
        }

    >此时运行 jshint 仍然不会做实际的事情，因为还是没有 .jshintrc 文件来指定检查项。  
        
8. 新建文件 `4.plugins/.jshintrc` 文件，在 [全部检查选项](http://jshint.com/docs/options/) 中找几个检查项

        {
          "undef": true,
          "unused": true,
          "globals": {
            "MY_GLOBAL": true
          }
        }

9. 运行

        gulp check-js
        
10. 结果

    >[23:08:11] Using gulpfile D:\SE_NodejsProject_WebStrom\nodejs.gulp\4.plugins\gulpfile.js  
     [23:08:11] Starting 'check-js'...  
     [23:08:11] Finished 'check-js' after 202 ms  
     app\a.js: line 1, col 1, 'console' is not defined.  
     
     1 error  
     app\b.js: line 1, col 1, 'console' is not defined.  
     
     1 error  
     app\src.js: line 3, col 5, 'console' is not defined.  
     app\src.js: line 2, col 5, 'a' is defined but never used.  
     
     2 errors  
     app\useful.js: line 13, col 14, 'sentence' is defined but never used.  
     app\useful.js: line 9, col 17, 'b' is not defined.  
     app\useful.js: line 14, col 5, 'console' is not defined.  
     app\useful.js: line 8, col 10, 'add' is defined but never used.  
     app\useful.js: line 13, col 10, 'say' is defined but never used.  
     
     5 errors  
