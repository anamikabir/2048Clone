require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"2048":[function(require,module,exports){
/*
 * boards look like:
 * [
 *   [#, #, #, #],
 *   [#, #, #, #],
 *   [#, #, #, #],
 *   [#, #, #, #]
 * ]
 */

var ROTATIONS = {
  left: 0,
  down: 1,
  right: 2,
  up: 3
};

function rotate (board, times) {
  var step = [[], [], [], []],
      row, col;

  if (times === 0) {
    for (row = 0; row < 4; row++) {
      for (col = 0; col < 4; col++) {
        step[row][col] = board[row][col];
      }
    }

    return step;
  }

  // 0  => 0
  // -1 => 3
  // -2 => 2
  // -3 => 1
  // 4  => 0
  if (times < 0) {
    times = (times % 4) + 4;
  }

  for (row = 0; row < 4; row++) {
    for (col = 0; col < 4; col++) {
      // 0, 0 => 0, 3
      // 0, 1 => 1, 3
      // 0, 2 => 2, 3
      // 0, 3 => 3, 3
      // 1, 0 => 0, 2
      // 1, 1 => 1, 2
      // 1, 2 => 2, 2
      // 1, 3 => 3, 2
      // 2, 0 => 0, 1
      // ...
      step[col][3 - row] = board[row][col];
    }
  }

  return rotate(step, times - 1);
}

function combine (row) {
  var combined = [],
      di = 0,
      si = 0;

  while (di < 4 && si < 4) {
    var value = row[si];

    if (value === 0) {
      si++;
    } else {
      var ni = si + 1;

      while (ni < 3 && row[ni] === 0) {
        ni++;
      }

      if (row[ni] === value) {
        combined[di] = value * 2;
        di++;
        si = ni + 1;
      } else {
        combined[di] = value;
        di++;
        si = ni;
      }
    }
  }

  while (di < 4) {
    combined[di] = 0;
    di++;
  }

  return combined;
}

function slide (board, direction) {
  var rotations = ROTATIONS[direction],
      slider = rotate(board, rotations);

  // slide stuff...
  for (var row = 0; row < 4; row++) {
    slider[row] = combine(slider[row]);
  }

  return rotations === 0 ? slider : rotate(slider, -rotations);
}

function create () {

  // TODO random-ize this
  return [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 4, 0]
  ];
}

module.exports = {
  combine: combine,
  rotate: rotate,
  slide: slide,
  create: create
};

},{}]},{},[]);
