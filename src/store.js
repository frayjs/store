'use strict';

var store = function (actions, initialState) {
  var state = initialState;

  return function (action) {
    if (!action || !action.type || !actions[action.type]) { return state; }
    state = actions[action.type](state, action);
    return state;
  };
};
