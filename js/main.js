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
    "fastclick": "libs/fastclick-amd/fastclick",
    "gsap-jquery-plugin": "libs/gsap/src/uncompressed/jquery.gsap",
    "gsap": "libs/gsap/src/uncompressed/TweenMax"
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
    },
    "gsap-jquery-plugin": {
      deps:["gsap","jquery"]
    }
  },
  //  how long the it tries to load a script before giving up, the default is 7
  waitSeconds: 30
});

require(['bootstrap','backbone','route','fastclick','gsap-jquery-plugin'], function(Bootstrap, Backbone, App){
  new App;
  Backbone.history.start();
});
