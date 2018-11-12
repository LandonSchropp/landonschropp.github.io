import connect from 'gulp-connect';
import del from 'del';
import githubPages from 'gulp-gh-pages';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sitemap from 'gulp-sitemap';
import sourcemaps from 'gulp-sourcemaps';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';
import webpackStream from 'webpack-stream';

if (!process.env.URL || !process.env.NODE_ENV || !process.env.PORT) {
  process.stderr.write("You must provide NODE_ENV, PORT and URL environments variables.");
  process.exit(1);
}

const COPY_GLOBS = [
  'source/**',
  '!source/pages/**',
  '!source/javascript/**',
  '!source/stylesheets/**',
  '!source/images/**'
];

gulp.task('clean', () => {
  return del([ 'build' ]);
});

gulp.task('copy', () => {
  return gulp.src(COPY_GLOBS)
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src('source/pages/**')
    .pipe(plumber())
    .pipe(nunjucksRender({ path: [ "source" ] }))
    .pipe(rename(path => {
      if (path.basename === 'index' || path.basename === '') { return; }
      path.dirname += `/${ path.basename }`;
      path.basename = 'index';
    }))
    .pipe(gulp.dest('build'))
    .pipe(sitemap({ siteUrl: process.env.URL }))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('javascript', () => {
  return gulp.src('source/javascript/index.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('build/javascript'))
    .pipe(connect.reload());
});

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

gulp.task('images', () => {
  return gulp.src('source/images/**')
    .pipe(plumber())
    .pipe(gulpIf(process.env.NODE_ENV === 'production', imagemin()))
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'copy',
    'html',
    'stylesheets',
    'javascript',
    'images'
  )
));

gulp.task('watch', gulp.series('build', () => {
  gulp.watch(COPY_GLOBS, gulp.series('copy'));
  gulp.watch('source/', gulp.series('html'));
  gulp.watch('source/stylesheets/**', gulp.series('stylesheets'));
  gulp.watch('source/javascript/**', gulp.series('javascript'));
  gulp.watch('source/images/**', gulp.series('images'));

  connect.server({
    port: process.env.PORT,
    root: 'build',
    livereload: true,
    fallback: 'build/index.html'
  });
}));

gulp.task('deploy', gulp.series('build', () => {
  return gulp.src('build/**/*')
    .pipe(githubPages());
}));
