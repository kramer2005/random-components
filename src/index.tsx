import React from 'react'
import ReactDOM from 'react-dom'
// import IshikawaDiagram from './components/IshikawaDiagram/IshikawaDiagram'
import './index.css'
import reportWebVitals from './reportWebVitals'
import WebGL from './components/WebGL'

ReactDOM.render(<WebGL />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
