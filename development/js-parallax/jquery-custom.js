





/*
 *
 *  Author: Ian Coyle
 *  www.iancoyle.com
 *
 *
 *
 *  You are beautiful
 *
 */




/* ---------------------------------- */

/*
 *  TABLE OF CONTENTS
 *
 *  Initialize
 *  Events
 *  AutoInstantiate
 *  Cover
 *  Articles
 *  Article
 *  Mobile
 *  Modal
 *  Keyboard
 *
 */





/* ---------------------------------- */

/* Initialize */

jQuery(

  function ($) {

    $.Body = $('body');

    $.Window = $(window);

    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;

    $.MobileWebkit = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)))

    $.MobileDevice = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i)));

    $.Tablet = ((navigator.userAgent.match(/iPad/i)));

    $('[data-script]').Instantiate();

    $.Body
    .Keyboard()
    .GoogleAnalytics();

    $('[data-target]').TargetBlank();

    if ($.MobileWebkit)
      $.Body.Mobile();


  }

);

/* ---------------------------------- */

/* Events */

(function($) {

  $.Events = {

     LOAD: 'siteLoad',

     MOBILE_COVER: 'mobileCover',

     RESIZE: 'browserResize',
     ORIENT: 'browserOrientation',
     MOBILE: 'mobileInit',

     ARTICLE_SCROLL: 'articleScroll',
     ARTICLE_ENTER: 'articleEnter',
     ARTICLE_EXIT: 'articleExit',
     ARTICLE_NEXT: 'articleNext',
     ARTICLE_PREV: 'articlePrev',

     MODAL: 'modalEnter',
     ABOUT: 'modalAbout',

     KEY_ESC: 'keyEscape',
     KEY_ENTER: 'keyEnter',
     KEY_SPACE: 'keySpace',
     KEY_UP: 'keyUp',
     KEY_DOWN: 'keyDown',
     KEY_RIGHT: 'keyRight',
     KEY_LEFT: 'keyLeft'

  } // Events


})(jQuery);


/* ---------------------------------- */

/* Auto Instantiate */

(function($) {

  $.fn.Instantiate = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

          var $self = $(this),
              $controller = $self.attr('data-script');

          if ($self[$controller])
            $self[$controller]();

      });

  }



})(jQuery);


/* ---------------------------------- */

/*
 * Edits:
 * Cover
 * Article
 * Articles
 * Video
 *
 */

