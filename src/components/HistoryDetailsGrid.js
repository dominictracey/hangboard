import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import HistoryDetailsRow from './HistoryDetailsRow'

class HistoryDetailsGrid extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
    }
  }
  componentWillMount() {
    this.setState({rows: this.buildList()})
  }

  buildList = () => {
    const {history: {results}} = this.props
    return Object.keys(results).reduce((acc,exerciseKey,i) => {
      const exercise = results[exerciseKey]
      let setsForExercise = Object.keys(exercise.sets).reduce((rows,setKey,j) => {
        const set = exercise.sets[setKey]
        rows.push(<HistoryDetailsRow
                  key={i + '.' + j}
                  grip={exercise.gripLabel}
                  set={set.setLabel}
                  weight={set.weight}
                  reps={set.reps}
                  lastSuccess={set.lastSuccess}/>)
        return rows
      },[])
      acc.push(...setsForExercise)
      return acc
    },[])
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.rows}
      </View>
    );
  }
}

HistoryDetailsGrid.propTypes = {
  history: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HistoryDetailsGrid
