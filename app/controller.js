/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
  Home = require("views/home"),
  Projects = require("views/projects"),
  Contact = require("views/contact");

module.exports = Backbone.Marionette.Controller.extend({
  initialize: function (options) {
    this.region = options.region;
  },

  showDefault: function () {
    this.region.show(new Home());
  },

  showProjects: function () {
    this.region.show(new Projects());
  },

  contact: function () {
    this.region.show(new Contact());
  }
});