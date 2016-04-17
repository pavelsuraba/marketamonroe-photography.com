var App = (function($) {
    "use strict";

    function isHeightMore(height) {
        if(document.documentElement.clientHeight > height) {
            return true;
        } else {
            return false;
        }
    }

    function isWidthLess(width) {
        if(window.innerWidth < width) {
            return true;
        } else {
            return false;
        }
    }

    function isWidthMore(width) {
        if(window.innerWidth > width) {
            return true;
        } else {
            return false;
        }
    }

    /* Windows Phone 8 viewport issue */
    function ieViewport() {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                document.createTextNode(
                    "@-ms-viewport{width:auto!important}"
                )
            );
            document.getElementsByTagName("head")[0].
                appendChild(msViewportStyle);
        }
    }

    /* Navigation */
    function menuHandler() {
        var button    = $(".menu"),
            nav       = $(".navigation"),
            nav_outer = $(".navigation--outer");
            

        button.on("click", function(e) {
            e.preventDefault();
            nav.toggleClass("js-active");
            nav_outer.toggleClass("js-active");
        });
    }

    function closeMobileNav() {

        var link      = $(".navigation__item__anchor"),
            nav       = $(".navigation"),
            nav_outer = $(".navigation--outer");

        var rightWidth = isWidthLess(991);

        if(rightWidth) {

            link.on("click.menu", function(e) {
                e.preventDefault();
                nav.toggleClass("js-active");
                nav_outer.toggleClass("js-active");

                if(nav.hasClass("js-active") && nav_outer.hasClass("js-active")) {
                    nav.removeClass("js-active");
                    nav_outer.removeClass("js-active");
                }
            });
        } else {
            link.unbind("click.menu");
        }
    }

    /* Slideshow */
    function slideImg() {

        var wideEnough = isWidthMore(848);

        if(wideEnough) {

            var counter = 0,
                slides  = $('.hero__img'),
                j,
                slideLength  = slides.length - 1;

            for( var i = 0, j = 10; i < slides.length; i++, j-- ) {

                $(slides[i]).css('z-index', j);
            }

            window.setInterval(function() {
                if( counter === 0 ) {
                    slides.eq(counter).fadeOut(3000);
                    counter++;
                }
                else if( counter === slideLength) {
                    counter = 0;
                    slides.fadeIn(3000);
                    
                } else {
                    slides.eq(counter).fadeOut(3000);
                    counter++;
                }
            }, 6000);
        }
    }

    /* Smoothscroll */
    function smoothScroll() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 750);
                return false;
              }
            }
        });
    }

    /* Float labels */
    function floatLabels() {

        var input = $('.form__input'),
            label = $('.form__label');
        
        input.each(function() {

            var that = $(this);

            that.keyup(function() {
                that.prev().addClass('typing');

                if(that.val().length === 0) {
                    that.prev().removeClass('typing');
                }
            });
        });
    }

    //AJAX calls
    function myAjax() {
        var link = $('.ajax-anchor');

        link.on('click', function(e) {
            e.preventDefault();

             var pageUrl = $(this).attr('href'),
                 myContent = $('.content');


            $.ajax({
                url:pageUrl+'?rel=tab',
                success: function(data){
                    myContent.hide();
                    var response = $(data);
                    var content  = response.filter('.content').html();
                    myContent.html(content).fadeIn(400);
                }
            });

            if(pageUrl!=window.location) {
                window.history.pushState({path:pageUrl},'',pageUrl);
            }
        });
    }

    return {
        menuHandler: menuHandler,
        closeMobileNav: closeMobileNav,
        slideImg: slideImg,
        smoothScroll: smoothScroll,
        ieViewport: ieViewport,
        floatLabels: floatLabels,
        myAjax: myAjax
    };

})(jQuery);

App.ieViewport();
App.menuHandler();
App.closeMobileNav();
// App.slideImg();
App.smoothScroll();
App.floatLabels();
App.myAjax();

/* Hide Navigation on scroll */
var HideNav = (function($) {
        // Hide Header on on scroll down
        var didScroll;
            lastScrollTop = 0;
            delta         = 5,
            el            = $("#header");
            navbarHeight  = el.outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 100);

        function hasScrolled() {
            var st = $(this).scrollTop();
            
            // Make sure they scroll more than delta
            if(Math.abs(lastScrollTop - st) <= delta)
                return;
            
            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight){
                // Scroll Down
                el.addClass('header--hide');
            } else {
                // Scroll Up
                if(st + $(window).height() < $(document).height()) {
                    el.removeClass('header--hide');
                }
            }
            
            lastScrollTop = st;
        }
})(jQuery);


