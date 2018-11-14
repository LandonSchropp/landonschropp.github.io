import connect from 'gulp-connect';
import data from 'gulp-data';
import frontMatter from 'gulp-front-matter';
import gulp from 'gulp';
import insert from 'gulp-insert';
import markdown from 'gulp-markdown';
import merge from 'merge2';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sitemap from 'gulp-sitemap';

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
