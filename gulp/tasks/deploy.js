import githubPages from 'gulp-gh-pages';
import gulp from 'gulp';

gulp.task('deploy', gulp.series('build', () => {
  return gulp.src('build/**/*')
    .pipe(githubPages());
}));
