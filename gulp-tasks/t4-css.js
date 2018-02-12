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
	.pipe(replace('(../images/backgrounds/bg-lsc.jpg)', '("<t4 type="media" id="473135" formatter="path/*"/>")'))
	.pipe(replace('(/images/backgrounds/bg-shield-gold-patina.jpg)', '("<t4 type="media" id="471278" formatter="path/*"/>")'))
	.pipe(replace('(../images/site/li.png)', '("<t4 type="media" id="474922" formatter="path/*"/>")'))
	//texture-transparent-pixel
	.pipe(replace('(../images/texture-transparent.png)', '("<t4 type="media" id="466248" formatter="path/*"/>")'))
	.pipe(replace('(../images/site/texture-transparent.png)', '("<t4 type="media" id="466248" formatter="path/*"/>")'))
	.pipe(replace('(/images/site/texture-transparent.png)', '("<t4 type="media" id="466248" formatter="path/*"/>")'))
	//semi-transparent-pixel
	.pipe(replace('("<t4 type="media" id="406288" formatter="path/*"/>")', '("<t4 type="media" id="406288" formatter="path/*"/>")'))
	//search
	.pipe(replace('../images/homepage/homepage-arrow-left-patina.png', '<t4 type="media" id="473040" formatter="path/*"/>'))
	//home
	.pipe(replace('../images/homepage/home.png', '<t4 type="media" id="473662" formatter="path/*"/>'))
	//homepage mobile image
	.pipe(replace('("/images/homepage/home-campus-aerial-mobile.jpg")', '("<t4 type="media" id="474881" formatter="path/*"/>")'))
	//social ICONS
	.pipe(replace('(../images/site/ug-social-icons.png)', '("<t4 type="media" id="466249" formatter="path/*"/>")'))
	.pipe(replace('(../images/backgrounds/bg-shield-dark.jpg)', '("<t4 type="media" id="471277" formatter="path/*"/>")'))
	.pipe(replace('(images/backgrounds/bg-shield-dark.jpg)', '("<t4 type="media" id="471277" formatter="path/*"/>")'))
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
gulp.task('t4_css_parallax', function() {
	//get styles.css in public parallax Dir

	gulp.src(config.publicDir + '/css-parallax/styles-parallax.css')
	//explore grid background image
	.pipe(replace('("images/homepage/homepage-arrow.png")', '("<t4 type="media" id="468449" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-residential-life-2400-2400.jpg")', '("<t4 type="media" id="470719" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-intro-2400-2400.jpg")', '("<t4 type="media" id="470738" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-why-loyola-2400-2400.jpg")', '("<t4 type="media" id="470709" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-social-justice-2400-2400.jpg")', '("<t4 type="media" id="470720" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-academics-chicago-2400-2400.jpg")', '("<t4 type="media" id="470735" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-study-abroad-gray-2400-deep.jpg")', '("<t4 type="media" id="470708" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-cost-value-2400-2400.jpg")', '("<t4 type="media" id="470736" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-apply-visit-info-2400-2400.jpg")', '("<t4 type="media" id="470718" formatter="path/*"/>")'))
	.pipe(replace('("../images/explore/explore-grid-dark-small.png")', '(<t4 type="media" id="470740" formatter="path/*"/>)'))
	.pipe(replace('("../images/backgrounds/bg-grid-extra-dark-small.png")', '(<t4 type="media" id="470740" formatter="path/*"/>)'))
	.pipe(replace('("../images/backgrounds/bg-grid-light-small.png")', '(<t4 type="media" id="474051" formatter="path/*"/>)'))
	//explore grid background image
	.pipe(replace('("../images/explore-life-service/2000-280-grid-tour-overlay.png")', '("<t4 type="media" id="474520" formatter="path/*"/>")'))
	.pipe(gulp.dest(config.T4Dir + '/css'));
});
