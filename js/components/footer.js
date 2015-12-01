var TodoActions = require('../actions/TodoActions');

Polymer({
  is: 'flux-footer',
  properties: {
    allTodos: {
      type: Object,
      reflectToAttribute: true,
      observer: '_todosChanged'
    }
  },
  _todosChanged: function(allTodos) {
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      this.set('showFooter', false);
      return;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }
    
    this.set('completed', completed);

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';
    this.set('itemsLeft', '' + itemsLeft);
    this.set('itemsLeftPhrase', '' + itemsLeftPhrase);
    this.set('showFooter', true);
  },
  handleCompleteClick: function() {
    TodoActions.destroyCompleted();
  }
});