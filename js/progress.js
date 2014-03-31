define(["backbone","mustache","state","text!templates/progress.html",
  "text!../img/sun.svg"],function(Backbone,Mustache,State,progressTemplate,sunSvg) {
  var ProgressView=Backbone.View.extend({
    className:"progress",
    tagName:"div",
    render:function() {
      var url=this.attributes.url;
      var state=State.State.get(url);

      var stars=[];
      _.times(state.get("rating"),function() {stars.push({sunSvg:sunSvg});});


      var viewModel={grey:[1,1,1],colored:stars};
      var html=Mustache.render(progressTemplate,viewModel);
      console.log(html);

      this.$el.html(Mustache.render(progressTemplate,viewModel));
    }
  });
  return ProgressView;
});
