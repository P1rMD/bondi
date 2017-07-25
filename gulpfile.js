var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	cssnano			= require('gulp-cssnano'),
	rename			= require('gulp-rename'),
	del				= require('del'),
	imagemin		= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant'),
	cache			= require('gulp-cache'),
	autoprefixer	= require('gulp-autoprefixer');


gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8'], {cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


// gulp.task('css-min', ['sass'], function() {
// 	return gulp.src('app/css/*.css')
// 	.pipe(cssnano())
// 	.pipe(rename({suffix: '.min'}))
// 	.pipe(gulp.dest('app/css'));
// });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function () {
	return cache.clearAll();
});


gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});




/*GULP WATCH - for dev*/
gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
});



/*GULP BUILD - for prod*/
gulp.task('build', ['clean', 'img', 'sass'], function() {
	
	var buildCss = gulp.src([
		'app/css/style.css',
		// 'app/css/*.min.css'
	])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});