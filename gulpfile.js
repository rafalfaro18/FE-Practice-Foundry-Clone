const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

const sassfiles = 'src/scss/**/*.scss';
const pugfiles = 'src/templates/*.pug';

function cleandist() {
  return gulp.src('dist', { read: false })
    .pipe(clean());
}

function compilesass() {
  cleandist();
  return gulp.src(sassfiles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

function watchsass() {
  gulp.watch(sassfiles, ['sass']);
}

function watchpug() {
  gulp.watch('src/templates/**/*.pug', ['pug']);
}

function compilepug() {
  cleandist();
  return gulp.src(pugfiles)
    .pipe(pug())
    .pipe(gulp.dest('dist'));
}

function watchimg() {
  gulp.watch('src/img/**/*.*', ['img']);
}

function compileimg() {
  cleandist();
  return gulp.src('src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'));
}

function syncbrowser() {
  compilepug();
  compilesass();
  compileimg();
  browserSync.init({
    server: {
      baseDir: 'dist',
      routes: {
        '/bower_components': 'bower_components',
      },
    },
  });
  watchsass();
  watchpug();
  watchimg();
  gulp.watch('dist/**/**').on('change', browserSync.reload);
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);
gulp.task('pug', compilepug);
gulp.task('img', compileimg);
gulp.task('watch:sass', watchsass);
gulp.task('watch:pug', watchpug);
gulp.task('watch:img', watchimg);
gulp.task('watch', ['watch:pug', 'watch:sass', 'watch:img']);
gulp.task('serve', syncbrowser);
gulp.task('default', ['serve']);
gulp.task('clean', cleandist);
gulp.task('build', ['sass', 'pug', 'img']);
