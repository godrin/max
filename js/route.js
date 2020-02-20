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
        //show(plus,{attributes:{min0:min0,max0:max0,min1:min1,max1:max1,op:op}});
        show(plus,{attributes:{
          settings:{options:4,
            formula:[{min:parseInt(min0,10),max:parseInt(max0,10)},
            {min:parseInt(min1,10),max:parseInt(max1,10),op:op}],
            result:{min:1,max:1000}
          }}});
      },
      progress:function(url) {
        console.log("PROGRRESS",url);
        var last=false;
        if(url.match(/^last:.*/))
          url=url.replace(/^last:/,'');
        show(progress,{attributes:{url:url,last:last}});
      }

    });
    FastClick.attach(document.body);

    return Router;
  });

