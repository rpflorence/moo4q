describe('Class.Mutators.jQuery', function(){
  before_each(function(){
    JSpec.defaultContext.divs_fixture = jQuery(fixture('divs'));
    JSpec.defaultContext.proxy = {
      initialize: function(e){},
      method: function(e){}
    };
  });

  describe('moo4q classes', function(){
    it('should instiate many times', function(){
      expect(proxy).to(receive, 'initialize', 'twice').with_args(an_instance_of(Object));
      divs_fixture.find('div').foo();
    });

    it('should receive one jquery object as the first argument to the init', function(){
      expect(proxy).to(receive, 'initialize', 'once').with_args(an_instance_of(Object));
      divs_fixture.find('div.foo').foo();
    });

    describe('method calls', function(){
      it('should set properties', function(){
        divs_fixture.find('div').foo();
        divs_fixture.find('div').foo('property', 1);
        $.each(divs_fixture.find('div').foo(), function(i, e){
          expect(e.property).to(be, 1);
        });
      });

      it('should broadcast the method to all instances with arguments', function(){
        var mock = {},
            count = divs_fixture.find('div').length;
        expect(proxy).to(receive, 'method', count).with_args(mock);
        divs_fixture.find('div').foo();
        divs_fixture.find('div').foo('method', mock);
      });
    });
  });
});