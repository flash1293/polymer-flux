var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-header',
  properties: {},
  behaviors: [TodoActions],
  _onSave: function(event, text) {
    if (text.trim()){
      this.create(text);
    }
  }
});