// Put your JS here

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var mirai = {
    // All pages
    'common': {
      init: function() {

        // Sroll to links

        $(document).on('click', 'a[href^="#"]', function (event) {
          event.preventDefault();
      
          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
          }, 500);
        });

        // Hide Sub Menu when clicking outside 

        $(document).click(function (e) {
            if (document.documentElement.clientWidth > 900) {
                e.stopPropagation();
                var container = $(".nav-primary");

                //check if the clicked area is dropDown or not
                if (container.has(e.target).length === 0) {
                    $('.nav-primary li, .sub-menu').removeClass('menu-active');
                }
            }
        });

      // Reset nav on window resize

        $(window).resize(function() {
            var width = $(document).width();
            if (width < 900) {
                $('body, .nav-mobile, .mobile-trigger span').removeClass('mobile-menu-active');
            }
        })

        $('.nav-mobile li a').click(function() {
          $('body, .nav-mobile, .mobile-trigger span').removeClass('mobile-menu-active');
        });

        $('.mobile-trigger').click(function() {
            $(this).find('span').toggleClass('mobile-menu-active');
            $('body, .nav-mobile').toggleClass('mobile-menu-active');
        });

        $('.module__slider').slick({
            dots: true,
        });

        $('.module__testimonials').slick({
            dots: true,
        });

        var maki1 = new TweenMax("#maki--1", 20, {
          delay:0,
          bezier:{
            curviness:0,
            values:[{x:140, y:70}, {x:-900, y: 1020} ],
            autoRotate:false,
          },
        ease:Linear.easeNone, repeat:-1, autoAlpha:1});
        
        var maki2 = new TweenMax("#maki--2", 20, {
          delay:5,
          bezier:{
            curviness:0,
            values:[{x:140, y:70}, {x:-900, y: 1020} ],
            autoRotate:false,
          },
        ease:Linear.easeNone, repeat:-1, autoAlpha:1});

        var maki3 = new TweenMax("#maki--3", 20, {
          delay:10,
          bezier:{
            curviness:0,
            values:[{x:140, y:70}, {x:-900, y: 1020} ],
            autoRotate:false,
          },
        ease:Linear.easeNone, repeat:-1, autoAlpha:1});

        var maki4 = new TweenMax("#maki--4", 20, {
          delay:15,
          bezier:{
            curviness:0,
            values:[{x:140, y:70}, {x:-900, y: 1020} ],
            autoRotate:false,
          },
        ease:Linear.easeNone, repeat:-1, autoAlpha:1});
        
        },
        finalize: function() {
            // JavaScript to be fired on all pages, after page specific JS is fired
        }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = mirai;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
