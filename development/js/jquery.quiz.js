// Built by kilian_sweeney@yahoo.com 07/15/2014.
// To debug the html in order to see if any questions are assigned
// to colleges that don't exist or to see if any of the colleges listed
// are not represented in the questions add the following query string to the url
// "?debug=true"

window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
  }(document, "script", "twitter-wjs"));

function trackTwitter(intent_event) {
  if (intent_event) {
    var opt_pagePath;
    if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
          opt_target = extractParamFromUri(intent_event.target.src, 'url');
    }
    _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
  }
}

//Wrap event bindings - Wait for async js to load
//twttr.ready(function (twttr) {
//  twttr.events.bind('tweet', trackTwitter);
//});

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};
$(function(){

    //Gear animation start
	var gears = [$('#gears-left'),$('#gears-right')],
		gearsCount = gears.length,
		gearFrameSizes = [275,300],
        gearImageWidths = [3300,3600],
        gearFrames = [[],[]],
		frameInterval = 50,
		gearsInMotion = false,
		rotateGearsForward = true,
		gearFrame = [0,0],
		gearPosition = 0,
		gearNextPosition = 0,
		randomBoolean = function(){
			var randomB = Math.random() >= 0.5;
			return randomB;
		},
		setFrames = function(index){
            var i = gearFrameSizes[index];
			gearFrames[index].push('0px');
            while(i + gearFrameSizes[index] <= gearImageWidths[index]){
                gearFrames[index].push((i*-1) + 'px');
                i += gearFrameSizes[index];
            }
            if(index===0)setFrames(1);
        },
		randomIntFromInterval = function()
		{
			var max = 11, min = 0,tmpPosition = Math.floor(Math.random()*(max-min+1)+min);
			if(rotateGearsForward){
				if(tmpPosition <= gearPosition)tmpPosition = gearFrames[0].length;
			}
			else {
				if(tmpPosition >= gearPosition)tmpPosition = 0;
			}
			return tmpPosition;
		},
		rotateGears = function(index){
			var numberOfFrames = gearFrames[0].length;
			if(typeof index == 'undefined'){
				index = rotateGearsForward ? gearPosition + 1 : gearPosition - 1;
				if(index < 0){
					rotateGearsFoward = true;
					index = 1;
				}

				if(index == numberOfFrames){
					rotateGearsForward = false;
					index = numberOfFrames - 2;
				}
				if(rotateGearsForward){
					if(index == gearNextPosition - 1){
						gearNextPosition = randomIntFromInterval();
						rotateGears();
						return;
					}
				}
				else {
					if(index == gearNextPosition + 1){
						if(gearNextPosition === 0)rotateGearsForward = true;
						else gearNextPosition = randomIntFromInterval();
						rotateGears();
						return;
					}
				}
				//console.log('gearPosition,index,gearNextPosition,rotateGearsForward',gearPosition,index,gearNextPosition,rotateGearsForward);
			}
			for(var i = 0; i < gearsCount; i++){
				gears[i].css('background-position',gearFrames[i][index] + ' 0px');
			}
			if(rotateGearsForward){
				index++;
				if(index == numberOfFrames || index == gearNextPosition){
					rotateGearsForward = index == numberOfFrames ? false : randomBoolean();
					gearsInMotion = false;
					gearPosition = index == numberOfFrames ? index -1 : index;
					return;
				}
			}
			else {
				index--;
				if(index < 0 || index == gearNextPosition){
					rotateGearsForward = index < 0 ? true : randomBoolean();
					gearsInMotion = false;
					gearPosition = index < 0 ? 0 : index;
					return;
				}
			}
			setTimeout(function(){rotateGears(index);},frameInterval);
		};
		setFrames(0);
	//Gear animation end

    var questions = $('.question'),qCount = questions.length,
        _global_posIndex = 0,
        _global_interval = 500,
        _global_pause = false,
        reset = function(){
            _global_posIndex = 0;
            _global_pause = false;
            _global_scores = [];
            $('ul.colleges li').prop('class','selected-0');
            randomizeColleges();
            setPos();
            $('#social-share-modal').hide();
            $('#quiz-results').hide();
            $('#major-image').hide();
        },
        getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return unescape(r[2]); return '';
        },
        debug = function (){
            var debug = getQueryString('debug'),
                testQuestions = function(){
                    var associatedColleges,cCount,cId,cName, aCStr,tmpStr;
                    questions.each(function(){
                        aCStr = $(this).data('associatedColleges');
                        associatedColleges = typeof aCStr == 'undefined' ? '' : aCStr.split(',');
                        cCount = associatedColleges.length;
                        tmpStr = $(this).html();
                        if(cCount === 0)console.log('debug Questions: ','The question "' + tmpStr + '" has no associated colleges.');
                        if(cCount == 1 && associatedColleges[0].length === 0){
                            console.log('debug Questions: ','The question "' + tmpStr + '" has no associated colleges.');
                            return;
                        }
                        for(var college in associatedColleges){
                            cName = associatedColleges[college];
                            cId = getCollegeId(cName);
                            if(!$('#' + cId).length)console.log('debug Questions: ','The question "' + tmpStr + '" has an associated college (' + cName + ') that does not appear in the list of colleges.');
                        }
                    });
                    cCount = associatedColleges.length;
                },
                testColleges = function(){
                    var colleges = $('ul.colleges').children('li');
                    colleges.each(function(){
                        var college =$('a',this).html(), tmpStr = ',' + college + ',',usage = 0;
                        questions.each(function(){
                           var associatedColleges = $(this).data('associatedColleges');
                           if(typeof associatedColleges == 'undefined')return;
                           associatedColleges = ',' + associatedColleges + ',';
                           if(associatedColleges.indexOf(tmpStr) > -1)usage++;
                        });
                        if(usage === 0)console.log('debug Colleges: ','The college "' + college + '" is not associated with any questions.');
                    });
                };
            if(debug == 'true'){
                testQuestions();
                testColleges();
                return true;
            }
            return false;
        },
        setPos = function(){
			if(gearsInMotion){
				setTimeout(function(){setPos();},50);
				return;
			}
            setTimeout(function(){
                $('.question.active').removeClass('active');
                $(questions).eq(_global_posIndex).addClass('active');
                _global_posIndex++;
                var posBox = $('#position');
                posBox.html(_global_posIndex + '<span>/</span>' + qCount );
                $('input[type="radio"]').prop('checked',false);
                _global_pause = false;
            },_global_interval);
        },
        getCollegeId = function(cName){
            return cName.toLowerCase().replace(/\s+/g, '-');
        },
        updateClass = function(collegeId){
            var college = $('#' + collegeId);
            if(!college.length){
                return;
            }
            var cClass = college.prop('class'),selNum = cClass.indexOf('selected-') == -1 ? 0 : cClass.substring(9) * 1;
            college.prop('class','');
            college.addClass('selected-' + (selNum + 1));
        },
        setColleges = function(){
          var colleges = $('.colleges li'),
              cCount = colleges.length,

              collegeId ='',college,aTmp;
              console.log(cCount);
            for(var i = 0; i < cCount; i++){
                college = colleges.eq(i);
                aTmp = $(college).children('a');
                aTmp.removeAttr('class');
                aTmp.prop('class','selected-0');
                collegeId = getCollegeId(aTmp.html());
                $(college).prop('id',collegeId);
            }
        },
        setControls = function(){
            var progress = function(isYes){
                if(_global_pause)return;
                _global_pause = true;
                if(_global_posIndex > qCount)return;
                var updateColleges = function(){
                  var updateList = typeof $('.question.active').eq(0).data('associatedColleges') != 'undefined' ? $('.question.active').eq(0).data('associatedColleges').split(',') : [],
                      listCount = updateList.length,collegeId='';
                    for(var i = 0; i < listCount; i++){
                        collegeId = getCollegeId(updateList[i]);
                        updateClass(collegeId);
                        keepScore(updateList[i]);
                    }
                };
                if(isYes)updateColleges();
//                if(_global_posIndex == 3)setResultsAndShare();
                if(_global_posIndex == qCount - 1)setResultsAndShare();
                if(_global_posIndex ==qCount)return;
                setPos();
            };
            $('#yes').click(function(){
                if(_global_pause){
                    if(!$(this).hasClass('active-input'))$(this).prop('checked',false);
                    return false;
                }
				gearNextPosition = randomIntFromInterval();
				gearsInMotion = true;
				rotateGears();
                progress(true);
                $('.active-input').removeClass('active-input');
                $(this).addClass('active-input');
            });
            $('#no').click(function(){
                if(_global_pause){
                    if(!$(this).hasClass('active-input'))$(this).prop('checked',false);
                    return false;
                }
				gearNextPosition = randomIntFromInterval();
				gearsInMotion = true;
				rotateGears();
                progress(false);
                $('.active-input').removeClass('active-input');
                $(this).addClass('active-input');
            });
            $('#reset').click(function(){
                reset();
                return false;
            });
            setPos();
        },
        randomizeColleges = function(){
            var colleges = $('.colleges');
            colleges.fadeOut(50);
            setTimeout(function(){colleges.randomize('li');},50);
            colleges.fadeIn(50);
        },
        _global_scores = [],
        keepScore = function(collegeName){
            if(typeof _global_scores[collegeName] == 'undefined')_global_scores[collegeName] = {name:collegeName,quizScore:1};
            else _global_scores[collegeName].quizScore ++;
        },
        setResultsAndShare = function(){
            var tmpScore = 0,tmpName = '',
                topScore,
                getTiedList = function(name,score){
                    var tiedList = [];
                    for(var index in _global_scores){
                        if(typeof _global_scores[index].quizScore != 'undefined'){
                            if(_global_scores[index].quizScore == score && _global_scores[index].name != name)tiedList.push(_global_scores[index].name);
                        }
                    }
                    return tiedList;
                },
                buildSocialLinks = function(){
                    var urlStr = 'https://twitter.com/intent/tweet?',
                        amperStr = '&',
                        messageStr = 'text=' + encodeURI("Loyola University Chicago's, Choose your Major Quiz pointed me to " + topScore.name + ". What should your major be?"),
                        redirectStr = 'url=http://www.luc.edu/undergrad/academiclife/whatsmymajorquiz/index.html',
                        hrefStr = urlStr + redirectStr + amperStr + messageStr,
                        aTwitter = $('a#twitter');
                    aTwitter.attr('href',hrefStr);
                    aTwitter.click(function(e){
                        _gaq.push(['_trackEvent', 'Whats My Major', 'Shared on Twitter']);
                    });
                    $('a#facebook').click(function(e){
                        e.preventDefault();
                        _gaq.push(['_trackEvent', 'Whats My Major', 'Shared on Facebook']);
                        FB.ui({
                            method: 'feed',
                            link: 'http://www.luc.edu/undergrad/academiclife/whatsmymajorquiz/index.html',
                            picture: 'http://www.luc.edu/undergrad/media/prospectivestudents/mrose/major-quiz-images/luc-shield.png',
                            caption: '"What\'s My Major" Quiz',
                            description: "Loyola University Chicago's, Choose your Major Quiz pointed me to " +
                                topScore.name +
                                ". What should your major be?"
                            }, function(response){
                                if (response && response.post_id) {
                                 // _gaq.push(['_trackSocial', 'facebook', 'share']);
                                }
                            }
                        );
                    });
                },
                buildCollegeInfoAndImage = function(){
                    var newImage = new Image(),
                        majorImage = $('#major-image'),
                        quizResults = $('#quiz-results'),
                        quizResultsStr = '',
                        tmpItem,
                        tiedListCount = topScore.tiedList.length;
                    newImage.src = topScore.getCollegeImage();

                    if(typeof newImage.src == 'undefined')return;
                    newImage.onload = function(){
                        majorImage.attr('src',newImage.src).fadeIn(200);
                        quizResults.show();
                        $('#social-share-modal').fadeIn(200);
                    };
                    quizResultsStr = '<p><a href="' +
                        topScore.getCollegeLink() +
                        '" target="_blank">' + topScore.name + '</a>' +
                        '<br>Your unique talents are a great fit for '+ topScore.getCollegeInfo()+' ' +
                        '</p>';
                    if(tiedListCount > 0){
                        quizResultsStr += '<h4>Other Possibilties</h4><ul>';
                        for(var i = 0; i < tiedListCount; i++){
                            tmpItem = topScore.getTiedListItemInfo(i);
                            quizResultsStr += '<li><a href="' + tmpItem.href + '" target="_blank">' + tmpItem.name + '</a></li>';
                        }
                        quizResultsStr += '</ul>';
                    }

                    quizResults.html(quizResultsStr);
                };

            for(var index in _global_scores){
                if(typeof _global_scores[index].quizScore != 'undefined'){
                    if(_global_scores[index].quizScore > tmpScore){
                        if($('#' + getCollegeId(_global_scores[index].name)).length){
                            tmpScore = _global_scores[index].quizScore;
                            tmpName = _global_scores[index].name;
                        }
                    }
                }
            }

            if(tmpName.length === 0){
                $('#social-share-modal').fadeIn(200);
                return;
            }

            topScore = {
                name: tmpName,
                score:tmpScore,
                id:getCollegeId(tmpName),
                getCollegeImage: function(){
                    return $('#' + this.id + ' a').data('collegeImage');
                },
                getCollegeInfo: function(){
                    return $('#' + this.id + ' a').data('collegeInfo');
                },
                getCollegeLink: function(){
                    return $('#' + this.id + ' a').attr('href');
                },
                tiedList:getTiedList(tmpName,tmpScore),
                getTiedListItemInfo: function(index){
                    var collegeId = getCollegeId(this.tiedList[index]),
                        infoArr = {name: this.tiedList[index], href: $('#' + collegeId + ' a').attr('href')};
                    return infoArr;
                }
            };
            buildCollegeInfoAndImage();
            buildSocialLinks();

        };
    setColleges();
    randomizeColleges();
    setControls();
    debug();

});
