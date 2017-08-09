import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
// import {connect} from 'react-redux'
import {StyleSheet} from 'react-native';

class RepsComplete extends Component {

  static propTypes = {
    reps: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired,
    cb: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {done: -1};
  }

  // markDone = (i) => {
  //   cb(i)
  // }
  render() {
    const {reps} = this.props

    let buttonArr = []
    for (let i = 1; i <= reps; ++i) {
      // buttonArr.push(<Button title={i.toString()}
      //                         style={styles.button}
      //                         color={i < this.state.done ? 'green' : 'red'}
      //                         onPress={() => this.markDone(i)} key={i}/>)
      buttonArr.push(<TouchableOpacity
          accessible={true}
          accessibilityLabel={i + ' reps complete'}
          onPress={() => this.props.cb(i)}
          style={[styles.toButton, i <= this.props.complete ? styles.success : styles.fail]}
          key={i}>
        <Text style={styles.buttonLabel}>
          {i}
        </Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.details}>Last Successful Rep</Text>
        </View>
        <View style={styles.row}>
          {buttonArr.map((button) => button)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'green',
  },
  details: {
    flex: 1,
    color: '#878787',
    fontSize: 32,
    textAlign: 'center'
  },
  success: {
    flex: 1,
    backgroundColor: 'green',
    padding: 5
  },
  fail: {
    flex: 1,
    backgroundColor: 'red',
    padding: 5
  },
  toButton: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    alignSelf: 'stretch',
  },
  buttonLabel: {
    fontSize: 20,
    color: 'white',
  }
})

export default RepsComplete
