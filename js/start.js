define(["backbone","mustache"],function(Backbone,Mustache) {
  return Backbone.View.extend({
    templateEl:"#startPageTemplate",
    initialize:function() {
      this.render();
    },
    render:function() {
      var viewModel={exercise:[
        {name:"Plus bis 10",url:"#plus"}
        ]};
        this.$el.html(Mustache.render($(this.templateEl).html(),viewModel));
    }
  });
});
