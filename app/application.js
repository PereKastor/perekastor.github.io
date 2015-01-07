/* jshint node: true */
"use strict";

var Backbone = require("backbone"),
  Swag = require("swag"),
  $ = require("jquery");

var app = new Backbone.Marionette.Application({
  config: {}
});

app.addRegions({
  container: "#webContainer"
});

app.addInitializer(function () {
  Swag.registerHelpers();
});

app.addInitializer(function () {
  var Router = require("router");
  var Controller = require("controller");

  new Router({controller: new Controller({region: this.container})});
});

app.on("start", function () {
  Backbone.history.start();
});

module.exports = app;