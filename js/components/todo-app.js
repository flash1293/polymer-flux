var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

function shallowClone(obj) {
  if(typeof obj === 'object') {
    //call by reference, so creation of new object
    //and transfer of the properties
    var result = {};
    Object.keys(obj).forEach(function(key) {
      result[key] = obj[key];
    });
    return result;
  } else {
    //call by value
    return obj;
  }
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
      this.set(key, shallowClone(obj[key]));
    }.bind(this));
  },
  _onChange: function() {
    this._mixIn(getTodoState());
  }
});
