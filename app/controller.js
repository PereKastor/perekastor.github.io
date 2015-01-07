/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
  Home = require("views/home"),
  Projects = require("views/projects"),
  Contact = require("views/contact"),
  About = require("views/about");

module.exports = Backbone.Marionette.Controller.extend({
  initialize: function (options) {
    this.region = options.region;
  },

  showHome: function () {
    this.region.show(new Home());
  },

  showProjects: function () {
    this.region.show(new Projects());
  },

  showContact: function () {
    this.region.show(new Contact());
  },

  showAbout: function () {
    this.region.show(new About());
  }
});