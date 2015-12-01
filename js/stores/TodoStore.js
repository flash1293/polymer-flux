/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    document.dispatchEvent(new CustomEvent(TodoConstants.TODO_STORE_CHANGE));
  },
};

document.addEventListener(TodoConstants.TODO_CREATE, function(ev) {
  var text = ev.detail.text.trim();
  if (text !== '') {
    create(text);
    TodoStore.emitChange();
  }
});

document.addEventListener(TodoConstants.TODO_TOGGLE_COMPLETE_ALL, function(ev) {
  if (TodoStore.areAllComplete()) {
    updateAll({complete: false});
  } else {
    updateAll({complete: true});
  }
  TodoStore.emitChange();
});

document.addEventListener(TodoConstants.TODO_UNDO_COMPLETE, function(ev) {
  update(ev.detail.id, {complete: false});
  TodoStore.emitChange();
});

document.addEventListener(TodoConstants.TODO_COMPLETE, function(ev) {
  update(ev.detail.id, {complete: true});
  TodoStore.emitChange();
});

document.addEventListener(TodoConstants.TODO_UPDATE_TEXT, function(ev) {
  var text = ev.detail.text.trim();
  if (text !== '') {
    update(ev.detail.id, {text: text});
    TodoStore.emitChange();
  }
});

document.addEventListener(TodoConstants.TODO_DESTROY, function(ev) {
  destroy(ev.detail.id);
  TodoStore.emitChange();
});

document.addEventListener(TodoConstants.TODO_DESTROY_COMPLETED, function(ev) {
  destroyCompleted();
  TodoStore.emitChange();
});

module.exports = TodoStore;
