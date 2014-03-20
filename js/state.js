define(["backbone","localstorage"],function(Backbone) {
  var LevelModel=Backbone.Model.extend({
  });
  var LevelCollection=Backbone.Collection.extend({
    model: LevelModel,
    url:"js/levels.json"
  });
  var LevelCollectionInstance=new LevelCollection();

  var StateModel=Backbone.Model.extend({
  });
  var StateCollection=Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("state"), // Unique name within your app.
    upsert:function(data) {
    data.id=data.url;
      console.log("UPSERT",data);
      var s=this.findWhere({url:data.url});
      if(s) {
        s.set(data);
        this.trigger("update",s,this);
      } else {
        this.add(new StateModel(data));
      }
    }
  });

  return {
    LevelModel:LevelModel,
    Levels:LevelCollectionInstance,
    State:new StateCollection()
  };
}
  );
