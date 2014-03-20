define(["backbone","mustache","text!templates/progress.html"],function(Backbone,Mustache,progressTemplate) {
  var ProgressView=Backbone.View.extend({
    className:"progress",
    tagName:"div",
    render:function() {
      var viewModel={grey:[1,1,1],colored:[1,1]};
      var html=Mustache.render(progressTemplate,viewModel);
      console.log(html);

      this.$el.html(Mustache.render(progressTemplate,viewModel));
    }
  });
  return ProgressView;
});
