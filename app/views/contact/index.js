/* jshint node: true */
"use strict";

var Backbone = require("backbone");

var Contact = Backbone.Marionette.LayoutView.extend({
  template: require("./template"),

  serializeData: function () {
    return {title: "Contact"};
  }
});

module.exports = Contact;