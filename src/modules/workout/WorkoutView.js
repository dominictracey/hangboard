import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import TimerViewContainer from '../timer/TimerViewContainer';

class WorkoutView extends Component {
  static displayName = 'WorkoutView';

  static navigationOptions = {
    title: 'Workout',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
    })
  }

  static propTypes = {
    session: PropTypes.object.isRequired,
    workoutStateActions: PropTypes.shape({
      load: PropTypes.func.isRequired,
      start: PropTypes.func.isRequired,
      complete: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.load();
  }

  load = () => {
    this.props.workoutStateActions.load();
  };

  start = () => {
    this.props.workoutStateActions.start();
  };

  complete = () => {
    this.props.workoutStateActions.complete();
  };

  reset = () => {
    this.props.workoutStateActions.reset();
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
        <Text style={styles.phase}>
          {this.props.session.get('currentPhase')}
        </Text>
        <TimerViewContainer/>
        <TouchableOpacity
            accessible={true}
            accessibilityLabel={'Reset timer'}
            onPress={this.reset}>
          <Text style={styles.linkButton}>
            Reset
          </Text>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View style={styles.container}>
            <Text style={styles.details}>Grip</Text>
            <Text style={styles.details}>{this.props.session.get('grip')}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.details}>Set</Text>
            <Text style={styles.details}> {this.props.session.get('setLabel')}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.details}>Rep</Text>
            <Text style={styles.details}>{this.props.session.get('currentRep')}</Text>
          </View>
        </View>
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
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  workoutButton: {
    ...circle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  workout: {
    color: '#dfdfdf',
    fontSize: 80,
    textAlign: 'center'
  },
  phase: {
    color: '#ababab',
    fontSize: 40,
    textAlign: 'center'
  },
  grip: {
    color: '#ababab',
    fontSize: 40,
    textAlign: 'center'
  },
  details: {
    color: '#878787',
    fontSize: 40,
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

export default WorkoutView;
