const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const sassfiles = 'src/scss/**/*.scss';
const pugfiles = 'src/templates/*.pug';

function compilesass() {
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
  return gulp.src(pugfiles)
    .pipe(pug())
    .pipe(gulp.dest('dist'));
}

function syncbrowser() {
  compilepug();
  compilesass();
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  watchsass();
  watchpug();
  gulp.watch('dist/**/**').on('change', browserSync.reload);
}

function cleandist() {
  return gulp.src('dist', { read: false })
    .pipe(clean());
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);
gulp.task('pug', compilepug);
gulp.task('watch:sass', watchsass);
gulp.task('watch:pug', watchpug);
gulp.task('watch', ['watch:pug', 'watch:sass']);
gulp.task('serve', syncbrowser);
gulp.task('default', ['serve']);
gulp.task('clean', cleandist);
gulp.task('build', ['sass', 'pug']);
