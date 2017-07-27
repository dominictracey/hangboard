import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import WorkoutViewContainer from '../workout/WorkoutViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
//import CounterViewContainer from '../counter/CounterViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Workout: {screen: WorkoutViewContainer},
  Color: {screen: ColorViewContainer},
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
  title: 'Hangboard Workout',
  header: {
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 0 // disable header elevation when TabNavigator visible
    }
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: MainScreenNavigator},
  InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;
