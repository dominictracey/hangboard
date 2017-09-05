import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PlayButton from '../../components/PlayButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import SoundPlayer from '../../components/SoundPlayer'
import Heartbeat from '../../components/Heartbeat'

class TimerView extends Component {
  static displayName = 'TimerView';

  static propTypes = {
    seconds: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    nextSound: PropTypes.string.isRequired,
    timerStateActions: PropTypes.shape({
      resume: PropTypes.func.isRequired,
      pause: PropTypes.func.isRequired,
      tick: PropTypes.func.isRequired,
      setTime: PropTypes.func.isRequired,
      restart: PropTypes.func.isRequired,
      skip: PropTypes.func.isRequired,
    }).isRequired,
    workoutStateActions: PropTypes.shape({
      nextSet: PropTypes.func.isRequired,
      prevSet: PropTypes.func.isRequired,
    }).isRequired,
  }

  restart = () => {
    this.props.workoutStateActions.prevSet()
  }

  resume = () => {
    this.props.timerStateActions.resume();
  };

  pause = () => {
    this.props.timerStateActions.pause();
  };

  finish = () => {
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

  render() {
    const {loading, running, color, seconds, nextSound,
            timerStateActions: {tick}, workoutStateActions: {tock}} = this.props

    const loadingStyle = loading
      ? {backgroundColor: '#eee'}
      : null;
    const playButtonCallback = running ? this.pause : this.resume

    return (
      <View style={[styles.container, this.getColorStyle(running, color)]}>
        <Heartbeat tick={tick}/>
        <SoundPlayer seconds={seconds} nextSound={nextSound} tock={tock}/>
        <View style={styles.row}>
          <Text style={styles.timer}>
            {seconds}
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

          <PlayButton running={running} callback={playButtonCallback}/>

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
  timerButton: {
    ...circle,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
