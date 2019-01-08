'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actionTypes = require('../constants/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _tools = require('../tools');

var f = _interopRequireWildcard(_tools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var copyState = function copyState(state, newState) {
  return Object.assign({}, state, newState);
};

var defaultAnimationState = {
  getStyle: false
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {

    // case types.START_GAME:
    //   return copyState(state, {tetris: newTetris()})

    case types.CREATE_ROOM:
      return copyState(state, { room: null });

    case types.EDIT_NAME:
      return copyState(state, { nickname: action.value.trim().substr(0, 15).trim() });

    case types.NEW_PIECE:
      return copyState(state, _extends({}, action.piece, {
        interval: action.interval
      }));

    case types.MOVE_PIECE:
      return copyState(state, {
        coords: action.coords,
        rotate: action.rotate !== null ? action.rotate : state.rotate
      });

    case types.UPDATE_TETRIS:
      return copyState(state, _extends({
        tetris: action.tetris,
        coords: null
      }, defaultAnimationState));

    case types.ANIMATION_STEP:
      return copyState(state, {
        getStyle: action.getStyle
      });

    case types.ANIMATION_OVER:
      return copyState(state, {
        getStyle: false
      });

    case 'ROOM_CREATED':
      return copyState(state, {
        room: action.id
      });

    case 'NICKNAME_ERROR':
      return copyState(state, {
        nicknameError: 'Please enter a nickname'
      });

    default:
      return state;
  }
};

exports.default = reducer;