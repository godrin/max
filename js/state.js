define(["backbone","text!levels.json","localstorage"],function(Backbone,levelsData,localStorage) {
  var StateModel=Backbone.Model.extend({
    finished:function() {
      console.log("STATE.finished");
      return this.get("rating")>0;
    }
  });
  var StateCollection=Backbone.Collection.extend({
    model:StateModel,
    localStorage: new Backbone.LocalStorage("state"), // Unique name within your app.
    upsert:function(data) {
      var s=this.findWhere({url:data.url});
      if(s) {

        if(data.rating>s.get("rating"))
          s.set({rating:data.rating});
        s.set({lastRating:data.rating});
        this.trigger("update",s,this);
      } else {
        data.lastRating=data.rating;
        this.add(s=new StateModel(data));
      }
      s.save();
    }
  });
  var StateCollectionInstance=new StateCollection();
  window.StateCollectionInstance=StateCollectionInstance;

  var LevelModel=Backbone.Model.extend({
    finished:function() {
      var s=this.state();
      if(s)
        return s.finished();
      return false;
    },
    state:function() {
      return StateCollectionInstance.findWhere({url:this.get("url").substr(1)});
    },
    isBlocked:function() {
      if(this.index()==0)
        return false;
      var b=this.levelBefore();
      if(b) {
        return !b.finished();
      } else {
        console.log("ERROR: Level before not found!");
      }
      return true;
    },
    levelBefore:function() {
      var i=this.index();
      if(i>0)
        return LevelCollectionInstance.at(i-1);
      return null;
    },
    index:function() {
      return LevelCollectionInstance.indexOf(this);    
    }
  });
  var LevelCollection=Backbone.Collection.extend({
    model: LevelModel,
    url:"js/levels.json"
  });
  var LevelCollectionInstance=new LevelCollection(JSON.parse(levelsData));
  window.LevelCollectionInstance=LevelCollectionInstance;
  return {
    LevelModel:LevelModel,
    Levels:LevelCollectionInstance,
    State:StateCollectionInstance
  };
});
