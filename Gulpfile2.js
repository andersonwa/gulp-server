var gulp = require("gulp");
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var webpack = require("webpack");
var webpackStream = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');

gulp.task('compile-js', function() {
    return gulp.src('src/index.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('public/js/'));
});

gulp.task("webpack-dev-server", function(callback) {
    new WebpackDevServer(
      webpack(webpackConfig),
      webpackConfig.devServer)
    .listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("server running");
        callback();
    });
});

gulp.task('compile-sass', function() {
    gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['compile-js']);
    gulp.watch('src/styles/**/*.scss',['compile-sass']);
});

gulp.task('default', ['webpack-dev-server', 'watch']);
