var TodoStore = require('../stores/TodoStore');
var TodoConstants = require('../constants/TodoConstants');

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
  /**
   * because this is an controller-view, it attaches to store-changes and propagates
   * the changes down to the child-views
   */
  attached: function() {
    document.addEventListener(TodoConstants.TODO_STORE_CHANGE, this._onChange.bind(this));
    this._mixIn(getTodoState());
  },
  detached: function() {
    document.removeEventListener(TodoConstants.TODO_STORE_CHANGE, this._onChange.bind(this));
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
