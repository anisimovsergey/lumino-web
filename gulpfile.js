/* gulpfile.js */
var 
    gulp = require('gulp'),
    sass = require('gulp-sass');
    jquery = require('gulp-jquery');

// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source
var bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    };

// fonts
var fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    };

 // css source file: .scss files
var css = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};


gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});


// compile scss
gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));
});


// default task
gulp.task('default', ['sass'], function () {
     gulp.watch(css.watch, ['sass']);
});

// creates ./public/vendor/jquery.custom.js 
gulp.task('jquery', function () {
	return jquery.src({
		release: 2, //jQuery 2 
		flags: ['-all']
	})
	.pipe(gulp.dest('./public/vendor/'));
});