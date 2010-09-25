var Foo = new Class({
  jQueryEach: 'foo',

  initialize: function(mock){
    JSpec.defaultContext.proxy.initialize(mock);
  },

  method: function(mock){
    JSpec.defaultContext.proxy.method(mock);
  },

  property: 0
});


var Bar = new Class({
  jQuery: 'bar',

  initialize: function(mock){
    JSpec.defaultContext.proxy.initialize(mock);
  },

  method: function(mock){
    JSpec.defaultContext.proxy.method(mock);
  },

  property: 0
});
