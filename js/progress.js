define(["backbone","mustache","state", "presenter/progress",
  "text!templates/progress.html"],

function(Backbone, Mustache, State, ProgressPresenter, progressTemplate) {
  var ProgressView=Backbone.View.extend({
    className:"progress",
    tagName:"div",
    render:function() {
      var url=this.attributes.url;
      console.log("PROG url",url);
      var state=State.State.findWhere({url:url});
      console.log("STATE",state);
      if(state) {
        viewModel=ProgressPresenter.present(state);

        this.$el.html(Mustache.render(progressTemplate,viewModel));
      } else {
        this.$el.html("No state found");
      }
    }
  });
  return ProgressView;
});
