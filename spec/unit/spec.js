describe('Class.Mutators.jQueryEach', function(){
  before_each(function(){
    //NOTE See spec.helper.js for test class
    JSpec.defaultContext.divs_fixture = jQuery(fixture('divs'));
    JSpec.defaultContext.proxy = {
      initialize: function(e){},
      method: function(e){}
    };
  });

  describe('moo4q each classes', function(){
    it('should instiate many times', function(){
      var div_count = divs_fixture.find('div').length;
      expect(proxy)
        .to(receive, 'initialize', div_count)
        .with_args(an_instance_of(Object));
      divs_fixture.find('div').foo();
    });

    it('should receive one object as the first argument to the init', function(){
      expect(proxy)
        .to(receive, 'initialize', 'once').with_args(an_instance_of(Object));
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
        var count = divs_fixture.find('div').length;
        expect(proxy).to(receive, 'method', count).with_args('bar');
        divs_fixture.find('div').foo();
        divs_fixture.find('div').foo('method', 'bar');
      });
    });
  });
});

describe('Class.Mutators.jQuery', function(){
  before_each(function(){
    //NOTE See spec.helper.js for test class
    JSpec.defaultContext.divs_fixture = jQuery(fixture('divs'));
    JSpec.defaultContext.proxy = {
      initialize: function(e){},
      method: function(e){}
    };
  });

  it('should instantiate one intance', function(){
    expect(proxy).to(receive, 'initialize', 'once').with_args('div');
    divs_fixture.find('div').bar();
    divs_fixture.find('div').bar('method');
    divs_fixture.find('div').bar('method', 'fizzle');
  });

  it('should call a method without args', function(){
    expect(proxy).to(receive, 'method', 'once');
    divs_fixture.find('div').bar();
    divs_fixture.find('div').bar('method');
  });

  it('should call a method with args', function(){
    expect(proxy).to(receive, 'method', 'once').with_args('fizzle');
    divs_fixture.find('div').bar();
    divs_fixture.find('div').bar('method', 'fizzle');
  });
});