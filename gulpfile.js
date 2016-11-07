'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var gulpIf = require('gulp-if');
var watch = require('gulp-watch');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// $ NODE_ENV=production gulp styles


gulp.task('css', function(cb){
	gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'src/css/style.css'])
		.pipe(concat('all.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/css'));
	cb();
});

gulp.task('js', function(cb){
	gulp.src(['bower_components/jquery/dist/jquery.js','bower_components/bootstrap/dist/js/bootstrap.js'])
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest('public/js'));
	cb();
});

gulp.task('html', function(cb){
	gulp.src('src/*.html')
		.pipe(gulp.dest('public'));
	cb();
});

gulp.task('img', function(cb){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('public/images'))
});


gulp.task('clean', function(cb){
	return gulp.src('public', {read: false})
		.pipe(clean());
});


gulp.task('build',['clean'], function(cb){
	runSequence(['html','css', 'js','img'], cb);
});


gulp.task('watch', function(cb){
	gulp.watch('src/css/*.*', ['css']);
	gulp.watch('src/*.html', ['html']);
	gulp.watch('src/img/*.*', ['img']);
});

gulp.task('default', function(cb){
	runSequence(['clean', 'build'], cb)
});


