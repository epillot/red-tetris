import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/app'
import store from './store'
import {alert} from './actions/alert'

addEventListener('keydown', ({keyCode}) => console.log(keyCode))

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
