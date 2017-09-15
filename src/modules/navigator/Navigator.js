import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

// tabs
import WorkoutViewContainer from '../workout/WorkoutViewContainer';
import StartViewContainer from '../startView/StartViewContainer'
import SettingsViewContainer from '../settings/SettingsViewContainer'
import HistoryViewContainer from '../history/HistoryViewContainer'

// stacks
import ImageView from '../imageView/ImageView'
import SetResultViewContainer from '../setResult/SetResultViewContainer'
import HistoryDetail from '../history/HistoryDetail'

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Home: {screen: StartViewContainer},
  Hang: {screen: WorkoutViewContainer},
  History: {screen: HistoryViewContainer},
  Config: {screen: SettingsViewContainer},

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
  SetResult: {screen: SetResultViewContainer},
  Image: {screen: ImageView},
  HistoryDetail: {screen: HistoryDetail},
});

export default AppNavigator;
