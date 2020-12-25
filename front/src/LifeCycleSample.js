import React, { Component } from 'react'

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  }

  myRef = null // ref를 설정a할 부분

  constructor(props) {
    super(props)
    console.log('constructor')
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // props를 state에 동기화
    console.log('getDerivedStateFromProps')
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color }
    }
    return null
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return nextState.number % 10 !== 4 // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    })
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회
    console.log('getSnapshotBeforeUpdate')
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState)
    if (snapshot) {
      console.log('업데이트되기 직전 색상: ', snapshot)
    }
  }

  render() {
    console.log('render')

    const style = {
      color: this.props.color,
    }

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    )
  }
}

export default LifeCycleSample
