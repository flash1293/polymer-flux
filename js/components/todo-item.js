var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-todo-item',
  properties: {
    todo: {
      type: Object,
      observer: '_visibleStateChanged'
    },
    isEditing: {
      type: Boolean,
      observer: '_visibleStateChanged'
    }
  },
  behaviors: [TodoActions],
  _onToggleComplete: function() {
    this.toggleComplete(this.todo);
  },
  _onDoubleClick: function() {
    this.set("isEditing", true);
  },
  _onSave: function(event, text) {
    this.updateText(this.todo.id, text);
    this.set("isEditing", false);
  },
  _onDestroyClick: function() {
    this.destroy(this.todo.id);
  },
  _visibleStateChanged: function() {
    this.set('classNames', ((this.todo.complete ? 'completed' : '') + ' ' + (this.isEditing? 'editing' : '')).trim());
  }
});