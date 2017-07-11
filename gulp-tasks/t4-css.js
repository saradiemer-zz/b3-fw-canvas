var gulp = require('gulp');
var replace = require('gulp-replace');

var config = {
	publicDir: './public',
	T4Dir: './T4',
};

gulp.task('t4_css', function() {
	//get styles.css in publicDir
	gulp.src(config.publicDir + '/css-min/styles.css')
	//social-icons
	.pipe(replace('("http://www.luc.edu/media/home/images/social-icons-logos-33-070714.png")', '("<t4 type="media" id="233455" formatter="path/*"/>")'))
	//background image
	.pipe(replace('(../images/bg-water.jpg)', '("<t4 type="media" id="372435" formatter="path/*"/>")'))
	//semi-transparent-pixel
	.pipe(replace('("<t4 type="media" id="406288" formatter="path/*"/>")', '("<t4 type="media" id="406288" formatter="path/*"/>")'))
	//texture-transparent-pixel
	.pipe(replace('(../images/texture-transparent.png)', '("<t4 type="media" id="466248" formatter="path/*"/>")'))
	//social ICONS
	.pipe(replace('(../images/ug-social-icons-patina@2X.png)', '("<t4 type="media" id="466249" formatter="path/*"/>")'))
	//ANTENNA FONTS
	//antenna regular
	.pipe(replace('(../fonts/antenna_regular/476def8b-6379-4133-9503-ca290c126397-4.svg)', '("<t4 type="media" id="309115" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_regular/476def8b-6379-4133-9503-ca290c126397-2.eot)', '("<t4 type="media" id="309117" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_regular/476def8b-6379-4133-9503-ca290c126397-3.woff)', '("<t4 type="media" id="309116" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_regular/476def8b-6379-4133-9503-ca290c126397-1.ttf)', '("<t4 type="media" id="309118" formatter="path/*"/>")'))
	//antenna bold
	.pipe(replace('(../fonts/antenna_bold/692e9d98-a1c5-4d26-9831-b7f258241cdf-4.svg)', '("<t4 type="media" id="375084" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_bold/692e9d98-a1c5-4d26-9831-b7f258241cdf-2.eot)', '("<t4 type="media" id="375082" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_bold/692e9d98-a1c5-4d26-9831-b7f258241cdf-3.woff)', '("<t4 type="media" id="375083" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_bold/692e9d98-a1c5-4d26-9831-b7f258241cdf-1.ttf)', '("<t4 type="media" id="375081" formatter="path/*"/>")'))
	//antenna black
	.pipe(replace('(../fonts/antenna_black/6620971b-19a1-4157-9796-83671a1c7836-4.svg)', '("<t4 type="media" id="309109" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_black/6620971b-19a1-4157-9796-83671a1c7836-2.eot)', '("<t4 type="media" id="309111" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_black/6620971b-19a1-4157-9796-83671a1c7836-3.woff)', '("<t4 type="media" id="309110" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_black/6620971b-19a1-4157-9796-83671a1c7836-1.ttf)', '("<t4 type="media" id="309112" formatter="path/*"/>")'))
	//antenna light
	.pipe(replace('(../fonts/antenna_light/749b4993-dc71-4e94-aab9-74b89be2ca19-4.svg)', '("<t4 type="media" id="375116" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_light/749b4993-dc71-4e94-aab9-74b89be2ca19-2.eot)', '("<t4 type="media" id="375114" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_light/749b4993-dc71-4e94-aab9-74b89be2ca19-3.woff)', '("<t4 type="media" id="375115" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_light/749b4993-dc71-4e94-aab9-74b89be2ca19-1.ttf)', '("<t4 type="media" id="375113" formatter="path/*"/>")'))
	//antenna thin
	.pipe(replace('(../fonts/antenna_thin/eeb94438-f886-4973-b3fe-70d47d3d56e5-4.svg)', '("<t4 type="media" id="375089" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_thin/eeb94438-f886-4973-b3fe-70d47d3d56e5-2.eot)', '("<t4 type="media" id="375087" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_thin/eeb94438-f886-4973-b3fe-70d47d3d56e5-3.woff)', '("<t4 type="media" id="375088" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_thin/eeb94438-f886-4973-b3fe-70d47d3d56e5-1.ttf)', '("<t4 type="media" id="375086" formatter="path/*"/>")'))
	//antenna comp
	.pipe(replace('(../fonts/antenna_comp_bold/ef5900d9-cbb9-4435-a9e8-bb47afc557c3-4.svg)', '("<t4 type="media" id="435721" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_comp_bold/ef5900d9-cbb9-4435-a9e8-bb47afc557c3-2.eot)', '("<t4 type="media" id="435719" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_comp_bold/ef5900d9-cbb9-4435-a9e8-bb47afc557c3-3.woff)', '("<t4 type="media" id="435720" formatter="path/*"/>")'))
	.pipe(replace('(../fonts/antenna_comp_bold/ef5900d9-cbb9-4435-a9e8-bb47afc557c3-1.ttf)', '("<t4 type="media" id="435718" formatter="path/*"/>")'))
	//send to /css/styles.css in T4Dir
	.pipe(gulp.dest(config.T4Dir + '/css'));
});
