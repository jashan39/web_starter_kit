console.log('BCGSC - Brandon\'s AngularJS Starter-Kit Build Script');
console.log('Node version: ' + process.version);

var files = {
  js: {

    libs: [
      './node_modules/angular/angular.js',
      './node_modules/angular-resource/angular-resource.js',
      './node_modules/angular-material/angular-material.min.js',
      './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-aria/angular-aria.min.js',
      './node_modules/moment/min/moment.min.js',
      './node_modules/angular-moment/angular-moment.min.js',
      './node_modules/ngstorage/ngStorage.min.js',
      './node_modules/lodash/lodash.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/tether/dist/js/tether.min.js',
      './node_modules/angular-material/angular-material.min.js',

    ],

    app: [
      './src/libs/*.js',
      './src/app.js',
      './src/config/*.js',
      './src/services/*.js',
      './src/api/*.js',
      './src/filters/*.js',
      './src/directives/**/*.js',
      './src/components/**/*.js'
    ]
  },

  html: {
    index: ['./src/index.html'],
    templates: ['./src/components/**/*.html', './src/directives/**/*.html']
  },

  images: {
    app: [
      './src/statics/**/*.png',
      './src/statics/**/*.jpg',
      './src/statics/**/*.jpg',
      './src/statics/**/*.gif',
      './src/statics/**/*.svg'
    ],

    components: [
      './src/components/**/*.png',
      './src/statics/*.png'
    ]
  },

  scss: {
    libs: ['./src/styles/libs.scss', './node_modules/angular-material/angular-material.min.css'],
    app: ['./src/styles/style.scss', './src/directives/**/*.scss', './src/components/**/*.scss'],
  },

  //Output
  public: [
    'build/**/*.html',
    'build/assets/**.js',
    'build/assets/*.css',
    'build/assets/**/*.css',
    'build/assets/templates.js'
  ]
};

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  modRewrite = require('connect-modrewrite'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  gutil = require('gulp-util'),
  template = require('gulp-angular-templatecache'),
  livereload = require('gulp-livereload'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  runSequence = require('run-sequence'),
  babel = require('gulp-babel');

gulp.task('clean', function () {
  return del([
    'www'
  ]);
});
gulp.task('html-index', function () {
  return gulp.src(files.html.index)
    .pipe(gulp.dest('./build'))
    .pipe(livereload());
});

gulp.task('html-templates', function () {
  return gulp.src(files.html.templates)
    .pipe(template('templates.js', {standalone: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(livereload());
});

gulp.task('favicon', function () {
  return gulp.src('./src/statics/favicon.ico')
    .pipe(gulp.dest('./build/'));
});

gulp.task('images-components', function () {
  return gulp.src(files.images.components)
  //.pipe( image())
    .pipe(gulp.dest('./build/assets/images'));
});


gulp.task('images-app', function () {
  return gulp.src(files.images.app)
  //.pipe(image())
    .pipe(gulp.dest('./build/assets/images'));
});

gulp.task('sass-libs', function () {
  return gulp.src(files.scss.libs)
    .pipe(sass({
      sourceMap: false
    })).on('error', gutil.log)
    .pipe(autoprefixer())
    .pipe(concat('libs.css'))
    //.pipe(cleanCSS())
    .pipe(gulp.dest('./build/assets/libs'));
});

gulp.task('sass-app', function () {
  return gulp.src(files.scss.app)
    .pipe(sass({
      sourceMap: false
    })).on('error', gutil.log)
    .pipe(autoprefixer())
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./build/assets/styles'))
    .pipe(livereload());
});

gulp.task('js', function () {
  return gulp.src(files.js.app)
    .pipe(babel())
    .pipe(concat('app.js'))
    //.pipe(uglify()))
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(livereload());
});

gulp.task('libs', function () {
  return gulp.src(files.js.libs)
    .pipe(concat('lib.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./build/assets/libs'));
});

gulp.task('watch', function () {
  gulp.watch(files.html.index, ['html-index']);
  gulp.watch(files.html.templates, ['html']);
  gulp.watch(files.scss.app, ['sass-app']);
  gulp.watch(files.js.app, ['js']);
  livereload.listen();
});

gulp.task('connect', function () {
  return connect.server({
    middleware: function () {
      var middlewares = [modRewrite(['^[^.]*$ /index.html'])];
      return middlewares;
    },
    livereload: true,
    root: ['build'],
    host: '0.0.0.0',
    port: process.env.PORT || 3030
  });
});

gulp.task('html', ['html-templates', 'html-index']);
gulp.task('images', ['images-components', 'images-app']);
gulp.task('sass', ['sass-libs', 'sass-app']);
gulp.task('build', ['favicon', 'html', 'images', 'libs', 'js', 'sass', 'images']);

gulp.task('default', function () {
  runSequence(
    'clean',
    'build',
    ['watch', 'connect']
  );
});
