define(["backbone", "mustache","start","plus","progress","state","fastclick"], 
  function(Backbone,
    Mustache,
    start,
    plus,
  progress,State,FastClick){
    var appOptions={tagName:"div",className:"page"};
    var container="#pageContainer";

    var levels=State.Levels;
    levels.fetch();
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

    var MainView=Backbone.View.extend({
      initialize:function() {
        this.listenTo(State.State,"all",this.stateChanged);
      },
      stateChanged:function(event,model,collection) {
        var url=model.get("url");
        console.log("ROUTER",this.attributes.router,model,url);
        this.attributes.router.navigate("progress/"+url, {trigger: true});
      }

    });
    var Router=Backbone.Router.extend({
      routes:{
        "":"index",
        "plus/:min0..:max0+:min1..:max1":"plus",
        "progress/*url":"progress"
      },
      initialize:function() {
        console.log("ROUTER.init");
        new MainView({attributes:{router:this}});
      },
      index:function() {
        show(start);
      },
      plus:function(min0,max0,min1,max1) {
        show(plus,{attributes:{min0:min0,max0:max0,min1:min1,max1:max1}});
      },
      progress:function(url) {
        show(progress,{attributes:{url:url}});
      }

    });
 FastClick.attach(document.body);


    return Router;
  });

