/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   18-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import WorkoutViewContainer from '../workout/WorkoutViewContainer';
//import ColorViewContainer from '../colors/ColorViewContainer';
import SetResultViewContainer from '../setResult/SetResultViewContainer';
import StartViewContainer from '../startView/StartViewContainer'

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Home: {screen: StartViewContainer},
  Workout: {screen: WorkoutViewContainer},
  //Color: {screen: ColorViewContainer},
  // Counter: {screen: CounterViewContainer},
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Hangboard',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: headerColor
  }
}

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: {
      header: null,
    }
  },
  //InfiniteColorStack: {screen: ColorViewContainer},
  Start: {screen: StartViewContainer},
  SetResult: {screen: SetResultViewContainer},
  Workout: {screen: WorkoutViewContainer},
});

export default AppNavigator;
