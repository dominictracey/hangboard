import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  View,
  ScrollView,
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
      tabBarIcon: () => (<Icon name='home' size={24} />
     ),
      headerTintStart: 'white',
      headerStyle: {
        backgroundStart: '#39babd'
      }
    })

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
    workouts: PropTypes.object.isRequired,
    theme: PropTypes.string,
    history: PropTypes.object.isRequired,
    workoutStateActions: PropTypes.shape({
      load: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.session.get(K.LAST_WORKOUT_ID) !== this.props.session.get(K.LAST_WORKOUT_ID)) ||
            (this.isGoing(nextProps.history) !== this.isGoing(this.props.history))
  }

  // do we have a workout underway?
  isGoing = history => history.first().get(K.RESULTS) &&
                      history.first().get(K.RESULTS).size > 0

  load = (workoutId) => {
    this.props.workoutStateActions.load(workoutId);
    this.props.navigate({routeName: 'Hang'})
  };

  loadDefault = () => {
    this.load(this.props.session.get('lastWorkoutId'))
    this.props.navigate({routeName: 'Hang'})
  }

  continue = () => {
    this.props.navigate({routeName: 'Hang'})
  }

  render() {
    const {workouts,session, theme, history} = this.props;
    const loadingStyle = session.get('loading')
          ? {backgroundColor: '#eee'}
          : null;
    const background = theme === 'dark' ? styles.dark : styles.light

    // If we already have a session going, the big button should let them continue it,
    //  with a link under it to "Start New Workout".
    // If there is no session going, big button starts one.
    const bigButton = this.isGoing(history)
        ? (<View>
            <TouchableOpacity
              style={[styles.defaultStartButton, loadingStyle]}
              accessible={true}
              accessibilityLabel={'Continue Workout'}
              onPress={this.continue}>
              <AppText size='lg' theme='dark' flex='0'>
                Continue{'\n'}Workout
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.startNewButton}
                accessible={true}
                accessibilityLabel={'Start New Workout'}
                onPress={this.loadDefault}>
                <AppText size='lg' theme='dark' flex='0'>
                  Start New
                </AppText>
            </TouchableOpacity>
          </View>)
        : (<TouchableOpacity
            style={[styles.defaultStartButton, loadingStyle]}
            accessible={true}
            accessibilityLabel={'Start Workout'}
            onPress={this.loadDefault}>
            <AppText size='lg' theme='dark' flex='0'>
              Start{'\n'}Workout
            </AppText>
          </TouchableOpacity>)
    return (
        <ScrollView style={styles.top}>
          <View style={[styles.container, background]}>
            {bigButton}
            <AppText
              size='lg'
              theme={this.theme}>{workouts.getIn([session.get('lastWorkoutId'),'name']) + '\n'}</AppText>

          </View>
          <WorkoutListView workouts={workouts}
                            lastWorkoutId={session.get(K.LAST_WORKOUT_ID)}
                            loadCb={this.load}
                            theme={theme}/>
      </ScrollView>
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
    shadowOpacity: 50,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 30,
    shadowColor: '#888888',
    margin: 20,
  },
  startNewButton: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#007afe',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 5,
    shadowOpacity: 50,
    elevation: .5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
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
