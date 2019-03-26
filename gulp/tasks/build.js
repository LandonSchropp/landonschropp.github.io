import gulp from 'gulp';

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'static',
    'stylesheets',
    'javascript',
    'icons',
    'html',
    'images'
  )
));
