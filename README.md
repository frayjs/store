fray.store
==========

Predictable state container

Usage
-----

```js
var store = require('fray.store');

// define the actions
var counter = store({
  INCREMENT: function (state) { return state + 1; },
  DECREMENT: function (state) { return state - 1; }
}, 0);

// update the counter each second
setInterval(function () {
  counter({ type: 'INCREMENT' });
}, 1000);

// render at 60 fps
setInterval(function () {
  document.body.innerHTML = counter();
}, 1000 / 60);
```

`store(actions, initialState)` gets a list of actions (reducers) to manipulate
the state and an initial value (`0` in the example)

Install
-------

    npm install fray.store

Core concepts
-------------

### store

Lazy stores

```js
var store = function (reducer) {
  var state;

  return function (action) {
    state = reducer(state, action);
    return state;
  };
};
```

`strore(reducer)` gets a reducer function just like redux `createStore()` and
returns a single function wich acts as both `store.dispatch()` and
`store.getValue()` from redux stores

`store.subscribe()` can be replaced by a `requestAnimationFrame()` scheduled
call to the function returned by `store()`

### dispatcher

Define actions as functions

```js
var identity = function (value) {
  return value;
};

var dispatcher = function (actions) {
  return function (state, action) {
    return (actions[action.type] || identity)(state, action);
  };
};

var counter = dispatcher({
  INCREMENT: function (state) { return state + 1; },
  DECREMENT: function (state) { return state - 1; }
});
```
