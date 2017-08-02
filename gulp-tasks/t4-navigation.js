var gulp = require('gulp');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');

var config = {
	publicDir: './public',
	T4Dir: './T4',
};
gulp.task('t4_nav', function() {
	// place code for your default task here
	console.log('[gulp]: T4 Navigation');
	return gulp.src(config.T4Dir + '/T4*.html')
		.pipe(htmlreplace({
		'customjs': '<t4 type="navigation" id="406"/>',
		'navtitle': '<cfset prefixtitle="<t4 type="navigation" id="630"/>"><cfif prefixtitle neq ""><title><cfoutput>#variables.prefixtitle#</cfoutput></title><cfelse><title>Undergraduate Admission | Loyola University Chicago | <t4 type="navigation" id="77"/></title></cfif>',
		'description': '<meta name="Description" content="<t4 type="navigation" id="167"/>" />',
		'pageid': '<meta name="PageID" content="<t4 type="navigation" id="462"/>" />',
		'ogtitle': '<meta property="og:title" content="<t4 type="navigation" id="166"/> <t4 type="title" />: Loyola University Chicago" />',
		'ogdescription': '<meta property="og:description" content="<t4 type="navigation" id="167"/>" />',
		'ogsitename': '<meta property="og:site_name" content="Loyola University Chicago - <t4 type="navigation" id="77"/>" />',
		'customcss': '<t4 type="navigation" id="223"/>',
		'linkhome': '<t4 type="navigation" id="267"/>',
		'universitymenu': '<t4 type="navigation" id="538"/>',
		'sitemenu': '<t4 type="navigation" id="251"/>',
		'homefooter': '<t4 type="navigation" id="536"/>',
		'globalquicklinks': '<t4 type="media" id="77813" formatter="plain/text"/>',
		'ledephoto': '<t4 type="navigation" id="667"/>',
		'ledecaption': '<t4 type="navigation" id="668"/>',
		'rightcolumn': '<t4 type="navigation" id="669"/>',
		'sidemainnav': '<t4 type="navigation" id="670"/>',
		'headernav': '<t4 type="navigation" id="674"/>',
		'calltoaction': '<t4 type="navigation" id="675"/>',
		'socialmedia': '<t4 type="navigation" id="677"/>',
		'aside': '<t4 type="navigation" id="678"/>',
		'body': '<body class="jd <t4 type="navigation" id="408"/>"> <cfif isdefined("url.debug")> <div style="background-color:#cacaca;padding:5px;width:100%;"><p align="center">You are here: <t4 type="navigation" id="687"/> &nbsp; | &nbsp; <a href="https://cms4.luc.edu/terminalfour/SiteManager?ctfn=content&fnno=30&sid=<t4 type="navigation" id="462"/>" target="_new">CLICK HERE TO EDIT THIS PAGE</a></p></div></cfif>',
		}, {
		keepUnassigned: false,
		keepBlockTags: false,
		resolvePaths: false
}))
	.pipe(gulp.dest(config.T4Dir));
});
