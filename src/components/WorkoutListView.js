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

import React, {PropTypes} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {StyleSheet} from 'react-native';

class WorkoutListView extends React.Component {

  static propTypes = {
    lastWorkoutId: PropTypes.string,
    workouts: PropTypes.object.isRequired,
    loadCb: PropTypes.func.isRequired,
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
    const {workouts, lastWorkoutId} = this.props

    var arr = []
    workouts.mapKeys((id) => {
      if (id !== lastWorkoutId) {
        arr.push(
          <TouchableOpacity
            key={id}
            accessible={true}
            accessibilityLabel={'Load Workout ' + workouts.getIn([id,'name'])}
            onPress={() => this.loadWorkout(id)}>
              <Text style={styles.detailsSm} key={id}>{workouts.getIn([id,'name'])}</Text>
          </TouchableOpacity>
        )
      }
    })
    console.log('workout list created of len ' + arr.length)

    return arr
  }

  render() {
    const v = this.state.list
      ? (<View style={styles.container}>
          {this.state.list}
        </View>)
      : null
    return v
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  la_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  details: {
    color: '#878787',
    fontSize: 32,
    textAlign: 'center'
  },
  detailsSm: {
    color: '#878787',
    fontSize: 16,
    textAlign: 'center'
  },
})

export default WorkoutListView
