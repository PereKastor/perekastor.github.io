/* jshint node: true */
"use strict";

var Backbone = require("backbone");

var Layout = Backbone.Marionette.LayoutView.extend({
  template: require("./template"),

  serializeData: function () {
    return {title: "Constant Brunel"};
  }
});

module.exports = Layout;