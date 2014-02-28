define(["backbone","mustache"], function(Backbone,Mustache){

  function one() {
    return Math.round(Math.random()*10);
  }
  function two() {
    return one()+one();
  }

  var ExerciseModel=Backbone.Model.extend({
    initialize:function() {
      this.create();
    },
    random:function() {
      return _.random(this.get("min"),this.get("max"));
    },
    create:function() {
      var a=this.random();
      var b=this.random();
      var result=a+b;
      var options=[result];
      while(options.length<this.get("optionCount")) {
        var p=this.random()+this.random();
        console.log(p,options,_.contains(options,p));
        if(!_.contains(options,p))
          options.push(p);
      }
      options.sort();
      this.set({a:a,b:b,answer:result,options:options,result:null,clicked:null});
    }
  });

  var ExerciseView=Backbone.View.extend({
    events:{
      "click .btn":"buttonClicked"
    },
    template:"<h1 class='math text-xl xquestion first text-center'>{{a}}+{{b}}</h1>"+
      "<h1 class='math text-xl xquestion equals text-center'>=</h1>"+
      "<div class='bn-group text-center result'>"+
      "{{#options}}<button class='btn btn-xl {{#disabled}}disabled{{/disabled}} {{^correct}}btn-default{{/correct}}{{#correct}}btn-primary{{/correct}} {{#clicked}}clicked{{/clicked}}'>{{value}}</button> {{/options}}"+
      "</h1>",
    initialize:function() {
      this.render();
      this.listenTo(this.model,"change",this.render);
    },
    render:function() {
      var t=this.template;
      var viewModel=this.model.toJSON();
      viewModel.options=_.map(viewModel.options,function(val) {
        return { value: val,
          correct: viewModel.clicked && val==viewModel.answer,
          clicked: val == viewModel.clicked,
          disabled: viewModel.clicked
        };
      });
      console.log("VM",viewModel);
      this.$el.html(Mustache.render(this.template,viewModel));
    },
    buttonClicked:function(event) {
      var targetText=$(event.currentTarget).text();
      var result=(targetText==this.model.get("answer"))?"success":"fail";

      this.model.set({result:result,clicked:targetText});
    }
  });

  var BorderView = Backbone.View.extend({
    initialize:function() {
      this.listenTo(this.model,"change",this.render);
    },
    render:function() {
      this.$el.removeClass("red-border").removeClass("green-border");
      if(this.model.get("result")=="success")
        this.$el.addClass("green-border");
      else if(this.model.get("result")=="fail")
        this.$el.addClass("red-border");
    }
  });

  var App = Backbone.View.extend({
    WAIT_TIME_GOOD:500,
    WAIT_TIME_BAD:4000,
    initialize: function(){
      this.model=new ExerciseModel({min:1,max:10,optionCount:4});
      this.exerciseView=new ExerciseView({model:this.model,el:"#exercise"});
      this.borderView=new BorderView({model:this.model,el:"#colored-border"});
      this.listenTo(this.model,"change:result",this.resultChanged);
    },
    resultChanged:function() {
      if(this.model.get("result"))
        setTimeout(_.bind(this.model.create,this.model),
      this.getWaitTime(this.model.get("result")));
    },
    getWaitTime:function(result) {
      return result=="success"?this.WAIT_TIME_GOOD:this.WAIT_TIME_BAD;
    }
  });
  return App;
});
