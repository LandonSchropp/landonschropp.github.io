import connect from 'gulp-connect';
import data from 'gulp-data';
import frontMatter from 'gulp-front-matter';
import gulp from 'gulp';
import header from 'gulp-header';
import footer from 'gulp-footer';
import markdown from 'gulp-markdown';
import merge from 'merge2';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sitemap from 'gulp-sitemap';

import extractData from '../transforms/extract-data';
import directoryIndices from '../transforms/directory-indices';

// Rather than creating separate tasks and duplicating steps, or creating temporary files, this task
// separately creates the notes and regular HTML streams. It then merged the streams together for
// the final processing. This seems to be the recommended appraoch in the Gulp documentation.
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md
gulp.task('html', () => {

  // TODO: Throw an error if the slug is already taken
  let notes = gulp.src('source/html/notes/*', { base: 'source/html/' })
    .pipe(frontMatter({ property: 'data', remove: true }))
    .pipe(data(file => ({
      ...file.data,
      date: new Date(file.path.match(/(\d{4}-\d{2}-\d{2})/)[1])
    })))
    .pipe(rename(path => path.basename = path.basename.replace(/(\d{4}-\d{2}-\d{2})-/, '')))
    .pipe(markdown())
    .pipe(header("{% extends 'layouts/note.njk' %}{% block article %}"))
    .pipe(footer("{% endblock %}"));

  let notesIndex = gulp.src('source/html/notes.njk')
    .pipe(extractData('notes', notes));

  let html = gulp.src('source/html/pages/**');

  return merge(notes, notesIndex, html)
    .pipe(plumber())
    .pipe(nunjucksRender({ path: [ "source/html" ] }))
    .pipe(directoryIndices())
    .pipe(gulp.dest('build'))
    .pipe(sitemap({ siteUrl: process.env.URL }))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});
