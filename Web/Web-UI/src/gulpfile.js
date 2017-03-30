var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('styles', function(){
    gulp.src('*.scss', {base: './'})
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.'))
})