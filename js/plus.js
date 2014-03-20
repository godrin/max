define(["backbone", "mustache", "state"], function(Backbone,Mustache, State){

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
    templateEl:"#plusExerciseTemplate",
    initialize:function() {
      this.render();
      this.listenTo(this.model,"change",this.render);
    },
    render:function() {
      if(!this.template)
        this.template=$(this.templateEl).html();
      var viewModel=this.model.toJSON();
      viewModel.options=_.map(viewModel.options,function(val) {
        return { value: val,
          correct: viewModel.clicked && val==viewModel.answer,
          clicked: val == viewModel.clicked,
          disabled: viewModel.clicked,
        };
      });
      viewModel.correctResult=viewModel.result=="success";
      viewModel.failResult=viewModel.result=="fail";
      viewModel.op="+";
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

  var SequenceModel=Backbone.Model.extend({
    initialize:function() {
      this.listenTo(this,"change",this.checkReady);
    },
    isReady:function() {
      return this.get("count")==this.get("counter");
    },
    checkReady:function() {
      console.log("CHECK");
      var nv=this.isReady();
      if(nv)
        this.set("ready",true);
    }
  });

  var App = Backbone.View.extend({
    WAIT_TIME_GOOD:500,
    WAIT_TIME_BAD:4000,
    initialize: function(){
      console.log("PLUS APP",this);
      this.sequenceModel=new SequenceModel({counter:0,count:4,good:0,bad:0});

      this.model=new ExerciseModel({min:1,max:this.attributes.max||4,optionCount:4});
      this.exerciseView=new ExerciseView({model:this.model});
      this.$el.append(this.exerciseView.el);
      //FIXME: add exerciseView.el to this.$el

      this.borderView=new BorderView({model:this.model,el:"#colored-border"});
      this.listenTo(this.model,"change:result",this.resultChanged);
      this.listenTo(this.sequenceModel,"change:ready",this.sequenceReady);
    },
    resultChanged:function() {
      console.log("RES CHANGED");
      if(this.model.get("result")) {
        console.log("RESS2");
        var finished=false;
        if(this.sequenceModel) {
          console.log("SEQMODEL");
          var toset={counter:this.sequenceModel.get("counter")+1};
          var resultType=this.model.get("result")=="success"?"good":"bad";
          toset[resultType]=(this.sequenceModel.get(resultType)||0)+1;
          this.sequenceModel.set(toset);

          console.log("SM",this.sequenceModel.toJSON());
          finished=this.sequenceModel.isReady();
        }

        if(!finished)
          setTimeout(_.bind(this.model.create,this.model), this.getWaitTime(this.model.get("result")));

      }
    },
    getWaitTime:function(result) {
      return result=="success"?this.WAIT_TIME_GOOD:this.WAIT_TIME_BAD;
    },
    sequenceReady:function() {
      console.log("SEQ READY",this.sequenceModel);
      this.trigger("ready");
      var rating;
      if(this.sequenceModel.get("bad")==0)
        rating=3;
      else if(this.sequenceModel.get("good")>this.sequenceModel.get("bad")*2)
        rating=2;
      else if(this.sequenceModel.get("good")>this.sequenceModel.get("bad"))
        rating=1;
      else
        rating=0;
      State.State.upsert({url:location.hash.substr(1),rating:rating});

      /*
      this.resultView=new RatingView();
      this.resultView.render();
      console.log("RV",this.resultView,this.$el);

      this.$el.append(this.resultView.el);
      */
    }
  });
  return App;
});
