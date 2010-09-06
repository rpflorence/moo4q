describe('Class.Mutators.jQuery', function(){
  describe('moo4q classes', function(){
    before_each(function(){
      JSpec.defaultContext.divs_fixture = jQuery(fixture('divs'));
      JSpec.defaultContext.proxy = { jq: function(e){} };

      var Foo = new Class({
        jQuery: 'foo',
        initialize: function(e){
          JSpec.defaultContext.proxy.jq(e);
        }
      });
    });

    it('should receive many jquery objects as the first argument to the init', function(){
      expect(proxy).to(receive, 'jq', 'twice').with_args(an_instance_of(Object));
      divs_fixture.find('div').foo();
    });

    it('should receive one jquery object as the first argument to the init', function(){
      expect(proxy).to(receive, 'jq', 'once').with_args(an_instance_of(Object));
      divs_fixture.find('div.foo').foo();
    });
  });
});