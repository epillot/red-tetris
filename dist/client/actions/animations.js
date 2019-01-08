'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateAnimation = exports.spaceAnimation = exports.lineAnimation = exports.pieceAnimation = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _actionTypes = require('../constants/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _ = require('.');

var _tools = require('../tools');

var f = _interopRequireWildcard(_tools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// export const testAnim = store => {
//   let currentCoords
//   return store.subscribe(() => {
//     let prevCoords = currentCoords
//     currentCoords = store.getState().coords
//     if (!currentCoords || currentCoords === prevCoords) return;
//     if (!f.isPossible(store.getState().tetris, currentCoords.map(([x, y]) => [x, y+1])) ) {
//       store.dispatch(pieceAnimation(currentCoords))
//     }
//     //console.log('coucou');
//   })
// }

var getPieceAnimationStyle = function getPieceAnimationStyle(coords, opacity) {
  return function (x, y) {
    if (coords.filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          x1 = _ref2[0],
          y1 = _ref2[1];

      return x == x1 && y == y1;
    }).length) return { opacity: opacity };
    return {};
  };
};

var pieceAnimation = exports.pieceAnimation = function pieceAnimation(coords) {
  return function (dispatch, getState) {
    return new Promise(function (resolve) {
      if (!coords) return resolve();
      var opacity = 1;
      var step = -0.05;
      var loop = function loop() {
        if (opacity <= 0.5) step = -step;
        opacity += step;
        if (opacity <= 1) {
          dispatch(animationStep(getPieceAnimationStyle(coords, opacity)));
          requestAnimationFrame(loop);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(loop);
    });
  };
};

var getLineAnimationStyle = function getLineAnimationStyle(lines, opacity, b) {
  return function (x, y) {
    if (lines.indexOf(y) !== -1) return { opacity: opacity, filter: 'brightness(' + b + '%)' };
    return {};
  };
};

var lineAnimation = exports.lineAnimation = function lineAnimation(lines) {
  return function (dispatch, getState) {
    return new Promise(function (resolve) {
      if (!lines.length) return resolve();
      var opacity = 1;
      var nb = 1 / 0.05;
      var b = 90;
      var bi = 90 / nb;
      var loop = function loop() {
        opacity -= 0.05;
        b -= bi;
        if (opacity >= 0) {
          dispatch(animationStep(getLineAnimationStyle(lines, opacity, b)));
          requestAnimationFrame(loop);
        } else {
          //dispatch(animationOver())
          resolve();
        }
      };
      requestAnimationFrame(loop);
    });
  };
};

var spaceAnimation = exports.spaceAnimation = function spaceAnimation(coords, dest) {
  return function (dispatch, getState) {
    return new Promise(function (resolve) {
      var diff = dest[0][1] - coords[0][1];
      var yi = 0;
      var loop = function loop() {
        yi += 2;
        if (yi === diff + 1) yi = diff;
        var newCoords = coords.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              x = _ref4[0],
              y = _ref4[1];

          return [x, y + yi];
        });
        if (yi <= diff) {
          dispatch((0, _.movePiece)(newCoords));
          requestAnimationFrame(loop);
        } else resolve();
      };
      requestAnimationFrame(loop);
    });
  };
};

var getTranslateAnimationStyle = function getTranslateAnimationStyle(data, yi) {
  return function (x, y) {
    var translateY = data[y];
    if (translateY >= yi) translateY = yi;
    return { transform: 'translate(0px, ' + translateY + 'px)' };
  };
};

var getTranslationData = function getTranslationData(tetris, lines) {
  var data = [];

  var _loop = function _loop(y) {
    var ydiff = 0;
    lines.forEach(function (line) {
      if (y < line) ydiff++;
    });
    data.push(ydiff * 40);
  };

  for (var y = 0; y < 20; y++) {
    _loop(y);
  }
  return data;
};

var translateAnimation = exports.translateAnimation = function translateAnimation(tetris, lines) {
  return function (dispatch, getState) {
    return new Promise(function (resolve) {
      if (!lines.length) return resolve();
      var yi = 0;
      var data = getTranslationData(tetris, lines);
      var max = Math.max.apply(Math, _toConsumableArray(data));
      var loop = function loop() {
        yi += 25;
        if (yi >= max + 1 && yi < max + 25) yi = max;
        if (yi <= max) {
          dispatch(animationStep(getTranslateAnimationStyle(data, yi)));
          requestAnimationFrame(loop);
        } else {
          //dispatch(animationOver())
          resolve();
        }
      };
      requestAnimationFrame(loop);
    });
  };
};

var animationStep = function animationStep(getStyle) {
  return {
    type: types.ANIMATION_STEP,
    getStyle: getStyle
  };
};

var animationOver = function animationOver() {
  return {
    type: types.ANIMATION_OVER
  };
};