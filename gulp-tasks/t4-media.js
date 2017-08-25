var gulp = require('gulp');
var replace = require('gulp-replace');

var config = {
    publicDir: './public',
		T4Dir: './T4',
};

gulp.task('t4_media', function() {
	console.log('[gulp]: T4 Media');
	return gulp.src(config.publicDir + '/T4*.html')
	//change references	in html
	.pipe(replace('/css/styles.css', '<t4 type="media" id="472265" formatter="path/*"/>'))
	.pipe(replace('/js/all.min.js', '<t4 type="media" id="466247" formatter="path/*"/>'))
	.pipe(replace('<script src="/js/all.js"></script>', ''))
  .pipe(replace('/images/homepage/home-campus-aerial-500-500.jpg', '<t4 type="media" id="474881" formatter="path/*"/>'))
	//send to t4Dir
	.pipe(gulp.dest(config.T4Dir));
});
