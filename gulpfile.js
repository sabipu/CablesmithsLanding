const { task, src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const mmq = require('gulp-merge-media-queries');
const del = require('del');
var browserSync = require('browser-sync').create();

// Init browserSync
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./",
//             directory: true
//         }
//     });
// });

// gulp.task('sass', function() {
//     return gulp.src('./sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./css'))
//     // Stream changes to browserSync to live reload CSS changes
//     .pipe(browserSync.stream());
// });

// gulp.task('watch', function() {
//     gulp.watch('./sass/*.scss', ['sass'])
// });

// Add browserSync-init to default task
// gulp.task('default', ['sass', 'watch', 'browser-sync']);

task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        }
    });
});

task('styles', () => {
    return src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css/'));
});

task('mmq', () => {
    return src('./css/*.css')
        .pipe(mmq({ log: true }))
        .pipe(dest('./css/'));
});

task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

task('watch', () => {
    watch(['./sass/**/*.scss'], series('styles', 'mmq'))
});

task('default', series(['clean', 'styles', 'watch', 'mmq', 'browser-sync']));