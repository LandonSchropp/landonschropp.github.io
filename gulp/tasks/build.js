import gulp from 'gulp';

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'static',
    'html',
    'stylesheets',
    'javascript',
    'images'
  )
));
