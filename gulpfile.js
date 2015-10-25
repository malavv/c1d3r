(function() {
  'use strict';

  var
    bower = require('gulp-bower'),
    browserSync = require('browser-sync').create(),
    del  = require('del'),
    gulp = require('gulp'),
    size = require('gulp-size'),
    vulcanize = require('gulp-vulcanize'),
    paths = {
      pages: ['elements/**/*.html', 'elements/*.html', 'index.html'],
      images: 'img/**/*',
      data: 'data/**/*',
      allDist: ['dist/index.html', 'dist/img/**/*', 'dist/data/**/*'],
      distImages: 'dist/img/',
      distData: 'dist/data/'
    };

  /**
   * Default gulp action when just doing "$gulp".
   *
   * This should also include lint.
   */
  gulp.task('default', ['serve:dev']);

  /** Allows serving the static pages right from here. */
  gulp.task('serve:dev', [], function () {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(paths.pages).on('change', browserSync.reload);
  });

  /** Updates bower if needed. */
  gulp.task('init', function() {
    return bower({ cmd: 'update'});
  });

  /** Serves the distribution version. */
  gulp.task('serve:dist', ['dist'], function () {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
    gulp.watch(paths.allDist).on('change', browserSync.reload);
  });

  /** Recreates a distribution package. */
  gulp.task('dist', ['copy:img', 'copy:data', 'vulcanize']);

  /** Cleans the distribution folder. */
  gulp.task('clean:dist', function() {
    return del(['dist/']);
  });

  /** Copies the img/ folder as it will stay as is. */
  gulp.task('copy:img', function () {
    return gulp.src(paths.images)
      .pipe(gulp.dest(paths.distImages));
  });
  gulp.task('copy:data', function () {
    return gulp.src(paths.data)
      .pipe(gulp.dest(paths.distData));
  });

  /**
   * Vulcanize this web application.
   *
   * This means that all the pages and code will be merged in one single
   * file.
   */
  gulp.task('vulcanize', function () {
   return gulp.src('index.html')
     .pipe(vulcanize({
       stripComments: true,
       inlineCss: true,
       inlineScripts: true
     }))
     .pipe(size())
     .pipe(gulp.dest('dist/'));
  });
})();