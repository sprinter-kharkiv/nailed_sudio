'use strict';

var gulp                   = require('gulp'),
    sass                   = require('gulp-sass'),
	autoprefixer           = require('gulp-autoprefixer'),
  	cleanCSS 	           = require('gulp-clean-css'),
    uglify                 = require('gulp-uglify'),
    pump                   = require('pump'),
    rigger                 = require('gulp-rigger'),
    imagemin               = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminSvgo           = require('gulp-imagemin').svgo,
    imageminPngquant       = require('imagemin-pngquant'),
  	browserSync            = require('browser-sync').create(),
  	watch                  = require('gulp-watch');

var task = {};

var path = {
    build: {
    	html: 'dist/',
        stylesheets: 'dist/assets/stylesheets/',
        img: 'dist/assets/images/',
        javascript: 'dist/assets/javascript/',
        fonts: 'dist/assets/fonts/',
        vendors: 'dist/assets/vendors/'
    },
    src: {
    	html: 'src/*.html',
        stylesheets: 'src/assets/stylesheets/main.scss',
        img: 'src/assets/images/**/*.*',
        javascript: 'src/assets/javascript/**/*.js',
        fonts: 'src/assets/fonts/**/*.*',
        vendors: 'src/assets/vendors/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        stylesheets: 'src/assets/stylesheets/**/*.scss',
        img: 'src/assets/images/**/*.*',
        javascript: 'src/assets/javascript/**/*.js',
        fonts: 'src/assets/fonts/**/*.*',
        vendors: 'src/assets/vendors/**/*.*'
    }
};

// HTML
gulp.task('html:build', task.html = function () {
	gulp.src(path.src.html)
    .pipe(rigger())
	  .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Stylesheets
gulp.task('sass:build', function () {
  return gulp.src(path.src.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.build.stylesheets))
    .pipe(browserSync.reload({
        stream: true
    }));
});


// JAVASCRIPT
gulp.task('javascript:build', task.javascript = function () {
	gulp.src(path.src.javascript)
        .pipe(uglify())
	    .pipe(gulp.dest(path.build.javascript))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// FONTS
gulp.task('fonts:build', task.fonts = function () {
    gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// VENDORS
gulp.task('vendors:build', task.vendors = function () {
  	gulp.src(path.src.vendors)
    .pipe(gulp.dest(path.build.vendors))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//Images
gulp.task('img:build', task.img = function () {
	gulp.src(path.src.img)
    .pipe(imagemin([
        imageminJpegRecompress({quality: 'low'}),
        imageminSvgo(),
        imageminPngquant({nofs: true, speed: 1})
    ]))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Server
gulp.task('server:build', function() {
  	browserSync.init({
    	port : 3200,
    	server: {
      		baseDir: "dist"
    	},
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            }
        },
    	open: true
  	});
});


gulp.task('build', [
    'html:build',
    'sass:build',
    'server:build',
   // 'img:build',
    'javascript:build',
    'vendors:build',
    'fonts:build'
]);

gulp.task('watch', function () {
    watch([path.watch.stylesheets], function (event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
/*    watch([path.watch.img], function (event, cb) {
        gulp.start('img:build');
    });*/
    watch([path.watch.javascript], function (event, cb) {
        gulp.start('javascript:build');
    });
    watch([path.watch.vendors], function (event, cb) {
        gulp.start('vendors:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'watch']);
