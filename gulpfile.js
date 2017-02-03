const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const injectVersion = require('gulp-inject-version');

gulp.task('default', () => (
  gulp.src('src/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(injectVersion())
    .pipe(rename("canvas-nest.es5.js"))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({
    	preserveComments: 'license'
    }))    //uglify
    .pipe(rename("canvas-nest.min.js"))
    .pipe(gulp.dest('dist'))
));