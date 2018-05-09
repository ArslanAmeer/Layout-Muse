
//  STEP - 1 
//  Initializing And Acquiring all Required packages

const gulp = require("gulp");
const less = require("gulp-less");
const autoPrefixLess = require("less-plugin-autoprefix");
const lessGlob = require("less-plugin-glob");
const cssMin = require("gulp-clean-css");
const jsMin = require("gulp-uglify-es").default;
const htmlMin = require("gulp-htmlmin");
const sourceMap = require("gulp-sourcemaps");
const imageMin = require("gulp-imagemin");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const ghpages = require("gulp-gh-pages");

var lessPrefix = new autoPrefixLess({ browsers: ["last 2 versions"]});

//  STEP - 2
//  Creating Individual Tasks

    //HTML minify Task

    gulp.task("Html-Minify",function(){
        gulp.src("src/*.html")
            .pipe(htmlMin({collapseWhitespace: true}))
            .pipe(gulp.dest("dist/"))
            .pipe(browserSync.stream());
    });

    // JavaScript Minify task

    gulp.task("Js-Minify", function(){
        gulp.src("src/assets/js/*.js")
            .pipe(rename("scripts.min.js"))
            .pipe(sourceMap.init())
            .pipe(jsMin())
            .pipe(sourceMap.write("/maps"))
            .pipe(gulp.dest("dist/assets/js/"))
            .pipe(browserSync.stream());
    });

    // Image Minify Task

    gulp.task("Image-Minify", function(){
        gulp.src("src/assets/images/*")
            .pipe(imageMin())
            .pipe(gulp.dest("dist/assets/images/"))
    });

    // Less Compiler LESS->CSS and CSS minify task
    
    gulp.task("less", function () {
        gulp.src("src/assets/less/**.*less")
            .pipe(rename("styles.min.css"))
            .pipe(sourceMap.init())
            .pipe(less({
                plugins: [lessPrefix, lessGlob]
            }))
            .pipe(cssMin())
            .pipe(sourceMap.write("/maps"))
            .pipe(gulp.dest("dist/assets/css/"))
            .pipe(browserSync.stream());
    });

    // Deploy on Github-Pages Task

    gulp.task("deploy", function(){
        return gulp.src("./dist/**/*")
                    .pipe(ghpages({
                        message: "Update by Gulp-Task"
                    }));
    });

//  STEP - 3
//  Watch and Serve Task

    gulp.task("serve",function(){
        browserSync.init({
            server: "dist",
            port: 2712,
            host: "192.168.10.66",
            browser: "Firefox"
        });
        gulp.watch("src/assets/less/**/*.less", ["less"]);
        gulp.watch("src/*.html",["Html-Minify"]);
        gulp.watch("src/assets/js/*.js",["Js-Minify"]);
        gulp.watch("src/assets/images/*",["Image-Minify"]);
        gulp.watch("dist/assets/*.html").on("change", browserSync.reload);
    });

// STEP - 4
// Gulp Default Task 

    gulp.task("default",["Image-Minify", "Html-Minify", "Js-Minify", "less", "serve"]);
