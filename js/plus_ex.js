define([],function() {


  // in: { min:1, max:5} out: 3
  function rnd(ops) {
    return _.random(ops.min,ops.max);
  }

  function mul(a,b) {
    return a*b;
  }
  function div(a,b) {
    return a/b;
  }
  function plus(a,b) {
    return a+b;
  }
  function minus(a,b) {
    return a-b;
  }

  function makeOp(opString) {
    var op=opString;
    if(opString=="+." || opString==".+") 
      op=_.random(1,10)<5?"-":"+";
    var opMap={"+":plus,"-":minus,"*":mul,":":div};
    return {name:op,fct:opMap[op]};
  }

  function createFormula(f) {
    var text="";
    var result=0;
    _.each(f,function(part) { 
      if(part.op) {
        var arg=rnd(part);
        var op=makeOp(part.op);
        text+=" "+op.name+" "+arg;
        result=op.fct(result,arg);
      } else {
        text=""+(result=rnd(part));
      }
    });
    return {text:text, result:result};
  }

  // example input:
  // {
    //   options: 4,
    //   formula:[
      //      {min:1,max:5},
      //      {op:"+.", min:1, max:5},
      //      {op:"+-", min:1,max:5}
  //   ],
  //   result:{min:5,max:15}
  // }
  //
  // example output:
  // { 
    //   question: "3-2+4",
    //   options: [5,4,6,7],
    //   correct:5
    // }
    //

    return  {
      create:function (options) {
        var formula;
        var trials=0;
        do {
          formula=createFormula(options.formula);
          if(options.result) {
            if(options.result.min<=formula.result && options.result.max>=formula.result)
              break;
          } else {
            break;
          }
          trials+=1;
          if(trials>100)
            throw "Too many trials in creating execercise";
        }while(true);
        console.log("FORM",formula);

        var r=formula.result;

        var others=[r-1,r+1,r-2,r+2,r-10,r+10];

        _.times(options.options,function() {
          others.push(rnd(formula.result));
        });

        others=_.chain(others).filter(function(a) {
          return (a>=options.result.min && a<=options.result.max && a!=formula.result);
        }).shuffle().unique().value().slice(0,options.options-1);

        console.log("OTHERS",others);
      }
    };

});