(function($) {


  $.fn.Cover = function(settings) {

     var config = { threshold: 0, offset_scroll: 0, offset_intertia: 0 };

     if (settings) $.extend(config, settings);

     this.each(function() {


        var $self = $(this)

        if (!$.MobileDevice)
          $self.css({height: $.Window.height()});


     });

    return this;

  } //Cover

  /* ---------------------------------- */

  $.fn.Article = function() {

     var $parent = this,
         HEIGHTS = new Array(),
         runningHeight = 0,
         _issue = $.Body.attr('data-issue'),
         _articleLength = this.length,
         _enumeratedArticles = 0,
         _active = 0,
         _active_figure = 0;

     /* ---------------------------------- */

     $.Body
      .bind($.Events.ARTICLE_NEXT,_next)
      .bind($.Events.ARTICLE_PREV,_prev)
      .bind($.Events.ARTICLE_ENTER,_enter)
      .bind($.Events.KEY_RIGHT,_keynext)
      .bind($.Events.KEY_DOWN,_keynext)
      .bind($.Events.KEY_LEFT,_keyprev)
      .bind($.Events.KEY_UP,_keyprev)

     $.Window
      .bind('resize',_resize);

      window.onorientationchange = _orientation;


     /* ---------------------------------- */

     function _keynext(e) {

             e.preventDefault();

             var $figure_children = _figureChildren();

              if ($figure_children.length>1){

                _active_figure++;

                if (_active_figure<$figure_children.length) {

                    $figure_children.each(function(i){

                    if (i==_active_figure) {

                      $.Scroll.stop().animate({scrollTop: HEIGHTS[_active].min + $(this).height()*i},600,'easeOutQuart')


                    }


                    })

                }else{

                  _active_figure = 0;

                  _next(e);

                }

              }else{

                _active_figure = 0;

                _next(e);

              }

     }

     function _keyprev(e) {

        e.preventDefault();

          var $figure_children = _figureChildren();

              if ($figure_children.length>1){

                _active_figure--;

                if (_active_figure>=0) {

                    $figure_children.each(function(i){

                      if (i==_active_figure)
                        $.Scroll.stop().animate({scrollTop: HEIGHTS[_active].min + $(this).height()*i},600,'easeOutQuart')

                    })

                }else{

                  _active_figure = 0;

                  _prev(e);

                }

              }else{

                _active_figure = 0;

                _prev(e);

              }

     }

     function _next(e) {

       _active++;

       if (_active>=_articleLength)
         _active = _articleLength-1;

       e.preventDefault();

       _seek(_active);


     }

     function _prev(e) {
       _active--;

       if (_active<0)
         _active = 0;

       e.preventDefault();

       _seek(_active);
     }

     function _seek(seek_index) {

      $.Scroll.stop().animate({scrollTop: HEIGHTS[seek_index].min},600,'easeOutQuart')

     }



     function _figureChildren() {

         var $f = {};

         $parent.each(function(index) {

          if (index==_active)
            $f = $(this).find('figure').children();


         });



         return $f;

     }


     function _articleprev(e){

     }

     function _enter(e,issue,id,index){

      //_active = index;

     }


     /* ---------------------------------- */

     function _resize() {

      runningHeight = 0;

      $parent.triggerHandler($.Events.RESIZE)

      _setBodyHeight();

     }

     function _orientation() {

        var orientation = window.orientation;

        $parent.triggerHandler($.Events.ORIENT,orientation);

     }

     function _setBodyHeight() {

       if (!$.MobileDevice)
         $.Body.css({height:runningHeight});

     }

     /* ---------------------------------- */

     this.each(function(index) {

        var $self = $(this),
            $figure = $self.find('figure'),
            $figure_children = $figure.children(),
            $column = $self.find('.column'),
            $header = $self.find('header'),
            $numeral = $self.find('.numeral'),
            $extras = $self.find('.extras'),
            $videos = $self.find('[data-video]'),
            _view = '',
            _active_figure = 0,
            _id = $self.attr('data-google'),
            _titlePage = $self.hasClass('title-page'),
            _chapter = $self.hasClass('chapter'),
            _fullscreen = $self.hasClass('fullscreen'),
            _index = index,
            _fixedHeight =  $self.attr('data-height'),
            _columnHeight = $column ? $column.height() : 0,
            _figureHeight = $figure ? $figure.height() : 0,
            _ratio = 1200/1440;

          $parent
           .bind($.Events.RESIZE,_size)
           .bind($.Events.ORIENT,_size)



          if ($videos.length>0)
            $videos.Video({scope:$self});

          function _size() {

            _columnHeight = $column ? $column.height() : 0

            _figureHeight = $figure ? $figure.height() : 0

            HEIGHTS[index]= {
              min: runningHeight,
              max: runningHeight + _height()
            };

            runningHeight+=_height();

            if (_chapter && !$.MobileDevice && !$.Tablet) {

              $header.css({top: _selfHeight()<$.Window.height() ? _selfHeight()/2 : $.Window.height()/2})

              $extras.css({top: _selfHeight()<$.Window.height() ? _selfHeight()/2 : $.Window.height()/2})

            }

            if (!$.MobileDevice) {

              $figure.css({height:_figureHeight})

              $self.css({height:_selfHeight(),overflow:'hidden',zIndex:1000-_index})

            }

          }

          _size();

          if (!$.MobileWebkit)
            $.Window.bind('scroll',_scroll)


          if (!_titlePage) {
            _enumeratedArticles++;
            $numeral.html('No. ' + _enumeratedArticles)

          }


        function _scroll(e) {

          var sTop = $.Window.scrollTop(),
              location = HEIGHTS[_index],
              vS = view_status(sTop);

            switch (vS){

              case "page":

                $self.css({marginTop: -(sTop-(location.min + _figureHeight )) , display:'block' })
                $figure.css({ marginTop: -(sTop - location.min ) })
                $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)

              break;

              case "inview":

                $figure.css({ marginTop: -(sTop - location.min ) })

                if (_view!=vS)
                  $self.css({marginTop:0,display:'block'})

                $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)

              break;

              case "above":

                if (_view!=vS) {
                 $figure.css({marginTop: -_figureHeight - 25})
                 $self.css({marginTop:-_height() - 25,display:'none'})
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,sTop - location.min)
                }

              break;

              case "outofview":

                if (_view!=vS) {
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,0)
                 $figure.css({marginTop: 0})
                 $self.css({marginTop:0,display:'none'})
                }

              break;

              default:

                if (_view!=vS) {
                 $self.triggerHandler($.Events.ARTICLE_SCROLL,0)
                 $figure.css({marginTop: 0})
                 $self.css({marginTop:0,display:'block'})
                }

              break;

            }

            _view = vS




        }

        function view_status(sTop){

          var location = HEIGHTS[_index]

          if (sTop > location.min && sTop <= location.max) {

            if (!$self.hasClass('_inview')) {

              $self.addClass('_inview');

              $.Body.triggerHandler($.Events.ARTICLE_ENTER, [_issue,_id,index]);

            }

            if (sTop >= location.min + _figureHeight)
              return 'page'
            else
              return 'inview';

          }else{

            if ($self.hasClass('_inview'))
              $self.removeClass('_inview');

          }



          if (sTop <= location.min - $.Window.height() ) {
            $self.triggerHandler($.Events.ARTICLE_EXIT, [_issue,_id,index]);
            return 'outofview';
          }

          if (sTop <= location.min)
            return 'below';


          if (sTop > location.max) {
            $self.triggerHandler($.Events.ARTICLE_EXIT, [_issue,_id,index]);
            return 'above';
          }


        }

        function _selfHeight() {

          var sH = $.Window.height(),
              sW = $.Window.width();

          if (_fixedHeight) {

            return _fixHeight(_fixedHeight,sW,sH);

          }

          if ($.MobileWebkit)
            return (_figureHeight+250) > sH  ? _figureHeight + 250: sH;

          return _columnHeight + 50 < sH ? sH : _columnHeight + 50;

        }

        function _height() {

          var winHeight = (_columnHeight + 50 < $.Window.height()) ? $.Window.height() : _columnHeight + 50,
              sW = $.Window.width();


          if (_fixedHeight) {

            return _fixHeight(_fixedHeight,sW);

          }


          return _figureHeight + winHeight

        }

        function _fixHeight(_fixedHeight,sW) {



          if (_ratio*sW <= 1200){
            return 1200
          }

          if (_ratio*sW > 1200) {
            return _ratio*sW
          }


          return parseInt( _fixedHeight )

        }

        function _keyright(e) {

          e.preventDefault();

          if (_active==index) {

              if ($figure_children.length>1){

                _active_figure++;

                if (_active_figure<$figure_children.length) {

                    $figure_children.each(function(i){

                    if (i==_active_figure) {
                      $.Scroll.stop().animate({scrollTop: $(this).offset().top -250},600,'easeOutQuart')
                    }

                    })

                }else{

                  _active_figure = 0;

                  setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_NEXT)},100)

                }

              }else{

                _active_figure = 0;

                setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_NEXT)},100)

              }

          }



        }

        function _keyleft(e) {

          e.preventDefault();

          if (_active==index) {

              if ($figure_children.length>1){

                _active_figure--;

                if (_active_figure>=0) {

                    $figure_children.each(function(i){

                    if (i==_active_figure) {
                      $.Scroll.stop().animate({scrollTop: $(this).offset().top -250},600,'easeOutQuart')
                    }

                    })

                }else{

                  _active_figure = 0;

                  setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_PREV)},100)

                }

              }else{

                _active_figure = 0;

                setTimeout(function(){$.Body.triggerHandler($.Events.ARTICLE_PREV)},100)

              }

          }



      }



     });

     _setBodyHeight()

    return this;

  } //Article

  /* ---------------------------------- */

  $.fn.Articles = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this),
             $articles = $self.find('article');

         $articles.Article();

      });

      return this;

  } //Articles

  /* ---------------------------------- */

  $.fn.Video = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this),
             $video_wrapper = $('<div/>').addClass('vimeo-video').css({display:'none'}).appendTo($self),
             $img = $self.find('img'),
             $a = $('<a/>').addClass('i-video').append('<span/>').attr('href','#/Play').appendTo($self),
             _playingVideo = false;

        $self.css({lineHeight:0})

        $img.css({opacity: 1})

        config.scope.bind($.Events.ARTICLE_EXIT,
          function(){

              if (_playingVideo) {
                  $a.css({display: 'block'})
                  $img.stop().css({display: 'block',opacity:1})
                  $video_wrapper.css({display:'none'}).html('')
                  _playingVideo = false;
              }

          })

        $a
         .bind('click',
          function(e){

              _playingVideo = true;

              $img.stop().animate({opacity: 0},500,'easeInOutQuart',
                function(){
                  $a.css({display: 'none'})
                  $img.css({display: 'none'})
                  $video_wrapper.css({display:'block'}).html(  '<iframe src="http://player.vimeo.com/video/'+$self.attr('data-video')+'?title=0&amp;byline=0&amp;portrait=0&autoplay=true" width="651" height="366" frameborder="0"></iframe>')
                })

              e.preventDefault();

          })

        if ($.MobileWebkit) {
          $img.css({display:'none'})
          $self.html('<iframe src="http://player.vimeo.com/video/'+$self.attr('data-video')+'?title=0&amp;byline=0&amp;portrait=0" width="651" height="366" frameborder="0"></iframe>')
        }

      });

      return this;

  } //Video

  /* ---------------------------------- */

  /* Mobile */

  $.fn.Mobile = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this),
             $article = $('article'),
             $figure = $('figure');

         $.Body.triggerHandler($.Events.MOBILE);

         $self.addClass('_mobile');

         $self.css({height:'auto'})

         $figure.css({height:'auto',minHeight:'0'})

      });


      return this;
  }

  /* ---------------------------------- */

  /* TOC */

  $.fn.TOC = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this),
             $a = $('[data-about]'),
             _active = false,
             _scrollActive = 0;



         $.Body
          .bind($.Events.KEY_ESC,_toggle)
          .bind($.Events.MODAL,_hide);

         $.Window
          .bind('scroll',
            function() {

              if (_active)
                if (Math.abs($.Window.scrollTop()-_scrollActive)>125)
                  _hide();

            })

         function _toggle() {
            if (!_active)
              _display();
            else
              _hide();

         }

         function _display() {

            _active = true;

            _scrollActive = $.Window.scrollTop();

            $.Body.triggerHandler($.Events.ABOUT);

            $self.css({display:'block'})



         }

         function _hide() {

            _active = false;

            $self.css({display:'none'})

         }

      });


      return this;
  }

  /* ---------------------------------- */

  /* Modal */


  $.fn.Modal = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this),
             $details = $('.modal-details'),
             $a = $('a[data-camera],a[data-location]'),
             _offsetTop = 0;

         $.Body
          .bind($.Events.ABOUT,
            function() {
              _hide();
            });

         $.Window
          .bind('scroll',
            function(e){

              if ($self.hasClass('_active') && Math.abs($.Window.scrollTop() - _offsetTop)>50)
                _hide();

              e.preventDefault();

            })

         $a
          .bind('click', function(e) { e.preventDefault() })
          .bind('mouseenter',
            function(e){

              $.Body.triggerHandler($.Events.MODAL);

              _display($(this));

              e.preventDefault();

            })
          .bind('mouseleave',
            function(e){

              _hide();

              e.preventDefault();

            });


            function _display($element){

              _offsetTop = $.Window.scrollTop();

              $self
              .removeClass()
              .addClass($element.attr('data-modal-id'))
              .addClass('_active');

              if ($.MobileWebkit)
                $self.css({position:'absolute',top:$.Window.scrollTop()+$.Window.height()/2,left:$.Window.width()/2})

              if ($element.attr('data-camera')) {

                if ($element.attr('data-film'))
                  $details.html('<ul><li><h1>Camera</h1><p>'+$element.attr('data-camera')+'</p></li><li><h1>Film</h1><p>'+$element.attr('data-film')+'</p></li></ul>');
                else
                  $details.html('<ul><li><h1>Camera</h1><p>'+$element.attr('data-camera')+'</p></li><li><h1>Lens</h1><p>'+$element.attr('data-lens')+'</p></li></ul>');

              }else{

                $details.html('<ul><li><h1>Location</h1><p>'+$element.attr('data-location')+'</p></li><li><h1>Year</h1><p>'+$element.attr('data-year')+'</p></li></ul>')

              }

            }

            function _hide(){

              $self.removeClass('_active')

            }

      });


      return this;
  }

})(jQuery);

