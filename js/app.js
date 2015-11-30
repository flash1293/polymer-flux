/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var polymerReact = require('react-polymer');
var React = require('react');

var TodoApp = require('./components/TodoApp.react');

var footer = require('./components/footer');
var TodoTextInput = require('./components/todo-textinput');

polymerReact.registerAttribute('all-todos');
polymerReact.registerAttribute('class-name');
polymerReact.registerAttribute('id-value');
polymerReact.registerEvent('save', 'onSave');

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);
