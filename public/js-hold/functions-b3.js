//functions.js
$(document).ready(function() {

    function cl(item) {
        try {
            console.log(item)
        } catch (e) {}
    }

    function activateModuleTextExpanders() {
        var modules = $('.module.page-top'),
            textExpanderStr = '<a href="#" class="text-expander">Â Â </a>',
            articles = modules.children('article'),
            articleContent = articles.children('h4');
        $(textExpanderStr).insertAfter(articleContent);
        articles.children('a.text-expander').click(function() {
            var interval = 400,
                upClass = 'expanded',
                dClass = 'shrunk',
                txtSpacer = 'Â Â ',
                articleContent = $(this).parent();
            if (articleContent.hasClass(upClass)) {
                articleContent.addClass(dClass);
                articleContent.removeClass(upClass);
            } else {
                articleContent.addClass(upClass);
                articleContent.removeClass(dClass);
            }
            setTimeout(function() {
                $(this).html(txtSpacer);
            }, interval);
            return false;
        });
    }
    activateModuleTextExpanders();

    function setMobileNav() {
        function showChildList(list) {
            $(navChildLists).hide();
            if (list == null) return;
            $(list).show();
        }

        function showChildList2(list2) {
            $(nav2ChildLists).hide();
            if (list2 == null) return;
            $(list2).show();
        }

        function routeTopNav() {
            var navButton = $('#subsite-nav .navbar .btn-navbar');
            $(navButton).click(function() {
                window.location.href = '#footer';
                return false;
            });
            setGoToTopLinks();

        }

        function setGoToTopLinks() {
            var goToTop1 = '<a style="position: absolute; top: 20px; left: 20px; font-size: .85em; font-weight: bold; text-align: left; text-transform: uppercase; color:#EEEEEE;" id="go-to-top-1" class="go-to-top" href="#">go to top</a>',
                goToTop2 = '<a style="position: absolute; bottom: 20px; left: 20px; font-size: .85em; font-weight: bold; text-align: left; text-transform: uppercase; color:#EEEEEE; display: none;" id="go-to-top-2" class="go-to-top" href="#">go to top</a>',
                container = $('#footer');
            $(container).css('position', 'relative');
            $(container).prepend(goToTop1);
            $(container).append(goToTop2);
        }


        //for testing on desktop
        var mediaQuery = "(max-width: 768px)";
        //use this var if for mobile device only
        //var mediaQuery = "(max-device-width: 480px)";		
        if (!window.matchMedia(mediaQuery).matches) return;

        //for testing only on terminal four
        //var loc = window.location.pathname;
        //if(loc.indexOf('/terminalfour/') < 0 )return;	

        //for university home
        var nav = $('#footer-links #nav'),
            navChildren = $(nav).children('li'),
            navToggle = '<a href="#" class="nav-toggle" style="text-decoration:none; margin-left:5px; display:inline-block"> + </a>',
            navChildLists = $(navChildren).children('ul'),
            navToggles, toggleOn = ' + ',
            toggleOff = ' - ';

        //adding mobile class for css purposes
        $(nav).addClass('mobile-main-nav');
        $(navChildLists).hide();
        $(navChildren).each(function() {
            var headLink = $(this).children('a').eq(0),
                childList = $(this).children('ul');
            if (!headLink.length) headLink = $(this).children('span').children('a').eq(0);
            if ($(headLink).hasClass('close')) return;
            if (!childList.length) return;
            $(navToggle).insertAfter(headLink);
            $(headLink).css('display', 'inline-block');
        });
        navToggles = $('.nav-toggle');
        $(navToggles).each(function() {
            $(this).click(function() {
                var list = $(this).parent().children('ul').eq(0);
                if (!list.length) list = $(this).parent().parent().children('ul').eq(0)
                if ($(list).css('display') == 'block') {
                    showChildList(null);
                    $(this).html(toggleOn);
                } else {
                    showChildList(list);
                    $(navToggles).html(toggleOn);
                    $(this).html(toggleOff);
                }
                return false;
            });


        });


        //for interior pages
        var nav2 = $('#footer-links #main-nav'),
            nav2Children = $(nav2).children('li'),
            nav2Toggle = '<a href="#" class="nav2-toggle" style="text-decoration: none;margin-left: 5px; display: inline-block"> + </a>',
            nav2ChildLists = $(nav2Children).children('ul'),
            nav2Toggles, toggleOn = ' + ',
            toggleOff = ' - ';

        //adding mobile class for css purposes
        $(nav2).addClass('mobile-main-nav');
        $(nav2ChildLists).hide();
        $(nav2Children).each(function() {
            var headLink2 = $(this).children('a').eq(0),
                childList2 = $(this).children('ul');
            if (!headLink2.length) headLink2 = $(this).children('span').children('a').eq(0);
            if ($(headLink2).hasClass('close')) return;
            if (!childList2.length) return;
            $(nav2Toggle).insertAfter(headLink2);
            $(headLink2).css('display', 'inline-block');
        });
        nav2Toggles = $('.nav2-toggle');
        $(nav2Toggles).each(function() {
            $(this).click(function() {
                var list2 = $(this).parent().children('ul').eq(0);
                if (!list2.length) list2 = $(this).parent().parent().children('ul').eq(0)
                if ($(list2).css('display') == 'block') {
                    showChildList2(null);
                    $(this).html(toggleOn);
                } else {
                    showChildList2(list2);
                    $(nav2Toggles).html(toggleOn);
                    $(this).html(toggleOff);
                }
                return false;
            });

            //var nav = $('#footer-links #main-nav'), navChildren = $(nav).children('li'),			
        });


        routeTopNav();
    }
    setMobileNav();

    //add close button on larger accordion sections
    function addCloseButtonAccordionModules() {
        var accordionSections = $('section.module-accordion');
        $(accordionSections).each(function(i) {
            var toggleButton = $('div div div div a.accordion-toggle', this),
                accordionBody = $(toggleButton).attr('href'),
                shortClass = ' ';
            if (!$(toggleButton).length || !$(accordionBody).length) return;
            var linkID = 'close-link-' + i,
                closeLink = '<a style="position: absolute; bottom: 20px; right: 35px; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;" href="#" class="accordion-close-link';
            closeLink += shortClass + '" id="' + linkID + '">close</a>';
            $(accordionBody).append(closeLink);
        });
        $('.accordion-close-link').each(function() {
            $(this).click(function() {
                var accordionSection = $(this).parent().parent(),
                    accordionSection = accordionSection.prop('tagName') == 'SECTION' ? accordionSection : $(this).parent().parent().parent(),
                    toggleButton = $('div div div div a.accordion-toggle', accordionSection),
                    theOffSet = accordionSection.prop('tagName') == 'SECTION' ? accordionSection.position() : null;
                if (theOffSet == null) return;
                $(toggleButton).click();
                setTimeout(function() {
                    window.scrollTo(0, theOffSet.top - 200);
                }, 10);
                return false;
            });
        });
    }
    addCloseButtonAccordionModules();


    var _global_subsiteHeader = $("#subsite-header"),
        _global_headerHeight = _global_subsiteHeader.length ? _global_subsiteHeader.height() : 0;

    $('#subsite-header-affix-wrapper').height(_global_headerHeight);
    _global_subsiteHeader.affix({
        offset: _global_subsiteHeader.position()
    });
    //don't affix if under 1024
    function doNotAffixMobile() {
        var isNotWide = window.matchMedia("(max-width: 1024px)").matches;
        if (isNotWide) {
            $(window).off('.affix');
            setTimeout(function() {
                $('.affix').removeClass('affix');
            }, 30);
            $(window).off('.affix-top');
            setTimeout(function() {
                $('.affix-top').removeClass('affix-top');
            }, 30);
            console.log('this is not a wide window so remove affix');
        }
    }

    doNotAffixMobile();

    $('.accordion-toggle').on('click', function() {
        var accordionBody = $(this).parent().parent().children('.accordion-body'),
            headerActive = 'toggle-active',
            rClass = 'icon-chevron-right',
            aClass = 'icon-chevron-down';
        if ($(accordionBody).hasClass('in')) {
            rClass = aClass;
            aClass = 'icon-chevron-right';
            $(this).removeClass(headerActive);
        } else {
            $('.accordion-toggle').removeClass(headerActive);
            $(this).addClass(headerActive);
        }
        $(".icon-chevron-right", this).removeClass(rClass).addClass(aClass);
        return true;
    });

    $('.accordion-group').on('hidden', function() {
        $(".icon-chevron-down", this).removeClass("icon-chevron-down").addClass("icon-chevron-right");
    });

    /* backstretch */
    function setBackstretch() {
        var mediaQuery = "(max-device-width: 480px)";
        if (!window.matchMedia(mediaQuery).matches) {
            $('.backstretch').each(function() {
                var imgLink = $(this).attr('data-image-link');
                if (typeof imgLink == 'undefined') return;
                if (imgLink.length > 0) $(this).backstretch(imgLink);

                //var adjsize = $(this).attr('adjsize');			
                //$(".backstretch").addClass(adjsize);
            });
        } else {

            // DELETE BELOW TO REMOVE BACKSTRETCH ON MOBILE			

            if (!$('body').hasClass('home'))

            {
                $('.backstretch').each(function() {
                    var imgLink = $(this).attr('data-image-link');
                    if (typeof imgLink == 'undefined') return;
                    if (imgLink.length > 0) $(this).backstretch(imgLink);

                    //var adjsize = $(this).attr('adjsize');			
                    //$(".backstretch").addClass(adjsize);
                });
            }

            // DELETE ABOVE TO REMOVE BACKSTRETCH ON MOBILE

            var adjsize = $(this).attr('adjsize');
            $('#lead').each(function() {
                var adjsize = $(this).attr('adjsize');
                if (typeof adjsize == 'undefined') return;
                if (adjsize.length > 0) $("#lead").addClass(adjsize);
            });

            var adjsize = $(this).attr('adjsize');
            $('#page-top').each(function() {
                var adjsize = $(this).attr('adjsize');
                if (typeof adjsize == 'undefined') return;
                if (adjsize.length > 0) $("#page-top").addClass(adjsize);

                //var adjsize = $(this).attr('adjsize');			
                //$(".backstretch").addClass(adjsize);
            });
        }



        // You may also attach Backstretch to a block-level element
        //  var baz = $('#lead-panel').data('img');
        //  $("#lead").backstretch(baz);
    }
    setBackstretch();

    /* add smooth-scroll class to other anchors*/
    $(window).load(function() {
        $("a.anchorGlyph").removeClass('anchorGlyph').addClass('anchorGlyph smooth-scroll');

    });


    /* smooth scroll works on any anchor tag with the smooth-scroll class*/
    $('a.anchorGlyph').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var jQuerytarget = $(this.hash);
            jQuerytarget = jQuerytarget.length && jQuerytarget || $('[name=' + this.hash.slice(1) + ']');
            if (jQuerytarget.length) {
                var fixedHeaderHeight = 145,
                    scrollSpeed = 800,
                    targetOffset = jQuerytarget.offset().top - fixedHeaderHeight;
                $('html,body').animate({
                    scrollTop: targetOffset
                }, scrollSpeed, 'swing');

                return false;

            }
        }
    });




    /* smooth scroll works on any anchor tag with the smooth-scroll class*/
    $('a.smooth-scroll').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var jQuerytarget = $(this.hash);
            jQuerytarget = jQuerytarget.length && jQuerytarget || $('[name=' + this.hash.slice(1) + ']');
            if (jQuerytarget.length) {
                var fixedHeaderHeight = 225,
                    scrollSpeed = 800,
                    targetOffset = jQuerytarget.offset().top - fixedHeaderHeight;
                $('html,body').animate({
                    scrollTop: targetOffset
                }, scrollSpeed, 'swing');
                return false;
            }
        }
    });




    // You may also attach Backstretch to a block-level element
    //  var baz = $('#lead-panel').data('img');
    //  $("#lead").backstretch(baz);
});
// Initialize tooltip
$(".marker").tooltip({
    html: true
});