import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { connect } from "react-redux";
import en from '../../const/en-lang';
import PropTypes from "prop-types";
import moment from 'moment';
import IdleTimer from './IdleTimer';

let interval;

class Idle extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.idleTimer = null
    this.state = {
      timeoutActive: true,
      timeout: this.props.settings ? this.props.settings.timeOut : 120000,
      remaining: null,
      isIdle: false,
      lastActive: null,
      elapsed: null,
      showTimeout: false
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
    if(this.state.timeoutActive){
      interval =  setInterval(() => {
        if(this.idleTimer.getRemainingTime() <= 1000){
          this.onCancelOrder();
        }
        this.setState({
          remaining: this.idleTimer.getRemainingTime(),
          lastActive: this.idleTimer.getLastActiveTime(),
          elapsed: this.idleTimer.getElapsedTime(),
          showTimeout: this.idleTimer.getRemainingTime() < 58000 ? true : false
        })
      }, 1000)
    }
  }
  componentWillUnmount(){
    this.idleTimer = null;
    clearInterval(interval);
  }
  onCancelOrder(){
    // this.context.router.history.push('/');
  }
  render () {
      return (
        <div>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={this.state.timeout}
            startOnLoad>
            <div>
              <Modal show={this.state.showTimeout}>
                <div className="modal--cancel">
                  <h3>{en.notifications.timeout.title}</h3>
                  <h4>Your current order will be cancelled in <span className="red"> {moment.duration(this.state.remaining).seconds()}</span> sec</h4>
                  <div className="modal--buttons">
                    <button>Resume Order</button>
                    <button onClick={this.onCancelOrder} className="btn-cancel">Cancel Order</button>
                  </div>
                </div>
              </Modal>

            </div>
          </IdleTimer>
        </div>
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
      // timeout: this.refs.timeoutInput.state.value()
    })
  }

  _reset () {
    this.idleTimer.reset()
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Idle);
