import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'
import * as f from '../tools'
import animations from './animations'
import connecting from './connecting'
import game from './game'
import piece from './piece'
import playersGhosts from './playersGhosts'
import room from './room'
import roomUsers from './roomUsers'
import tetris from './tetris'
import ui from './ui'

export default combineReducers({
  getStyle: animations,
  connecting,
  game,
  piece,
  playersGhosts,
  room,
  roomUsers,
  tetris,
  ui,
})
