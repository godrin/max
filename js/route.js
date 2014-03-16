define(["backbone", "mustache","start","plus","progress"], 
  function(Backbone,
    Mustache,
    start,
    plus,
  progress){
    var appOptions={tagName:"div",className:"page"};
    var container="#pageContainer";

    function show(type) {
      $(container).empty();
      $(container).append((new type(appOptions)).el);
    }

    return Backbone.Router.extend({
      routes:{
        "":"index",
        "plus":"plus",
      },
      index:function() {
        show(start);
      },
      plus:function() {
        show(plus);
      },
      progress:function() {
        show(progress);
      }

    });
  });

