import React from 'react'
import PropTypes from 'prop-types'
import Tock from 'tocktimer'

class Heartbeat extends React.Component {
  static displayName = 'Heartbeat'
  static heartbeatRunning = false

  componentDidMount() {
    if (!Heartbeat.heartbeatRunning) {
      this.heartbeat() // start metronome
      Heartbeat.heartbeatRunning = true
    }
  }

  heartbeat = () => {
    const {tick} = this.props
    var timer = new Tock({
      countdown: false,
      interval: 1000,
      callback: tick,
    });
    timer.start()
  }

  render() {return null}
}

Heartbeat.propTypes = {
  tick: PropTypes.func.isRequired,
}

export default Heartbeat
