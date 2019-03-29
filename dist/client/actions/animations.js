'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationStep = exports.disparitionLinesAnimation = exports.pieceAnimation = exports.spaceAnimation = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _piece = require('./piece');

var _tools = require('../tools');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var spaceAnimation = exports.spaceAnimation = function spaceAnimation() {
  return {
    isAnimation: true,
    nextAction: function nextAction(getState) {
      var newCoords = getState().piece.coords.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return [x, y + 2];
      });
      if ((0, _tools.isPossible)(getState().tetris, newCoords)) return (0, _piece.movePiece)(newCoords);
    }
  };
};

var getPieceAnimationStyle = function getPieceAnimationStyle(coords, opacity) {
  var output = [];
  coords.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];

    output[x + y * 10] = { opacity: opacity };
  });
  return output;
};

var pieceAnimation = exports.pieceAnimation = function pieceAnimation() {
  var opacity = 1;
  var step = -0.05;
  return {
    isAnimation: true,
    nextAction: function nextAction(getState) {
      if (opacity <= 0.5) step = -step;
      opacity += step;
      if (opacity < 1) return animationStep(getPieceAnimationStyle(getState().piece.coords, opacity));
    }
  };
};

var getLineAnimationStyle = function getLineAnimationStyle(lines, opacity, s) {
  var output = [];
  var r = 360 * s;
  var style = { opacity: opacity, transform: 'rotate(' + r + 'deg) scale(' + s + ')' };
  lines.forEach(function (y) {
    for (var x = 0; x < 10; x++) {
      output[x + y * 10] = style;
    }
  });
  return output;
};

var getTranslateAnimationStyle = function getTranslateAnimationStyle(lines, data, yi) {
  var output = [];
  for (var y = 0; y < 20; y++) {
    var translateY = data[y];
    if (translateY > yi) translateY = yi;
    for (var x = 0; x < 10; x++) {
      output[x + y * 10] = { transform: 'translate(0px, ' + -translateY + 'px)' };
    }
  }
  lines.forEach(function (y) {
    for (var _x = 0; _x < 10; _x++) {
      output[_x + y * 10] = { opacity: 0 };
    }
  });
  return output;
};

var getTranslationData = function getTranslationData(tetris) {
  var data = [];
  var nbLine = 0;
  var ydiff = void 0;
  for (var y = tetris.length - 1; y >= 0; y--) {
    ydiff = 0;
    if ((0, _tools.isComplete)(tetris[y])) nbLine++;else if (!(0, _tools.isEmpty)(tetris[y])) ydiff = nbLine * 40;
    data[y] = ydiff;
  }
  return data;
};

var disparitionLinesAnimation = exports.disparitionLinesAnimation = function disparitionLinesAnimation(lines) {
  return function (dispatch) {
    if (!lines) return Promise.resolve();

    var opacity = 1;
    var step = 0.05;
    var max = void 0;
    var yi = 0;
    var s = 1;
    var si = 1 / (1 / step);

    return dispatch({
      isAnimation: true,
      nextAction: function nextAction(getState) {
        if (opacity > 0) {
          opacity -= step;
          s -= si;
          return animationStep(getLineAnimationStyle((0, _tools.getCompleteLines)(getState().tetris), opacity, s));
        }
        var data = getTranslationData(getState().tetris);
        max = Math.max.apply(Math, _toConsumableArray(data));
        if (yi < max) {
          yi += 6;
          if (yi > max) yi = max;
          return animationStep(getTranslateAnimationStyle((0, _tools.getCompleteLines)(getState().tetris), data, yi));
        }
      }
    });
  };
};

var animationStep = exports.animationStep = function animationStep(getStyle) {
  return {
    type: 'ANIMATION_STEP',
    getStyle: getStyle
  };
};