import connect from 'gulp-connect';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgStore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

gulp.task('icons', () => {
  return gulp.src('source/images/icons/**')
    .pipe(plumber())
    .pipe(svgmin({
      plugins: [
        { removeViewBox: false },
        { removeAttrs: { attrs: "(stroke|fill)" } }
      ]
    }))
    .pipe(svgStore())
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});
