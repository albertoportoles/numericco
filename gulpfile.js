'use strict'

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		cleanCSS = require('gulp-clean-css'),
		CSSmin = require('gulp-cssmin'),
		rename = require("gulp-rename"),
		//imagemin = require('gulp-imagemin'),
		//connect = require('gulp-connect'),
		sass = require('gulp-sass'),
		livereload = require('gulp-livereload'),
		browserSync = require('browser-sync');

var sassFiles = [
			'./css/front/main.scss'
		],
		minSassFiles = [
			'./css/front/main.scss'
		],
		minSASS = './dist/app/webroot/css/',

		adminSassFiles = [
			'./css/admin/admin.scss'
		],
		adminSASS = './dist/app/webroot/css/admin',

		pathDist = './',
		neat = require('node-neat').includePaths;

browserSync.create();


gulp.task('sass', function () {
	gulp
		.src( sassFiles )
		//.pipe( concat( minSASS ) )
		.pipe( sass({
			includePaths: ['styles'].concat(neat)
		}))
		//.pipe( cssmin() )
		.pipe( gulp.dest( minSASS ) )
})


gulp.task('admin', function () {
	gulp
		.src( adminSassFiles )
		//.pipe( concat( minSASS ) )
		.pipe( sass({
			includePaths: ['styles'].concat(neat)
		}))
		.pipe( gulp.dest( adminSASS ) )
})





gulp.task('serve', ['admin','sass'], function() {

	browserSync.init({
		proxy: "numericco.dev:8888"
	});

	gulp.watch("./css/front/**/*.scss", ['sass']);
	gulp.watch("./css/admin/**/*.scss", ['admin']);

	//gulp.watch("./dist/app/**/*.php").on('change', browserSync.reload);
	//gulp.watch("./dist/app/View/**/*.ctp").on('change', browserSync.reload);

});

gulp.task('server', ['serve']);
