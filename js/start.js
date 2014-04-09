define(["backbone", "mustache", "state", "presenter/progress",
"text!templates/start.html"], 
function(Backbone, Mustache, State, ProgressPresenter, template) {
  return Backbone.View.extend({
    levels:State.Levels,
    initialize:function() {
      this.listenTo(this.levels,"sync",this.render);
      this.render();
    },
    render:function() {
      var viewModel={};
      var self=this;
      viewModel.exercise=this.levels.map(function(level,i) {
        console.log("L",self.levels,level);
        var o=level.toJSON();
        o.blocked=level.isBlocked();
        o.i=i+1;
        var s=level.state();
        if(s) {
          o.rating=ProgressPresenter.present(s);
          // o.rating=s.toJSON();
        }
        return o;
      });
      console.log("VM",viewModel);
      this.$el.html(Mustache.render(template,viewModel));
    }
  });
});
