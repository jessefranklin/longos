import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'
import { connect } from "react-redux";


class HOC extends Component {
  constructor (props) {
    super(props)
    this.idleTimer = null
    this.state = {
      timeout: this.props.settings ? this.props.settings.timeOut : 30000,
      remaining: null,
      isIdle: false,
      lastActive: null,
      elapsed: null
    }
    // Bind event handlers and methods
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
    this.reset = this._reset.bind(this)
    this.changeTimeout = this._changeTimeout.bind(this)
  }

  componentDidMount () {
    this.setState({
      remaining: this.idleTimer.getRemainingTime(),
      lastActive: this.idleTimer.getLastActiveTime(),
      elapsed: this.idleTimer.getElapsedTime()
    })

    setInterval(() => {
      this.setState({
        remaining: this.idleTimer.getRemainingTime(),
        lastActive: this.idleTimer.getLastActiveTime(),
        elapsed: this.idleTimer.getElapsedTime()
      })
    }, 1000)
  }

  render () {
      return (
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          onActive={this.onActive}
          onIdle={this.onIdle}
          timeout={this.state.timeout}
          startOnLoad>
          <div>
            <div>
              <h4>Timeout: {this.state.timeout}ms</h4>
              <h4>Time Remaining: {this.state.remaining}</h4>
            </div>
          </div>
        </IdleTimer>
      )
  }

  _onActive () {
    this.setState({ isIdle: false })
  }

  _onIdle () {
    this.setState({ isIdle: true })
  }

  _changeTimeout () {
    this.setState({
      timeout: this.refs.timeoutInput.state.value()
    })
  }

  _reset () {
    this.idleTimer.reset()
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(HOC);
