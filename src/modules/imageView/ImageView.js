import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Image, Icon} from 'react-native'

class ImageView extends Component {
  static displayName = 'ImageView';
  static propTypes = {
    //url: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired
  }

  static navigationOptions =
  ({navigation}) => ({
    tabBarKey: navigation.state,
    tabBarlabel: 'Colors!',
    tabBarIcon: (props) => (<Icon name='color-lens' size={24} color={props.tintColor} />
   ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd'
    }
  });

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{flex: 1, height: undefined, width: undefined}}
          source={require('../../data/boards/1/board.png')}
          resizeMode='contain'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
  }
});

export default ImageView
