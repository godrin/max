define(["backbone", "mustache", "state", 
  "plus_ex",
  "text!templates/plus.html",
  "text!templates/plus_options.html",
"text!../img/sun.svg"], 
function(Backbone, Mustache, State, PlusExercise, template, 
templateOptions, sunSvg){

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
    create:function() {
      console.log("EXMODEL.create");
      var ops=PlusExercise.create(this.get("settings"));
      ops.result=null;
      ops.clicked=null;
      this.set(ops);
      console.log("MMM",this.toJSON());
    }
  });


  var QuestionView=Backbone.View.extend({
    initialize:function() {
      this.render();
      this.listenTo(this.model,"change",this.render);
    },
    render:function() {
      this.$el.html(this.model.get("question"));
    }
  });

  var OptionsView=Backbone.View.extend({
    initialize:function() {
      this.render();
      this.listenTo(this.model,"change",this.render);
    },
    render:function() {
      var viewModel=this.model.toJSON();
      var clickedId;


      viewModel.options=_.map(viewModel.options,function(val,i) {
        if(val==viewModel.clicked)
          clickedId=i;
        return { value: val,
          correct: viewModel.clicked && val==viewModel.answer,
          clicked: val == viewModel.clicked,
          disabled: viewModel.clicked,
        };
      });
      if(viewModel.result=="fail") {
        var btn=this.$(".btn")[clickedId];
        console.log("BTN",btn);
        if($(btn).css("position")!="absolute") {
          _.each(this.$(".btn"),function(b) {
            var p=$(b).position();
            console.log("PPP",p);
            $(b).css({position:"absolute",top:p.top,left:p.left});
          });
        }
        $(btn).animate({top:1000});
        return;
      }
      console.log("VIEWMODEL",viewModel);
      viewModel.op=this.model.get("op");
      this.$el.html(Mustache.render(templateOptions,viewModel));
    },
  });

  var SunView=Backbone.View.extend({
    HIDE_TIME:700,
    initialize:function() {
      this.listenTo(this.model,"change",this.checkSun);
    },
    checkSun:function() {
      this.$el.height(this.$el.width());
      if(this.model.get("result")=="success") {
        var y=-this.$el.width()/4;
        this.$el.animate({bottom:y,opacity:1},
        {duration:this.HIDE_TIME*3/2, easing:"easeOutStrong"});
        if(this.interval)
          clearTimeout(this.interval);
        this.interval=setTimeout(_.bind(this.hide,this),this.HIDE_TIME);
      }
    },
    hide:function() {
      var y=-this.$el.width();
      this.$el.animate({bottom:y,opacity:0.2},this.HIDE_TIME/2);
    }
  });

  var ExerciseView=Backbone.View.extend({
    events:{
      "click .btn":"buttonClicked"
    },
    initialize:function() {
      this.render();
    },
    render:function() {
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
      viewModel.op=this.model.get("op");
      viewModel.sunSvg=sunSvg;
      this.$el.html(Mustache.render(template,viewModel));
      new OptionsView({el:this.$(".basic-options"),model:this.model});
      new QuestionView({el:this.$(".basic-question"),model:this.model});
      new SunView({el:this.$(".answer-sun"),model:this.model});
    },
    buttonClicked:function(event) {
      var targetText=parseInt($(event.currentTarget).text(),10);
      var result=(targetText==this.model.get("answer"))?"success":"fail";
      console.log("BUTTON CLICKED result",result);

      this.model.set({result:result,clicked:targetText});
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
    defaultOps:{
      min0:1,
      max0:3,
      min1:1,
      max1:3,
      optionCount:4
    },
    initialize: function(){
      console.log("PLUS APP",this);

      this.sequenceModel=new SequenceModel({counter:0,count:4,good:0,bad:0});

      var ops=$.extend({},this.defaultOps);
      $.extend(ops,this.attributes);


      this.model=new ExerciseModel(ops);
      this.exerciseView=new ExerciseView({model:this.model});
      this.$el.append(this.exerciseView.el);
      //FIXME: add exerciseView.el to this.$el

      //nthis.borderView=new BorderView({model:this.model,el:"#colored-border"});
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

    }
  });
  return App;
});
