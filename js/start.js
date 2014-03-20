define(["backbone","mustache","state"],function(Backbone,Mustache,State) {
  return Backbone.View.extend({
    levels:State.Levels,
    templateEl:"#startPageTemplate",
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
        this.$el.html(Mustache.render($(this.templateEl).html(),viewModel));
    }
  });
});
