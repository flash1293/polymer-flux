var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

Polymer({
  is: 'flux-todo-app',
  properties: {},
  attached: function() {
    TodoStore.addChangeListener(this._onChange.bind(this));
    this._mixIn(getTodoState());
  },
  detached: function() {
    TodoStore.removeChangeListener(this._onChange.bind(this));
  },
  _mixIn: function(obj) {
    Object.keys(obj).forEach(function(key) {
      //TODO obj[key] has to be cloned
      this.set(key, obj[key]);
    }.bind(this));
  },
  _onChange: function() {
    this._mixIn(getTodoState());
  }
});
