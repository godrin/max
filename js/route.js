define(["backbone", "mustache","start", "plus", "progress", "state", "fastclick","views/main"], 
  function(Backbone, Mustache,start, plus, progress, State, FastClick, MainView){
    var appOptions={tagName:"div",className:"page"};
    var container="#pageContainer";

    var levels=State.Levels;
    State.State.fetch();

    function show(type,options) {
      var ops=_.extend({},options);
      _.extend(ops,appOptions);
      console.log("OPS",ops);
      $(container).empty();
      var app=(new type(ops));
      $(container).append(app.el);
      app.render();
    }

    var Router=Backbone.Router.extend({
      routes:{
        "":"index",
        "basic/:op/:min0..:max0/:min1..:max1":"plus",
        "progress/*url":"progress"
      },
      initialize:function() {
        console.log("ROUTER.init");
        new MainView({attributes:{router:this}});
      },
      index:function() {
        show(start);
      },
      plus:function(op,min0,max0,min1,max1) {
        console.log("PLUS",op,min0,arguments);
        show(plus,{attributes:{min0:min0,max0:max0,min1:min1,max1:max1,op:op}});
      },
      progress:function(url) {
        console.log("PROGRRESS",url);
        show(progress,{attributes:{url:url}});
      }

    });
    FastClick.attach(document.body);

    return Router;
  });

