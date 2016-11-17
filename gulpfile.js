(() -> {
  'use strict';

  // Dependencies
  const babel = require('gulp-babel');
  const ghPages = require('gulp-gh-pages');
  const gulp = require('gulp');
  const gulpif = require('gulp-if');
  const mergeStream = require('merge-stream');
  const PolymerProject = require('polymer-build').PolymerProject;
  const uglify = require('gulp-uglify');

  /**
   * The Polymer Project is a programmatic interface to the Polymer-cli objects.
   *
   * This is done because their usual wrapper "polymer serve" and "polymer build" are not properly handling
   * es2015 style javascript. They will eventually process it, but for the moment we use Babel to pre transpile
   * all the code before sending it to the rest of the pathway.
   */
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

  gulp.task('build', () => {
    //noinspection JSCheckFunctionSignatures
    const sourcesStream = project.sources()
        .pipe(project.splitHtml())
        .pipe(gulpif(/\.js$/, babel({presets: ['es2015']})))
        .pipe(project.rejoinHtml());

    mergeStream(sourcesStream, project.dependencies())
        .pipe(project.analyzer)
        .pipe(project.bundler)
        .pipe(gulp.dest('build/bundled'));
  });

  gulp.task('deploy', () => {
    return gulp.src('./build/bundled/**/*')
        .pipe(ghPages());
  });
})();
