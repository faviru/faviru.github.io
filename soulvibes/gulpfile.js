"use strict";

var gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync"),
  del = require("del"),
  uglify = require("gulp-uglifyjs"),
  concat = require("gulp-concat"),
  mqpacker = require("css-mqpacker"),
  mincss = require("gulp-csso"),
  rename = require("gulp-rename"),
  babel = require('gulp-babel'),
  imagemin = require("gulp-imagemin");

gulp.task('babel', () =>
  gulp.src('js/script.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ["es2015-without-strict"]
    }))
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'))
);

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html"
  ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({ stream: true }))
    .pipe(mincss())
    // .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("clean", function () {
  return del.sync("dist");
});


gulp.task("build", function (fn) {
  run(
    "clean",
    "babel",
    "copy",
    "style",
    "images",
    fn
  );
});


gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});
