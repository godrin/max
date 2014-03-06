//the require library is configuring paths
require.config({
  paths: {
    //    tries to load jQuery from Google's CDN first and falls back
    //  to load locally
    "jquery": [
    "libs/jquery/dist/jquery"],
    "underscore": "libs/underscore/underscore",
    "backbone": "libs/backbone/backbone",
    "mustache": "libs/mustache/mustache",
    "bootstrap": "libs/bootstrap/dist/js/bootstrap",
    "hide-address-bar": "libs/hide-address-bar/hide-address-bar"
  },
  shim: {
    "backbone": {
      //   loads dependencies first
      deps: ["jquery", "underscore"],
      // custom export name, this would be lowercase otherwise
      exports: "Backbone"
    }
  },
  //  how long the it tries to load a script before giving up, the default is 7
  waitSeconds: 10
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(['jquery', 'underscore', 'backbone', 'hide-address-bar'], function(jquery, _, Backbone){
  //require(['bootstrap', 'app'], function(Bootstrap, App){

  require(['bootstrap', 'route'], function(Bootstrap, App){
    new App;
    Backbone.history.start();
  });
});
