const gulp = require('gulp');
const sass = require('gulp-sass');

function defaultTask() {
  console.log('Hello World');
}

function compilesass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', compilesass);

gulp.task('default', defaultTask);
