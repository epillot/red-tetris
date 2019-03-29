'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var editName = exports.editName = function editName(value) {
  return {
    type: 'EDIT_NAME',
    value: value
  };
};

var editCode = exports.editCode = function editCode(value) {
  return {
    type: 'EDIT_CODE',
    value: value
  };
};

var nicknameError = exports.nicknameError = function nicknameError() {
  return {
    type: 'NICKNAME_ERROR'
  };
};

var removeError = exports.removeError = function removeError(name) {
  return {
    type: 'REMOVE_ERROR',
    name: name
  };
};