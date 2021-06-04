---
updatedOn: '2020-07-14T14:27:20+01:00'
---

## Gulp

### Wordpress Setup

```js
var { src, dest, series, watch } = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const rename = require('gulp-rename');

let scss = () => {
  return src('./sass/main.scss')
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(dest('./', { overwrite: true }));
};

let editorStyles = () => {
  return src('./sass/editor.scss')
    .pipe(sass())
    .pipe(rename('gutenberg-editor-styles.css'))
    .pipe(dest('./styles', { overwrite: true }));
};

let server = () => {
  return browserSync.init({
    proxy: 'http://localhost:8888',
  });
};

let reload = (done) => {
  browserSync.reload();
  done();
};

watch(['**/*.scss'], series(scss, editorStyles, reload));

watch(['**/*.js', '**/*.php'], reload);

exports.scss = scss;
exports.server = server;
exports.default = series(scss, editorStyles, server);
```
