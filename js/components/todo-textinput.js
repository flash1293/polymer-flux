var ENTER_KEY_CODE = 13;

Polymer({
  is: 'flux-todo-textinput',
  properties: {
    className: {
      type: String
    },
    idValue: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      type: String,
      notify: false 
    }
  },
  save: function() {
    this.fire('save', this.value);
    this.set('value', '');
  },
  onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
  }
});