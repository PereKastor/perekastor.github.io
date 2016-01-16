(function ($) {

  $(document).ready(function () {

    $(".grid").on("click", ".info-project", function () {
      var project = $(this).data("project");
      $(".overlay-portfolio").show();
    });

    $("#portfolio").on("click", ".overlay-portfolio", function () {
      $(this).fadeOut("fast");
    });


  });

})(jQuery);