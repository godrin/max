define(["backbone","text!levels.json","localstorage"],function(Backbone,levelsData,localStorage) {
  var StateModel=Backbone.Model.extend({
  });
  var StateCollection=Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("state"), // Unique name within your app.
    upsert:function(data) {
      console.log("UPSERT",data);
      var s=this.findWhere({url:data.url});
      if(s) {
        s.set(data);
        this.trigger("update",s,this);
      } else {
        this.add(s=new StateModel(data));
      }
      s.save();
    }
  });
  var StateCollectionInstance=new StateCollection();
  window.StateCollectionInstance=StateCollectionInstance;

  var LevelModel=Backbone.Model.extend({

  });
  var LevelCollection=Backbone.Collection.extend({
    model: LevelModel,
    url:"js/levels.json"
  });
  var LevelCollectionInstance=new LevelCollection(JSON.parse(levelsData));
  return {
    LevelModel:LevelModel,
    Levels:LevelCollectionInstance,
    State:StateCollectionInstance
  };
});
