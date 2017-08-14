/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   19-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

/*eslint-disable no-unused-vars*/
import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TimerView extends Component {
  static displayName = 'TimerView';
  static heartbeatRunning = false

  static propTypes = {
    seconds: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    timerStateActions: PropTypes.shape({
      resume: PropTypes.func.isRequired,
      pause: PropTypes.func.isRequired,
      tick: PropTypes.func.isRequired,
      setTime: PropTypes.func.isRequired,
      done: PropTypes.func.isRequired,
      restart: PropTypes.func.isRequired,
      skip: PropTypes.func.isRequired,
    }).isRequired,
    workoutStateActions: PropTypes.shape({
      reset: PropTypes.func.isRequired,
      complete: PropTypes.func.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!TimerView.heartbeatRunning) {
      this.heartbeat() // start metronome
      TimerView.heartbeatRunning = true
    }
  }

  // heartbeat
  heartbeat = () => {
    setTimeout(() => {
      this.heartbeat()
      this.props.timerStateActions.tick()
    }, 1000)
  }

  restart = () => {
    this.props.workoutStateActions.reset()
  }

  resume = () => {
    this.props.timerStateActions.resume();
  };

  pause = () => {
    this.props.timerStateActions.pause();
  };

  finish = () => {
    this.props.timerStateActions.setTime(1)
    this.props.workoutStateActions.complete()
  }

  rewind = () => {
    this.props.timerStateActions.restart()
  }

  skip = () => {
    this.props.timerStateActions.skip()
  }

  getColorStyle = (running, color) => {
    switch (color) {
      case 'red':
        return styles.red
      case 'green':
        return styles.green
      case 'orange':
        return styles.orange
      case 'blue':
        return styles.blue
      case 'purple':
        return styles.purple
      default:
        return null
    }
  }

  render() {
    const {loadingStyle, running, color} = this.props
      // ? {backgroundColor: '#eee'}
      // : null;

    return (
      <View style={[styles.container, this.getColorStyle(running, color)]}>
        <View style={styles.row}>
          <Text style={styles.timer}>
            {this.props.seconds}
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Reset'}
            onPress={this.restart}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='fast-rewind' size={32} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Rewind'}
            onPress={this.rewind}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='skip-previous' size={32} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Start timer'}
            onPress={this.resume}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='play-circle-outline' size={32} color='black'/>
          </TouchableOpacity>

          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Stop timer'}
            onPress={this.pause}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='pause-circle-outline' size={32} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Skip'}
            onPress={this.skip}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='skip-next' size={32} color='black'/>
          </TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Finish'}
            onPress={this.finish}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='fast-forward' size={32} color='black'/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 30,
  width: 60,
  height: 60
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerButton: {
    ...circle,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    flex: 1,
    color: '#ffffff',
    fontSize: 60,
    textAlign: 'center',
    paddingBottom: 15,
  },
  red: {
    backgroundColor: '#f82d3b'
  },
  green: {
    backgroundColor: '#35d22c'
  },
  orange: {
    backgroundColor: '#fdb63a'
  },
  blue: {
    backgroundColor: '#1f37d0',
  },
  purple: {
    backgroundColor: '#5c2bd0',
  },
});

export default TimerView;
