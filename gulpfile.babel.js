import connect from 'gulp-connect';
import data from 'gulp-data';
import del from 'del';
import frontMatter from 'gulp-front-matter';
import githubPages from 'gulp-gh-pages';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import insert from 'gulp-insert';
import markdown from 'gulp-markdown';
import merge from 'merge2';
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

  // * Parse the front matter
  // * Strip the date from the file name and add it to the front matter
  // * Compile the notes to nunjucks
  // * Wrap the nunjucks content in a content block and set the property variable
  // * Combine the nunjucks junk with the HTML stream using merge-stream
  // TODO: Add a warning if the slug is already taken
  let notes = gulp.src('source/html/notes/*', { base: 'source/html/' })
    .pipe(frontMatter({ property: 'data', remove: true }))
    .pipe(data(file => ({
      ...file.data,
      date: new Date(file.path.match(/(\d{4}-\d{2}-\d{2})/)[1])
    })))
    .pipe(rename(path => path.basename = path.basename.replace(/(\d{4}-\d{2}-\d{2})-/, '')))
    .pipe(markdown())
    .pipe(insert.wrap("{% extends 'layouts/note.njk' %}{% block article %}", "{% endblock %}"));

  let html = gulp.src('source/html/pages/**');

  // Rather than creating separate tasks and duplicating steps, or creating temporary files, I've
  // decided to handle notes and HTML files separate and then merge them together for the common
  // logic. This seems to be the recommended appraoch in the Gulp documentation.
  // https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md
  return merge(notes, html)
    .pipe(plumber())
    .pipe(nunjucksRender({ path: [ "source/html" ] }))
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
