
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('default', ['inject', 'sass'], function () {
  startBrowserSync('serve');
});

gulp.task('inject', function () {
  log('Injecting custom scripts to index.html');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.js), { relative: true }))
    .pipe(gulp.dest(config.client));
});


//BrowserSync
function startBrowserSync(opt) {
  if (args.nosync || browserSync.active) {
    return;
  }
  var options = {
    port: 3000,
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0, //1000,
    online: false
  };
  switch (opt) {
    case 'dist':
      log('Serving dist app');
      serveDistApp();
      break;
    default:
      log('Serving app');
      serveApp();
      break;
  }
  function serveApp() {
    gulp.watch([config.sass], ['sass']);

    options.server = {
      baseDir: [
        config.client,
        config.tmp
      ]
    };
    options.files = [
      config.client + '/**/*.*',
      '!' + config.sass,
      config.tmp + '/**/*.css'
    ];

    browserSync(options);
  }

  function serveDistApp() {
    options.server = {
      baseDir: [
        config.dist
      ]
    };
    options.files = [];

    browserSync(options);
  }

}
