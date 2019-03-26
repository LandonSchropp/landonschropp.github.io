import _ from 'lodash';
import connect from 'gulp-connect';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import sitemap from 'gulp-sitemap';
import { execSync } from 'child_process';

const WRITING_REGEX = /Writing (.*?) from/;

// Rather than creating separate tasks and duplicating steps, or creating temporary files, this task
// separately creates the notes and regular HTML streams. It then merged the streams together for
// the final processing. This seems to be the recommended appraoch in the Gulp documentation.
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md
gulp.task('html', (callback) => {

  // HACK: This is a hacky way of building the HTML files with Eleventy and integrating them into
  // the rest of the Gulp stream. There's likely a better way to do this, and this will probably
  // break at some point, but for now it's a quick and dirty soultion that works.
  //
  // 1. Run Eleventy in a synchronous process.
  // 2. Parse the output from Eleventy.
  // 3. Build a gulp stream from the files.
  // 4. Run the rest of the gulp functions on the build stream.
  let stdout;

  try {
    // TODO: Make this asynchronous.
    stdout = execSync('yarn run eleventy').toString();
  }
  catch (error) {
    console.error(error.message); // eslint-disable-line no-console
    return callback();
  }

  // Capture any output that's not directly from Eleventy and print it out.
  let output = stdout
    .split('\n')
    .filter(line => !WRITING_REGEX.test(line))
    .filter(line => !/Processed \d+ files in/.test(line))
    .join('\n')
    .trim();

  if (output !== "") {
    console.log(output); // eslint-disable-line no-console
  }

  // Convert the outupt into a stream of files that can be processed by Gulp.
  let files = _.chain(stdout)
    .split('\n')
    .map(line => line.match(/Writing (.*?) from/))
    .map('[1]')
    .reject(_.isNil)
    .value();

  if (_.isEmpty(files)) {
    console.log("No files were generated."); // eslint-disable-line no-console
    return callback();
  }

  return gulp.src("build/**/*.html")
    .pipe(sitemap({ siteUrl: process.env.URL }))
    .pipe(htmlmin())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});
