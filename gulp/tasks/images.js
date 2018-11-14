import connect from 'gulp-connect';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';

gulp.task('images', () => {
  return gulp.src('source/images/**')
    .pipe(plumber())
    .pipe(gulpIf(process.env.NODE_ENV === 'production', imagemin()))
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});
