define(["text!../../img/sun.svg"],function(sunSvg) {
  return {
    present:function(state) {
      var stars=[];
      _.times(state.get("rating"),function() {stars.push({sunSvg:sunSvg});});


      var viewModel={grey:[1,1,1],colored:stars};
      return viewModel;
    }
  };
});
