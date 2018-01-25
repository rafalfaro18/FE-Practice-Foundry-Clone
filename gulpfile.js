const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

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

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);
gulp.task('pug', compilepug);
gulp.task('watch:sass', watchsass);
gulp.task('watch:pug', watchpug);
gulp.task('watch', ['watch:pug', 'watch:sass']);
gulp.task('default', ['sass', 'pug']);