/* ---------------------------------- */

/* Keyboard */

(function($) {

   $.fn.Keyboard = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

        var $self = $(this);

        $(document)
        .bind('keydown',on_keydown);

        function on_keydown(e) {

    		  var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

          switch(key) {

             case 13: //enter

              $.Body.triggerHandler($.Events.KEY_ENTER);

             break;

             case 27: //escape

              $.Body.triggerHandler($.Events.KEY_ESC);
                e.preventDefault();
             break;

             case 32: //space

              $.Body.triggerHandler($.Events.KEY_SPACE);

             break;

             case 38: //top

              $.Body.triggerHandler($.Events.KEY_UP);

             break;

             case 39: //right

              $.Body.triggerHandler($.Events.KEY_RIGHT);
              e.preventDefault();

             break;

             case 40: ///bottom

              $.Body.triggerHandler($.Events.KEY_DOWN);

             break;

             case 37: //left

              $.Body.triggerHandler($.Events.KEY_LEFT);

             break;

          }//switch

        }//keydown

      });

      return this;

  }


})(jQuery);

/* ---------------------------------- */

/* GoogleAnalytics */

(function($) {

  $.fn.GoogleAnalytics = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this);

         $.Body
          .bind($.Events.ARTICLE_ENTER,
            function(e,issue,id) {
              _gaq.push(['_trackPageview', '/issue/'+issue+'/'+id]);
            })
          .bind($.Events.MOBILE,
            function(e,id) {
              _gaq.push(['_trackPageview', '/mobile']);
            })

      });


      return this;
  }

})(jQuery);

/* ---------------------------------- */

/* TargetBlank */

(function($) {


   $.fn.TargetBlank = function() {

     this.each(function() {

        var $self = $(this);


        $self
        .attr('target','_blank');


     });

    return this;

  }



})(jQuery);

/* ---------------------------------- */

/* Shell */

(function($) {

  $.fn.SHELL = function(settings) {

    var config = {};

    if (settings) $.extend(config, settings);

      this.each(function() {

         var $self = $(this);

      });


      return this;
  }

})(jQuery);
