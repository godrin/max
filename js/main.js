require.config({
  paths: {
    "jquery": "libs/jquery/dist/jquery",
    "text": "libs/requirejs-text/text",
    "underscore": "libs/underscore/underscore",
    "backbone": "libs/backbone/backbone",
    "localstorage": "libs/backbone.localstorage/backbone.localStorage",
    "mustache": "libs/mustache/mustache",
    "bootstrap": "libs/bootstrap/dist/js/bootstrap",
    "hide-address-bar": "libs/hide-address-bar/hide-address-bar",
    "fastclick": "libs/fastclick-amd/fastclick"
  },
  shim: {
    "backbone": {
      //   loads dependencies first
      deps: ["jquery", "underscore"],
      // custom export name, this would be lowercase otherwise
      exports: "Backbone"
    },
    "bootstrap": {
      deps:["jquery"],
      exports:"Bootstrap"
    }
  },
  //  how long the it tries to load a script before giving up, the default is 7
  waitSeconds: 30
});

require(['bootstrap','backbone','route','fastclick'], function(Bootstrap, Backbone, App){
  new App;
  Backbone.history.start();
});
