var gulp = require('gulp');
var sass = require('gulp-sass')
var notify = require('gulp-notify')
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifycss =  require('gulp-minify-css');

var config = {
    mincss: 'layout2.css',
    publicDir: './public'
};

gulp.task('css', function() {
    var processors = [
        autoprefixer
    ]
    return gulp.src('./main.scss')
    .pipe(sass()
    .on("error", notify.onError(function (error) {
        return "Error: " + error.message;
    })))
    .pipe(notify({ message: 'scss convert to css done.'}))
    .pipe(gulp.dest(config.publicDir + '/css'))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(rename(config.mincss))
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
   gulp.watch('./layout/*.scss', ['css']);
});

gulp.task('default', ['css']);
