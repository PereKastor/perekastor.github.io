/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
  app = require("application");

var Projects = Backbone.Marionette.LayoutView.extend({
  template: require("./template"),

  serializeData: function () {
    return {title: "Projects"};
  }
});

module.exports = Projects;