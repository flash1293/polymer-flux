var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-todo-item',
  properties: {
    todo: {
      type: Object,
      reflectToAttribute: true
    }
  },
  isEditing: false,
  
  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.todo);
  },

  _onDoubleClick: function() {
    this.set("isEditing", true);
  },

  _onSave: function(event, text) {
    TodoActions.updateText(this.todo.id, text);
    this.set("isEditing", false);
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.todo.id);
  },
  
  classNames: function(complete,isEditing) {
    return ((complete ? 'completed' : '') + ' ' + (isEditing? 'editing' : '')).trim();
  }
});