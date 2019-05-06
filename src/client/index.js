import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import store from './store'

//addEventListener('keydown', ({keyCode}) => console.log(keyCode))

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))
