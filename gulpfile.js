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

function watchimg() {
  gulp.watch('src/img/**/*.*', ['img']);
}

function compileimg() {
  gulp.src('dist/img', { read: false })
    .pipe(clean());
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
}

function watchfonts() {
  gulp.watch('src/fonts/**/*.*', ['fonts']);
}

function compilefonts() {
  gulp.src('dist/fonts', { read: false })
    .pipe(clean());
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
}

function syncbrowser() {
  compilepug();
  compilesass();
  compileimg();
  compilefonts();
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
  watchfonts();
  gulp.watch('dist/**/**').on('change', browserSync.reload);
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);
gulp.task('pug', compilepug);
gulp.task('img', compileimg);
gulp.task('fonts', compilefonts);
gulp.task('watch:sass', watchsass);
gulp.task('watch:pug', watchpug);
gulp.task('watch:img', watchimg);
gulp.task('watch:fonts', watchfonts);
gulp.task('watch', ['watch:pug', 'watch:sass', 'watch:img', 'watch:fonts']);
gulp.task('serve', syncbrowser);
gulp.task('default', ['serve']);
gulp.task('clean', cleandist);
gulp.task('build', ['sass', 'pug', 'img', 'fonts']);
