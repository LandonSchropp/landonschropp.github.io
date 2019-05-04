import connect from 'gulp-connect';
import gulp from 'gulp';

gulp.task('static', () => {
  return gulp.src([ 'source/static/*', 'source/static/.*' ])
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});
