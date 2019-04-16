import chai from "chai"
import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-dom/test-utils'

import {block} from '../src/client/components/block'

chai.should()
chai.use(equalJSX)

describe('Fake react test', function(){

  it('SHOULD RENDER BLOCK', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(block, {blockClass: "test", style: {}}))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(<div
        className="block test"
        style={{}}
      />)
  })

})
