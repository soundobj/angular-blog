var gulp = require('gulp'),
    bower = require('main-bower-files'),
    bowerNormalize = require('gulp-bower-normalize'),
    tsc = require('gulp-typescript');
    concat = require('gulp-concat');
    karma = require("karma").server;

gulp.task('bower', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalize({flatten: true}))
        .pipe(gulp.dest('./public/vendor/'));
});

gulp.task('server', function() {
    var tsResult = gulp.src('serverSrc/*.ts')
        .pipe(tsc({definitionFiles: false, module: 'commonjs', target: 'ES6'}));
    return tsResult.js.pipe(gulp.dest('.'));
});

var tsApp = tsc.createProject({
   target: 'ES5',
    definitionFiles: false,
    noExternalResolve: true,
    sortOutput: true
});

var paths = {
    ts : ['typings/**/*.d.ts','app/project.ts','app/app.ts','app/**/*.ts']
}

gulp.task("app-ts", function() {
    return gulp.src(paths.ts)
        .pipe(tsc(tsApp))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('app-html', function() {
   return gulp.src(['app/**/*.html'])
       .pipe(gulp.dest('public'));
});

gulp.task('app',['app-ts', 'app-html']);

gulp.task("karma", function(done) {
    karma.start({
        configFile: __dirname + "/karma.conf.js",
        reporters: ['dots'],
        singleRun: true
    }, done)
});

gulp.task('watch', ['app'], function(){
    gulp.watch(paths.ts, ['app-ts']);
    gulp.watch(['app/**/*.html'], ['app-html']);
    gulp.watch(['public/**/*.js','test/**/*Spec.js'],['karma']);
});