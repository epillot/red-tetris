import chai from "chai"
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15.4'
import chaiEnzyme from 'chai-enzyme'

import Block from '../src/client/components/block'
import Board from '../src/client/components/board'
import PlayerGhost from '../src/client/components/playerGhost'


chai.should()
chai.use(chaiEnzyme())

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe('React components test', () => {

  describe('Block', () => {
    it('Get a single class \'block\' when the tetris state is undefined', () => {
      const store = mockStore({})
      const output = render(<Block store={store}/>)
      output.should.have.html('<div class="block"></div>')
    })

    it('Get the class corresponding int the tetris state', () => {
      const tetris = [
        ['', '', ''],
        ['', '', ''],
        ['', 'red', ''],
      ]
      const store = mockStore({tetris, getStyle: []})

      const output = render(<Block store={store} x={1} y={2}/>)
      output.should.have.className('block')
      output.should.have.className('red')
      output.should.have.className('colored')
    })
  })

  describe('Board', () => {
    it('Render board', () => {
      const connecting = {
        playerID: '1234'
      }
      const roomUsers = [
        {
          id: '1234',
        }
      ]
      const store = mockStore({connecting, roomUsers, game: {}})
      const output = render(<Board store={store}/>)
      output.should.have.className('boardWrapper')
      output.find('.board-container').should.be.present()
      output.find('.board').should.be.present()
    })
  })

  describe('PlayerGhost', () => {

    it('Render playrGhost', () => {
      const connecting = {
        playerID: '1234'
      }
      const roomUsers = [
        {
          id: '1234',
        },
      ]
      const store = mockStore({connecting, roomUsers})
      const output = render(<PlayerGhost store={store} num={0}/>)
      output.should.have.className('ghostWrapper')
      output.find('.ghostPlayerName').should.be.present()
      output.find('.ghostContainer').should.have.className('waitingGhost')
      output.find('.boardGhost').should.be.present()
    })
  })

})
