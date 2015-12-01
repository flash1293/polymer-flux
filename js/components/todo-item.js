var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-todo-item',
  properties: {
    todo: {
      type: Object,
      reflectToAttribute: true,
      observer: '_visibleStateChanged'
    },
    isEditing: {
      type: Boolean,
      observer: '_visibleStateChanged'
    }
  },
  
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
  
  _visibleStateChanged: function() {
    this.set('classNames', ((this.todo.complete ? 'completed' : '') + ' ' + (this.isEditing? 'editing' : '')).trim());
  }
});