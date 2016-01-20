(function ($) {

  $(document).ready(function () {

    var projectsDescription = {
      geobalance: {
        "title": "GeoBalance",
        "description": "Jeu mobile où l'on doit placer des pièces en équilibre sur une plate-forme.",
        "imgPath": "assets/images/item-1.jpg",
        "skills": ["C#", "Unity3D", "GameDesign", "LevelDesign"]
      },
      vinoga: {
        "title": "Vinoga",
        "description": "Jeu basé sur l'univers du vin où l'on apprend beaucoup de choses.",
        "imgPath": "assets/images/item-1.jpg",
        "skills": ["HTML5", "CSS3", "Javascript", "BackboneJS", "NodeJS", "MongoDB"]
      },
      cubbyhole: {
        "title": "CubbyHole",
        "description": "Plateforme de stockage de fichiers en ligne entièrement fait par nos soins.",
        "imgPath": "assets/images/item-2.jpg",
        "skills": ["HTML5", "CSS3", "Javascript", "AngularJS", "NodeJS"]
      },
      xray: {
        "title": "X-Ray Adventure",
        "description": "Jeu en 2D réalisé durant la Global Game Jam 2014.",
        "imgPath": "assets/images/item-3.jpg",
        "skills": ["C#", "Unity3D", "GameDesign", "LevelDesign"]
      },
      farmwarfare: {
        "title": "Farm Warfare",
        "description": "Jeu de gestion d'une ferme avec un système de combat entre fermiers.",
        "imgPath": "assets/images/item-4.jpg",
        "skills": ["C#", "Unity3D", "GameDesign", "LevelDesign"]
      },
      frogger: {
        "title": "Frogger",
        "description": "Un jeu très connu qui m'a permis d'en apprendre un peu plus sur le jeu vidéo.",
        "imgPath": "assets/images/item-5.jpg",
        "skills": ["C#", "Unity3D", "GameDesign", "LevelDesign"]
      },
      forbidden: {
        "title": "Forbidden Magic",
        "description": "Jeu réalisé durant une Game Jam à Montréal. Un jeu basé sur l'univers de l'alchimie.",
        "imgPath": "assets/images/item-6.jpg",
        "skills": ["C#", "Unity3D", "GameDesign", "LevelDesign"]
      }
    };


    $(".grid").on("click", ".info-project", function () {
      var project = $(this).data("project");
      $(".overlay-portfolio").fadeToggle("fast");
      $(".content-portfolio").fadeToggle("slow");
    });

    $("#portfolio").on("click", ".overlay-portfolio", function () {
      $(this).fadeToggle("fast");
      $(".content-portfolio").fadeToggle("fast");
    });

    var getTemplate = function getTemplate(name, options) {
      var html = '<div class="col-xs-12 col-sm-4 col-md-4">';
      html += '<div class="grid wow zoomIn">';
      html += '<figure class="effect-bubba info-project" data-project="' + name + '">';
      html += '<img src="' + options.imgPath + '" alt="' + name + '"/>';
      html += '<figcaption>';
      html += '<h2><span>' + options.title + '</span></h2>';
      html += '<p>' + options.description + '</p>';
      html += '</figcaption>';
      html += '</figure>';
      html += '</div>';
      html += '</div>';
      return html;
    };

    var initTemplate = function () {
      $.each(projectsDescription, function (key, project) {
        var template = getTemplate(key, project);
        $(".projects-list").append(template);
      });
    }();


  });

})(jQuery);