var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-header',
  properties: {},
  _onSave: function(event, text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }
});