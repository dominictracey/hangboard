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

  static navigationOptions = {
    title: 'Timer',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    seconds: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    running: PropTypes.bool.isRequired,
    timerStateActions: PropTypes.shape({
      resume: PropTypes.func.isRequired,
      pause: PropTypes.func.isRequired,
      tick: PropTypes.func.isRequired,
      done: PropTypes.func.isRequired,
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.heartbeat() // start metronome
  }

  // heartbeat
  heartbeat = () => {
    setTimeout(() => {
      this.props.timerStateActions.tick()
      this.heartbeat()
    }, 1000)
  }

  resume = () => {
    this.props.timerStateActions.resume();
  };

  pause = () => {
    this.props.timerStateActions.pause();
  };
  //
  // renderUserInfo = () => {
  //   if (!this.props.userName) {
  //     return null;
  //   }
  //
  //   return (
  //     <View style={styles.userContainer}>
  //       <Image
  //         style={styles.userProfilePhoto}
  //         source={{
  //           uri: this.props.userProfilePhoto,
  //           width: 80,
  //           height: 80
  //         }}
  //         />
  //       <Text style={styles.linkButton}>
  //         Welcome, {this.props.userName}!
  //       </Text>
  //     </View>
  //   );
  // };

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;

    return (
      <View style={styles.container}>

        {/* {this.renderUserInfo()} */}
        {/* <Text style={styles.exercise}>
          {this.props.phase}
        </Text>
         */}
        <Text style={styles.timer}>
          {this.props.seconds}
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Start timer'}
            onPress={this.resume}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='arrow-forward' size={48} color='green'/>
          </TouchableOpacity>

          <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Stop timer'}
            onPress={this.pause}
            style={[styles.timerButton, loadingStyle]}>
            <Icon name='pause' size={48} color='red' />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Randomize timer'}
            onPress={this.random}>
          <Text style={styles.linkButton}>
            Fucker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.bored} accessible={true}>
          <Text style={styles.linkButton}>
            {'I\'m bored!'}
          </Text>
        </TouchableOpacity> */}

      </View>
    );
  }
}

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  timer: {
    color: '#dfdfdf',
    fontSize: 80,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default TimerView;
