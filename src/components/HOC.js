import React, { Component } from 'react'
import IdleTimer from 'react-idle-timer'
 
export default class HOC extends Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
  }
 
  render() {
    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 *2}>
 
        <h5>Time out modal goes here</h5>
 
      </IdleTimer>
    )
  }
 
  _onActive(e) {
    console.log('user is active', e)
    console.log('time remaining', this.idleTimer.getRemainingTime())
  }
 
  _onIdle(e) {
    console.log('user is idle', e)
    console.log('last active', this.idleTimer.getLastActiveTime())
  }
}