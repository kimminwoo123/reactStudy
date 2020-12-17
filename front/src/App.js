import React, { Component } from "react"
import MyComponent from './MyComponent'
import "./App.css"

class App extends Component {
  render() {
    return  <MyComponent name='React' favoriteNumber={1}>리액트1</MyComponent>
  }
}

export default App