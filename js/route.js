define(["backbone", "mustache","start","plus","progress"], 
  function(Backbone,
    Mustache,
    start,
    plus,
  progress){
    var appOptions={el:"#page"};
    return Backbone.Router.extend({
      routes:{
        "":"index",
        "plus":"plus",
      },
      index:function() {
        new start(appOptions);
        console.log("INDEX");
      },
      plus:function() {
        new plus();
      },
      progress:function() {
        new progress();
      }

    });
  });

