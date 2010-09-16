var Foo = new Class({
  jQuery: 'foo',

  initialize: function(mock){
    JSpec.defaultContext.proxy.initialize(mock);
  },

  method: function(mock){
    JSpec.defaultContext.proxy.method(mock);
  },

  property: 0
});
