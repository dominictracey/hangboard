import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Image} from 'react-native'
import {boardImages} from '../static/BoardsAll'

// import Icon from 'react-native-vector-icons/MaterialIcons';

class ImageView extends Component {
  static displayName = 'ImageView';
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  // static navigationOptions =
  // ({navigation}) => ({
  //   tabBarKey: navigation.state,
  //   tabBarlabel: 'Colors!',
  //   tabBarIcon: (props) => (<Icon name='color-lens' size={24} color={props.tintColor} />
  //  ),
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: '#39babd'
  //   }
  // });

  render() {
    const {boardId} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Image
          style={{flex: 1, height: undefined, width: undefined}}
          source={boardImages.get(boardId)}
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
