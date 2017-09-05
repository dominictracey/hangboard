import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity} from 'react-native'
import AppText from './AppText'

// import {connect} from 'react-redux'
import {StyleSheet} from 'react-native';

class RepsComplete extends Component {

  static propTypes = {
    reps: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired,
    title: PropTypes.string,
    cb: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {done: -1};
  }

  render() {
    const {reps, title = ''} = this.props

    let buttonArr = []
    for (let i = 1; i <= reps; ++i) {
      buttonArr.push(<TouchableOpacity
          accessible={true}
          accessibilityLabel={i + ' reps complete'}
          onPress={() => this.props.cb(i)}
          style={[styles.toButton, i <= this.props.complete ? styles.success : styles.fail]}
          key={i}>
        <AppText size='sm' theme='dark'>
          {i}
        </AppText>
      </TouchableOpacity>)
    }

    const titleRow = title ? <View style={styles.row}><AppText size='sm'>{title}</AppText></View> : null

    return (
      <View style={styles.container}>
        {titleRow}
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
    borderWidth: 2,
    borderColor: '#dfdfdf',
    paddingBottom: 10,
  },
  row: {
    // height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
