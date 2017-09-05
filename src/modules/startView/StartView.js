/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   06-08-2017
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
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';
import WorkoutListView from '../../components/WorkoutListView'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {K} from '../../utils/constants'
import AppText from '../../components/AppText'

/**
 * Home page, such as it is.
 */
class StartView extends Component {
  static displayName = 'StartView';

  static navigationOptions =
    ({navigation}) => ({
      tabBarKey: navigation.state,
      tabBarlabel: 'Home',
      tabBarIcon: (props) => (<Icon name='home' size={24} />
     ),
      headerTintStart: 'white',
      headerStyle: {
        backgroundStart: '#39babd'
      }
    });

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired,
    theme: PropTypes.string,
    workoutStateActions: PropTypes.shape({
      load: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);
  }

  load = (workoutId) => {
    this.props.workoutStateActions.load(workoutId);
    this.props.navigate({routeName: 'Hang'})
  };

  loadDefault = () => {
    this.load(this.props.session.get('lastWorkoutId'))
    this.props.navigate({routeName: 'Hang'})
  }

  render() {
    const {workouts,session, theme} = this.props;
    const loadingStyle = session.get('loading')
          ? {backgroundColor: '#eee'}
          : null;
    const background = theme === 'dark' ? styles.dark : styles.light
    return (
        <View style={styles.top}>
        <View style={[styles.container, background]}>

        <TouchableOpacity
          style={[styles.defaultStartButton, loadingStyle]}
            accessible={true}
            accessibilityLabel={'Start Workout'}
            onPress={this.loadDefault}>
            <AppText size='lg' theme='dark' flex='0'>
              Start Workout
            </AppText>
        </TouchableOpacity>
        <AppText
          size='sm'
          theme={this.theme}>{workouts.getIn([session.get('lastWorkoutId'),'name'])}</AppText>
        <AppText
          size='sm' theme={this.theme}>or pick a different workout:</AppText>
        </View>
        <WorkoutListView workouts={workouts}
                          lastWorkoutId={session.get(K.LAST_WORKOUT_ID)}
                          loadCb={this.load}
                          theme={theme}/>
      </View>
    )
  }
}

const bigCircle = {
  borderWidth: 0,
  borderRadius: 100,
  width: 200,
  height: 200
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  dark: {
    backgroundColor: '#212121',
  },
  light: {
    backgroundColor: 'white',
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
  defaultStartButton: {
    ...bigCircle,
    backgroundColor: '#349d4a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowRadius: 5,
    shadowColor: '#888888',
    margin: 20
  },
  startWorkout: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  workout: {
    color: '#dfdfdf',
    fontSize: 50,
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
    fontSize: 32,
    textAlign: 'center'
  },
  details2: {
    color: '#878787',
    fontSize: 20,
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

export default StartView;
