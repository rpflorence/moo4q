/*
  ---

  script: Class.Mutators.jQuery

  description: Extends the jQuery object with a MooTools Class

  license: MIT-style license.

  authors: Ryan Florence, Christoph Pojer, Ibolmo Maldonado

  requires:
  - core:1.2.4: [Native, Class, Class.Extras]

  provides: [Class.Mutators.jQuery]

  ...
*/

Class.Mutators.jQueryEach = function(name){
  var self = this;
  jQuery.fn[name] = function(arg){
    var event = 'moo4q_event_' + name,
        send = function(event, arg){
          var instance = event.data.instance,
              property = instance[arg],
              additional_args = Array.slice(arguments, 2);

          if ($type(property) == 'function')
            return property.apply(instance, additional_args);

          if (additional_args.length == 0)
            return;

          // set the property if nothing else
          instance[arg] = arguments[2];
        };

    // if calling a method on the objects broadcast the call
    if ($type(arg) == 'string'){
      $(this).trigger(event, arguments);
      return this.data(name);
    } else {
      if (this.data(name)) return this.data(name);

      this.data(name, []);

      // instantiate a new object for each selector match
      this.each(function(i, e){
        // send the jquery object itself since we can use o.selector
        var new_instance = new self($(e), arg);

        // bind to the name specific document event for later broadcast
        $(e).unbind(event);
        $(e).bind(event, { instance: new_instance }, send);
        this.data(name).push(new_instance);
      }.bind(this));
    }

    return this.data(name);
  };
};

Class.Mutators.jQuery = function(name){
  var self = this;
	jQuery.fn[name] = function(arg){
    var instance = this.data(name);
		if ($type(arg) == 'string'){
			var prop = instance[arg];
			if ($type(prop) == 'function'){
				var returns = prop.apply(instance, Array.slice(arguments, 1));
				return (returns == instance) ? this : returns;
			} else if (arguments.length == 1){
				return prop;
			}
			instance[arg] = arguments[1];
		} else {
			if (instance) return instance;
			this.data(name, new self(this.selector, arg));
		}
		return this;
	};
};