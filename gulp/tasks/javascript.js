import connect from 'gulp-connect';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import webpackConfig from '../../webpack.config.babel.js';

gulp.task('javascript', () => {
  return gulp.src('source/javascript/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/javascript'))
    .pipe(connect.reload());
});
