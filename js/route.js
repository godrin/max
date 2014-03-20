define(["backbone", "mustache","start","plus","progress","state"], 
  function(Backbone,
    Mustache,
    start,
    plus,
  progress,State){
    var appOptions={tagName:"div",className:"page"};
    var container="#pageContainer";

    var levels=State.Levels;
    levels.fetch();

    function show(type,options) {
      var ops=_.extend({},options);
      _.extend(ops,appOptions);
      console.log("OPS",ops);
      $(container).empty();
      var app=(new type(ops));
      $(container).append(app.el);
      app.render();
    }

    var router=Backbone.Router.extend({
      routes:{
        "":"index",
        "plus/:max":"plus",
        "progress":"progress"
      },
      index:function() {
        show(start);
      },
      plus:function(max) {
        show(plus,{attributes:{max:max}});
      },
      progress:function() {
        show(progress);
      }

    });

    var MainView=Backbone.View.extend({
      initialize:function() {
        this.listenTo(State.State,"all",this.stateChanged);
      },
      stateChanged:function(a,b,c) {
        console.log("STATE CHANGED",a,b,c);
      }

    });

    new MainView();

    return router;
  });

