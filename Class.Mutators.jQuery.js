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

Class.Mutators.jQuery = function(name){
  var self = this;
  jQuery.fn[name] = function(arg){
    var event = 'moo4q_event_' + name,
        send = function(event, arg){
          var instance = event.data.instance,
              property = instance[arg],
              additional_args = Array.slice(arguments, 2);

          if ($type(property) == 'function'){
            var returns = propery.apply(instance, additional_args);
            return (returns == instance) ? this : returns;
          } else if (arguments.length == 0){
            return prop;
          }

          // set the property if nothing else
          instance[arg] = arguments[1];
        }.bind(this);

    // if calling a method on the objects broadcast the call
    if ($type(arg) == 'string'){
      $(document).trigger(event, arguments);
    } else { // otherwise instantiate where necessary
      if (this.data(name)) return this.data(name);

      this.data(name, []);
      // instantiate a new object for each selector match
      this.each(function(i, e){
        // Send the jquery object itself since we can use o.selector
        var new_instance = new self($(e), arg);
        $(document).bind(event, { instance: new_instance }, send);
        this.data(name).push(new_instance);
      }.bind(this));

      return this;
    }
  };
};