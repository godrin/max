define(["backbone","state"],function(Backbone,State) {
  return Backbone.View.extend({
    initialize:function() {
      this.listenTo(State.State,"all",this.stateChanged);
    },
    stateChanged:function(event,model,collection) {
      var url=model.get("url");
      console.log("ROUTER",this.attributes.router,model,url);
      this.attributes.router.navigate("progress/"+url, {trigger: true});
    }

  });
});
