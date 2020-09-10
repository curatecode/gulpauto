var gulp         = require('gulp'),
    newer        = require('gulp-newer'),
    imagemin     = require('gulp-imagemin'),
    concat       = require('gulp-concat'),
    deporder     = require('gulp-deporder'),
    stripdebug   = require('gulp-strip-debug'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    assets       = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    cssnano      = require('cssnano'),
    rename       = require('gulp-rename'),
    pug          = require('gulp-pug'),
    htmlclean    = require('gulp-htmlclean'),
    del          = require('del'),
    browserSync  = require('browser-sync').create();

// Define folder
var folder = {
  src: 'source/',
  build: 'build/'
}

function images() {
  var out = folder.build + 'assets/images/';
  return gulp
  .src(folder.src + 'assets/images/**/*')
  .pipe(newer(out))
  .pipe(imagemin({ optimizationLevel: 5 }))
  .pipe(gulp.dest(out));
}

// JS Processing
function js() {
  var jsbuild = gulp.src(folder.src + 'assets/js/**/*')
  .pipe(deporder())
  .pipe(concat('main.min.js'))
  .pipe(stripdebug())
  .pipe(uglify());
  return jsbuild.pipe(gulp.dest(folder.build + 'assets/js/'));
}

// Importing JQuery Popper and Bootstrap JS files
function importjs() {
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.js', 
    './node_modules/bootstrap/dist/js/bootstrap.js',
  ])
  .pipe(rename(function(path) {
    path.basename = path.basename + '.min';
    path.extname = '.js';
  }))
  .pipe(stripdebug())
  .pipe(uglify())
  .pipe(gulp.dest(folder.build + 'assets/js/'));
}

// CSS Processing 
function css() {
  var postCssOpts = [
    assets({ loadPaths: ['assets/images/'] }),
    mqpacker, cssnano
  ];
  return gulp.src(folder.src + 'assets/scss/main.scss')
  .pipe(sass({
    imagePaths: 'assets/images/',
    precision: 3,
    errLogToConsole: true,
  }))
  .pipe(postcss(postCssOpts))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest(folder.build + 'assets/css/'))
  // .pipe(browserSync.stream());
}

// Importing Bootstrap SCSS
function bootstrap() {
  return gulp.src('./node_modules/bootstrap/scss/bootstrap.scss')
  .pipe(sass({
    outputStyle: 'compressed',
  }))
  .pipe(rename('bootstrap.min.css'))
  .pipe(gulp.dest(folder.build + 'assets/css/'))
  .pipe(browserSync.stream());
}

// Watch for changes
function watch() {
  browserSync.init({
    server: './build',
    open: false,
  });
  gulp.watch(folder.src + 'assets/images/**/*', gulp.series(images)).on('change', browserSync.reload);
  gulp.watch(folder.src + 'assets/js/**/*', gulp.series(js)).on('change', browserSync.reload);
  gulp.watch(folder.src + 'assets/scss/**/*', gulp.series(css)).on('change', browserSync.reload);
  gulp.watch(folder.src + 'views/**/*', gulp.series(views)).on('change', browserSync.reload);
}

// Pug Processing
function views() {
  return gulp.src(folder.src + 'views/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  // renaming subfolders
  .pipe(rename(function(path){
    path.dirname  = path.dirname;
    path.basename = 'index';
    path.extname  = '.html';
  }))
  .pipe(htmlclean()) // html minifying
  .pipe(gulp.dest(folder.build));
}

// Cleaning up the final build
// function build() {
//   return del.sync('build')
// }
// gulp.task('clean:build', function() {
//   return del.sync('build')
// })
// gulp.task('build', ['clean:build', 'run']);

// Run all tasks
// gulp.task('run', ['views', 'images', 'css', 'js', 'bootstrap', 'importjs']);

// Default task
// gulp.task('default', ['run', 'watch']);

// gulp.task('default', gulp.series(gulp.parallel(views, images, css, js, bootstrap, importjs), watch));
exports.default = gulp.series(gulp.parallel(views, images, css, js, bootstrap, importjs), watch);