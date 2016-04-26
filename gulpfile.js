"use strict";
var gulp = require('gulp'),
	rename = require("gulp-rename"),
	compass = require('gulp-compass'),
	notify = require("gulp-notify"),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	del = require('del');

	
/*
	gulp              : 自動化測試
	gulp-rename       : 修改檔名
	gulp-compass      : COMPASS
	gulp-connect      : 網站伺服器server
	gulp-livereload   : 自動重新整理
	gulp-uglify       : 最小化 JavaScript
	gulp-notify       : 動作完成告示
	gulpif            : 判斷條件

*/


/*
 _____       _      _
|  __ \     | |    | |
| |  | | ___| | ___| |_ ___
| |  | |/ _ \ |/ _ \ __/ _ \
| |__| |  __/ |  __/ ||  __/
|_____/ \___|_|\___|\__\___|

*/

gulp.task('del',function(){
	del('node_modules');
})
/*
  _____ ______ _______      ________ _____
 / ____|  ____|  __ \ \    / /  ____|  __ \
| (___ | |__  | |__) \ \  / /| |__  | |__) |
 \___ \|  __| |  _  / \ \/ / |  __| |  _  /
 ____) | |____| | \ \  \  /  | |____| | \ \
|_____/|______|_|  \_\  \/   |______|_|  \_\

無法重新整理時改 port 試試看
*/
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		port: 3050,
		livereload: true
	});
});
 
/*
 _    _ _______ __  __ _
| |  | |__   __|  \/  | |
| |__| |  | |  | \  / | |
|  __  |  | |  | |\/| | |
| |  | |  | |  | |  | | |____
|_|  |_|  |_|  |_|  |_|______|
*/
gulp.task('html', function () {
    gulp.src('src/*.{html,json,aspx}')
	.pipe(gulp.dest('app'))
    .pipe(connect.reload());
});
 

/*
  ___ ___ ___
 / __/ __/ __|
| (__\__ \__ \
 \___|___/___/

*/
gulp.task('css', function () {
	gulp.src('src/css/**/*.css')
    .pipe(connect.reload())
});
 

/*
  _____          _____ _____         _____ ____  __  __ _____         _____ _____
 / ____|  /\    / ____/ ____| ___   / ____/ __ \|  \/  |  __ \ /\    / ____/ ____|
| (___   /  \  | (___| (___  ( _ ) | |   | |  | | \  / | |__) /  \  | (___| (___
 \___ \ / /\ \  \___ \\___ \ / _ \/\ |   | |  | | |\/| |  ___/ /\ \  \___ \\___ \
 ____) / ____ \ ____) |___) | (_>  < |___| |__| | |  | | |  / ____ \ ____) |___) |
|_____/_/    \_\_____/_____/ \___/\/\_____\____/|_|  |_|_| /_/    \_\_____/_____/


每個scss檔案記得加上 @charset "UTF-8"; 不然中文會出錯!!!
*/

gulp.task('compass', function() {

	gulp.src('src/sass/**/*.scss') 
    .pipe(compass({
        css: 'app/css',         
        sass: 'src/sass',     
        image: 'src/images',  
        style: 'nested',    //nested & compressed
        comments: false
    }))

	.pipe(gulp.dest('src/css'))
    .pipe(connect.reload())
});

/*
      _  _____
     | |/ ____|
     | | (___
 _   | |\___ \
| |__| |____) |
 \____/|_____/

*/

gulp.task('js', function () {
   return gulp.src('src/js/**/*.js')
   			.pipe(uglify())		    
   		.pipe(gulp.dest('app/js'))
    	.pipe(connect.reload());
});

/*
 _
(_)
 _ _ __ ___   __ _
| | '_ ` _ \ / _` |
| | | | | | | (_| |
|_|_| |_| |_|\__, |
              __/ |
             |___/
*/
gulp.task('images', function () {
    gulp.src('src/images/**')
    // .pipe( gulpif('*.jpg', imagesjpeg({quality: 50})()) )
    // .pipe( gulpif('*.png', imagespng({quality: 90})()) )
    .pipe(gulp.dest('app/images'))
   	.pipe(connect.reload());
});

/*
__          __  _______ _____ _    _
\ \        / /\|__   __/ ____| |  | |
 \ \  /\  / /  \  | | | |    | |__| |
  \ \/  \/ / /\ \ | | | |    |  __  |
   \  /\  / ____ \| | | |____| |  | |
    \/  \/_/    \_\_|  \_____|_|  |_|
*/
gulp.task('watch', function () {
	gulp.watch(['src/*.{html,json,aspx}'], ['html']);
	gulp.watch(['src/css/**/*.css'], ['css']);
	gulp.watch(['src/sass/**/*.scss'], ['compass']);
	gulp.watch(['src/js/**/*.js'], ['js']);
	gulp.watch(['src/images/**/*.{jpg,png,gif}'], ['images']);
});


gulp.task('default', ['connect', 'html', 'css', 'images', 'compass' , 'js' , 'watch']);