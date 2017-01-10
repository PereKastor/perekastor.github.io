(function ($) {

  /* ---------------------------------------------- /*
   * Preloader
   /* ---------------------------------------------- */

  $(window).load(function () {
    $('#status').fadeOut();
    $('#preloader').delay(300).fadeOut('slow');
  });

  $(document).ready(function () {

    /* ---------------------------------------------- /*
     * Smooth scroll / Scroll To Top
     /* ---------------------------------------------- */

    $('a[href*=#]').bind("click", function (e) {

      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 500);
      e.preventDefault();
    });

    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

    /* ---------------------------------------------- /*
     * Navbar
     /* ---------------------------------------------- */

    $('.header').sticky({
      topSpacing: 0
    });

    $('body').scrollspy({
      target: '.navbar-custom',
      offset: 70
    });


    /* ---------------------------------------------- /*
     * Skills
     /* ---------------------------------------------- */
    //var color = $('#home').css('backgroundColor');

    $('.skills').waypoint(function () {
      $('.chart').each(function () {
        $(this).easyPieChart({
          size: 140,
          animate: 2000,
          lineCap: 'butt',
          scaleColor: false,
          barColor: '#FF5252',
          trackColor: 'transparent',
          lineWidth: 10
        });
      });
    }, {offset: '80%'});


    /* ---------------------------------------------- /*
     * Quote Rotator
     /* ---------------------------------------------- */

    $(function () {
      /*
       - how to call the plugin:
       $( selector ).cbpQTRotator( [options] );
       - options:
       {
       // default transition speed (ms)
       speed : 700,
       // default transition easing
       easing : 'ease',
       // rotator interval (ms)
       interval : 8000
       }
       - destroy:
       $( selector ).cbpQTRotator( 'destroy' );
       */

      $('#cbp-qtrotator').cbpQTRotator();

    });


    /* ---------------------------------------------- /*
     * Home BG
     /* ---------------------------------------------- */

    $(".screen-height").height($(window).height());

    $(window).resize(function () {
      $(".screen-height").height($(window).height());
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('#home').css({'background-attachment': 'scroll'});
    } else {
      $('#home').parallax('50%', 0.1);
    }


    /* ---------------------------------------------- /*
     * WOW Animation When You Scroll
     /* ---------------------------------------------- */

    wow = new WOW({
      mobile: false
    });
    wow.init();


    /* ---------------------------------------------- /*
     * E-mail validation
     /* ---------------------------------------------- */

    function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    };


    //setInterval(function() {
    //  wallop.next();
    //}, 5000);


    /* ---------------------------------------------- /*
     * Projects manager
     /* ---------------------------------------------- */

    var previousProject = "";
    $(".grid").on("click", ".effect-bubba", function () {
      var project = $(this).data("project");
      $(".project-info").slideUp("fast");
      if (project !== previousProject) {
        var $project = $(".open-" + project);
        $project.slideToggle("fast");
        $project.children(".gallery").flickity('resize');
        previousProject = project;
      }
      else {
        previousProject = "";
      }
    });

    $(".project-info").hide();

    /* ---------------------------------------------- /*
     * Contact form ajax
     /* ---------------------------------------------- */
    var m = new mandrill.Mandrill('LBVmx2yzpOrZuYs29HZPUA');

    $('#contact-form').submit(function (e) {

      e.preventDefault();

      var c_name = $('#c_name').val();
      var c_email = $('#c_email').val();
      var c_message = $('#c_message ').val();
      var response = $('#contact-form .ajax-response');

      if (( c_name == '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
        response.fadeIn(500);
        response.html('<i class="fa fa-warning"></i> Il doit y avoir un petit problème !');
      }

      else {
        var params = {
          "message": {
            "text": c_message,
            "subject": "Message reçu de: " + c_name,
            "from_email": c_email,
            "from_name": c_name,
            "to": [
              {
                "email": "constant.95@gmail.com",
                "name": "Constant Brunel",
                "type": "to"
              }
            ],
            "headers": {
              "Reply-To": c_email
            },
            "important": true
          }
        };

        $('#contact-form .ajax-hidden').fadeOut(500);

        m.messages.send(params, function (res) {
          response.html("Message reçu ! Je vous réponds le plus rapidement possible.").fadeIn(500);
          console.log("ok", res);
        }, function (err) {
          console.log("bad", err);
        });
      }

      return false;
    });


    /* ---------------------------------------------- /*
     * Cheat MotherFucker
     /* ---------------------------------------------- */

    cheet("U U D D L R L R b a", function () {
      alert("You are damn good :)");
    })
  });

})(jQuery);