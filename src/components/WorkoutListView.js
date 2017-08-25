/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   08-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity, Text} from 'react-native'
import {StyleSheet} from 'react-native'
import {List, ListItem} from 'react-native-elements'

class WorkoutListView extends React.Component {

  static propTypes = {
    lastWorkoutId: PropTypes.string,
    workouts: PropTypes.object.isRequired,
    loadCb: PropTypes.func.isRequired,
    theme: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      list: '',
    }
  }
  componentWillMount() {
    this.setState({'list': this.buildList()})
  }

  loadWorkout = (id) => {
    this.props.loadCb(id)
  }

  buildList = () => {
    const {workouts, lastWorkoutId, theme} = this.props

    var arr = []
    workouts.mapKeys((id) => {
      if (id !== lastWorkoutId) {
        arr.push(
          <ListItem key={id}
              onPress={() => this.loadWorkout(id)}
              title={workouts.getIn([id,'name'])}
              // style={styles.details}
            />
        )
      }
    })
    console.log('workout list created of len ' + arr.length)

    return arr
  }

  render() {
    //const background = this.props.theme === 'dark' ? styles.dark : styles.light
    const v = this.state.list
      ? (<View><List>
          {this.state.list}
        </List></View>)
      : null
    return v
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  la_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  details: {
    backgroundColor: '#878787',
    // fontSize: 32,
    // textAlign: 'center'
  },
  buttons: {
    backgroundColor: '#2222df',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 2,
    flex: 1,
  },
  txt: {
    color: 'white',
  },
  detailsSm: {
    color: '#878787',
    fontSize: 16,
    textAlign: 'center'
  },
})

export default WorkoutListView
