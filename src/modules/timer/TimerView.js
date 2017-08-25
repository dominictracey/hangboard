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
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tock from 'tocktimer'
import moment from 'moment'
import Sound from 'react-native-sound'
import {K} from '../../utils/constants'

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
      nextSet: PropTypes.func.isRequired,
      prevSet: PropTypes.func.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
    ticksFor: PropTypes.object.isRequired,
    beepsFor: PropTypes.object.isRequired,
    phase: PropTypes.string.isRequired,
    nextSound: PropTypes.string.isRequired,
  }

  componentDidMount() {
    // load click sound
    this.tickSound = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the tick sound', error);
        return;
      }
    });

    this.beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the beep sound', error);
        return;
      }
    });

    this.silenceSound = new Sound('silence.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the silence sound', error);
        return;
      }
    });

    Sound.setCategory('Playback')
    this.lastSound = moment()
    this.nowSound = moment()

    if (!TimerView.heartbeatRunning) {
      this.heartbeat() // start metronome
      TimerView.heartbeatRunning = true
    }
  }

  componentWillUnmount() {
    this.tickSound.release()
    this.beepSound.release()
  }

  // heartbeat
  heartbeat = () => {
    // setTimeout(() => {
    //   this.heartbeat()
    //   this.props.timerStateActions.tick()
    // }, 1000)
    var timer = new Tock({
      countdown: false,
      interval: 1000,
      callback: this.interval,
      // complete: someCompleteFunction
    });
    timer.start()
  }

  interval = () => {
    if (this.props.running) {
      this.playSound(this.props.nextSound)
    }
  }

  restart = () => {
    //this.props.workoutStateActions.reset()
    this.props.workoutStateActions.prevSet()
  }

  resume = () => {
    this.props.timerStateActions.resume();
  };

  pause = () => {
    this.props.timerStateActions.pause();
  };

  finish = () => {
    this.props.timerStateActions.setTime(1)
    // this.props.workoutStateActions.complete()
    this.props.workoutStateActions.nextSet()
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

  playSound(sound) {
    var soundFile
    if (sound === K.BEEPS) {
      soundFile = this.beepSound
    } else if (sound === K.TICKS) {
      soundFile = this.tickSound
    } else {
      soundFile = this.silenceSound
    }
    const secs = this.props.seconds // get right closure
    this.nowSound = moment()
    soundFile.play((success) => {
      if (success) {
        var diff = this.nowSound.diff(this.lastSound)
        console.log(sound + ' @ ' + this.nowSound.format('mm:ss:SSS') + ' last is' + this.lastSound.format('mm:ss:SSS') + ' diff is ' + diff);
        if (diff > 1025 || diff < 975) {
          console.log('SKEW TOO GREAT!!! ' + diff)
        }
        this.lastSound = this.nowSound

        // once the sound has been played, update the display
        this.props.timerStateActions.tick(secs)
      } else {
        console.log('playback failed due to audio decoding errors for ' + sound)
        // try to reload sound
        this.beepSound.release()
        this.beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the beep sound', error);
            return;
          }
        });
      }
    })
  }

  render() {
    const {loadingStyle, running, color, ticksFor, beepsFor, phase} = this.props
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
