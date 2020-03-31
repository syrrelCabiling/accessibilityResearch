const gulp = require('gulp');
const sass = require('gulp-sass');

// set up some simple atsks for Gulp to run; watching files with Gulp, etc

function compile(done) {
    gulp.src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("public/css"))

} 

export.compile = compile 