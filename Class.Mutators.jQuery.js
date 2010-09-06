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

      // If the selector returns many results instantiate for each
      if(this.length > 0){
        this.each(function(i, e){
          // Send the jquery object itself since we can use o.selector
          this.data(name, new self($(e), arg));
        }.bind(this));
      } else {
        this.data(name, new self(this, this, arg));
      }
    }
    return this;
  };
};