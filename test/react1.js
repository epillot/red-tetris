import chai from "chai"
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15.4'
import chaiEnzyme from 'chai-enzyme'

import Block from '../src/client/components/block'

chai.should()
chai.use(chaiEnzyme()) // Note the invocation at the end

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore()

describe('Fake react test', function(){

  // it('SHOULD RENDER BLOCK', function(){
  //   const renderer = createRenderer()
  //   renderer.render(React.createElement(block, {blockClass: "test", style: {}}))
  //   const output = renderer.getRenderOutput()
  //   output.should.equalJSX(<div
  //       className="block test"
  //       style={{}}
  //     />)
  // })



  it('Get a single class \'block\' when the tetris state is undefined', () => {
    const store = mockStore({})
    // const renderer = createRenderer()
    // renderer.render(React.createElement(ConnectedBlock))
    const output = render(<Block store={store}/>)
    output.should.have.html('<div class="block"></div>')
  })

  it('Get the class corresponding int the tetris state', function(){
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
