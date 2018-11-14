import connect from 'gulp-connect';
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('stylesheets', () => {
  return gulp.src('source/stylesheets/index.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(connect.reload());
});
