define(["backbone","mustache","state","text!templates/start.html"],function(Backbone,Mustache,State,template) {
  return Backbone.View.extend({
    levels:State.Levels,
    initialize:function() {
      this.listenTo(this.levels,"sync",this.render);
      this.render();
    },
    render:function() {
      var viewModel={exercise:[
        {name:"Plus bis 10",url:"#plus"}
        ]
        };
        viewModel.exercise=this.levels.toJSON();
        this.$el.html(Mustache.render(template,viewModel));
    }
  });
});
