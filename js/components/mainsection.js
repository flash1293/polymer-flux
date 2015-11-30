var TodoActions = require('../actions/TodoActions');
Polymer({
  is: 'flux-mainsection',
  properties: {
    allTodos: {
      type: Object,
      reflectToAttribute: true
    },
    areAllComplete: {
      type: Boolean,
      reflectToAttribute: true
    }
  },
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  },
  isChecked: function(areAllComplete) {
    return (areAllComplete ? 'checked' : '');
  },
  isNotEmpty: function(todos) {
    return Object.keys(todos).length > 0;
  },
  _toArray: function(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key];
    });
  }
});