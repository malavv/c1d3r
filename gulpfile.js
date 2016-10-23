  "use strict";

  // Got problems? Try logging 'em
  const logging = require('plylog');
  logging.setVerbose();

const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const mergeStream = require('merge-stream');
const PolymerProject = require('polymer-build').PolymerProject;
const ghPages = require('gulp-gh-pages');

const project = new PolymerProject({
  entrypoint: 'index.html',
  shell: 'src/c1d3r-app/c1d3r-app.html',
  sources: [
    "src/**/*",
    "bower.json"
  ],
  includeDependencies: [
    "bower_components/webcomponentsjs/webcomponents-lite.min.js",
    "manifest.json",
    "images/**/*",
    "data/**/*"
  ]
});
gulp.task('default', function() {
  const sourcesStream = project.sources()
      .pipe(project.splitHtml())
      .pipe(gulpif(/\.js$/, babel({presets: ['es2015']})))
      .pipe(project.rejoinHtml());


  mergeStream(sourcesStream, project.dependencies())
      .pipe(project.analyzer)
      .pipe(project.bundler)
      .pipe(gulp.dest('build/bundled'));
});

gulp.task('deploy', function() {
  return gulp.src('./build/bundled/**/*')
      .pipe(ghPages());
});