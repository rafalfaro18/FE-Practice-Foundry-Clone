const gulp = require('gulp');
const sass = require('gulp-sass');

const sassfiles = 'src/scss/**/*.scss';

function compilesass() {
  return gulp.src(sassfiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);
gulp.task('watch', gulp.watch(sassfiles).on('change'), sass);
gulp.task('default', sass);
