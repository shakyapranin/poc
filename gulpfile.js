var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("application/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("application/css"))
        .pipe(browserSync.stream());
});

// call sass changes before minifying css files
gulp.task('minify-css',['sass'], function() {
    return gulp.src('application/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('application/dist/css'));
});

// Compress js files
gulp.task('compress', function() {
    gulp.src('application/js/*.js')
        .pipe(minify({

            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks','lib'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('application/dist/js'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['minify-css'], function() {

    browserSync.init({
        server: "./application", // Application entry point
        //proxy: "http://118.127.53.188",
        //browser : "google-chrome", // Invoke multiple browser through ["google-chrome","firefox"]  REF : https://www.browsersync.io/docs/options/
    });
    // gulp.watch("application/scss/*.scss", ['sass']); // Call sass when scss changes
    // gulp.watch("application/*.html").on('change', browserSync.reload); // Call browser sync reload when html changes
    //
    // gulp.watch("application/js/*.js",['compress']); // Call compress when js changes
    // gulp.watch("application/dist/*.js").on('change', browserSync.reload); // Call browser sync when dist changes
    //
    // gulp.watch("application/dist/*.css").on('change', browserSync.reload); // Call browser sync on css changes
    //
    // // gulp.watch("application/js/*.js").on('change', browserSync.reload);
    //
    //
    // gulp.watch("application/css/*.css").on('change', browserSync.reload);

});

gulp.task('default',['serve']);
