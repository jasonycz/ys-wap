
var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });

//
gulp.task('default', ['inject', 'sass'], function () {
  startBrowserSync('serve');
});

gulp.task('clean-tmp', function (done) {
  clean(config.tmp, done);
});

gulp.task('clean', function (done) {
  var delconfig = [].concat(config.dist, config.tmp);
  clean(delconfig, done);
});

gulp.task('copy', function () {
  log('Copying assets');

  return gulp
    .src(config.assets, { base: config.client })
    .pipe(gulp.dest(config.dist + '/'));
});

gulp.task('inject', function () {
  log('Injecting custom scripts to index.html');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.js), { relative: true }))
    .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'sass-min'], function () {
  log('Optimizing the js, css, html');

  // var assets = $.useref({
  //   searchPath: [config.client, config.tmp, config.npm]
  // });

  return gulp
    .src(config.index)
    .pipe($.plumber({ errorHandler: swallowError }))

    //.pipe($.if('*.css',$.concat('styles/main.css')))
    .pipe($.useref({ searchPath: [config.client, config.tmp, config.npm] }))
    .pipe($.if('*.js', $.uglify())
      .pipe(gulp.dest(config.dist)));
});

gulp.task('build', ['optimize', 'copy'], function () {
  //startBrowserSync('dist');
});

gulp.task('sass', function () {
  log('Compiling Sass --> CSS');

  var sassOptions = {
    outputStyle: 'nested' // nested, expanded, compact, compressed
  };

  return gulp
    .src(config.sass)
    .pipe($.plumber({ errorHandler: swallowError }))
    .pipe($.sass(sassOptions))
    .pipe(gulp.dest(config.tmp + '/styles'));
});

gulp.task('sass-min', function () {
  log('Compiling Sass --> minified CSS');

  var sassOptions = {
    outputStyle: 'compressed' // nested, expanded, compact, compressed
  };

  return gulp
    .src(config.sass)
    .pipe($.plumber({ errorHandler: swallowError }))
    .pipe($.sass(sassOptions))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dist + '/styles'));
});

gulp.task('sass-watcher', function () {
  gulp.watch([config.sass], ['sass']);
});

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.green(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.green(msg));
  }
}

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
    //logLevel: 'debug',
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
        config.tmp,
        'node_modules'
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

  function serveDocs() {
    gulp.watch([config.docsJade], ['jade-docs']);

    options.server = {
      baseDir: [
        config.docs
      ]
    }

    options.files = [
      config.docs + '/index.html',
      '!' + config.jade
    ];

    browserSync(options);
  }

}

function swallowError(error) {
  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}


