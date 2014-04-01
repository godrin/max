define(["backbone","mustache","state","text!templates/progress.html",
  "text!../img/sun.svg"],function(Backbone,Mustache,State,progressTemplate,sunSvg) {
    var ProgressView=Backbone.View.extend({
      className:"progress",
      tagName:"div",
      render:function() {
        var url=this.attributes.url;
        console.log("PROG url",url);
        var state=State.State.findWhere({url:url});
        console.log("STATE",state);
        if(state) {
          var stars=[];
          _.times(state.get("rating"),function() {stars.push({sunSvg:sunSvg});});


          var viewModel={grey:[1,1,1],colored:stars};
          var html=Mustache.render(progressTemplate,viewModel);
          console.log(html);

          this.$el.html(Mustache.render(progressTemplate,viewModel));
        } else {
          this.$el.html("No state found");
        }
      }
    });
    return ProgressView;
  });
