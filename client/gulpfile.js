const { watch, src, dest } = require('gulp');
const ugly = require('gulp-uglifycss');
const concat = require('gulp-concat');


function minifyCss(done) {
  src('public/styles/*.css')
    .pipe(concat('style.min.css'))
    .pipe(ugly())
    .pipe(dest('src'))

  done()
}

exports.default = function (done) {

  watch('public/styles/*.css', { ignoreInitial: false }, minifyCss)

  done()

}