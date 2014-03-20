define(["backbone","mustache","state","text!templates/progress.html"],function(Backbone,Mustache,State,progressTemplate) {
  var ProgressView=Backbone.View.extend({
    className:"progress",
    tagName:"div",
    render:function() {
      var url=this.attributes.url;
      var state=State.State.get(url);
      console.log("STATE",state,url);

      var stars=[];
      _.times(state.get("rating"),function() {stars.push(1);});


      var viewModel={grey:[1,1,1],colored:stars};
      var html=Mustache.render(progressTemplate,viewModel);
      console.log(html);

      this.$el.html(Mustache.render(progressTemplate,viewModel));
    }
  });
  return ProgressView;
});
