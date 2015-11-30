var ENTER_KEY_CODE = 13;

Polymer({
  is: 'flux-todo-textinput',
  properties: {
    className: {
      type: String,
      reflectToAttribute: true
    },
    idValue: {
      type: String,
      reflectToAttribute: true
    },
    placeholder: {
      type: String,
      reflectToAttribute: true
    },
    value: {
      type: String,
      reflectToAttribute: true
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