/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   04-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 06-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';
import RepsComplete from '../../components/RepsComplete'
import WeightView from '../../components/WeightView'

// import Icon from 'react-native-vector-icons/MaterialIcons';

// const color = () => Math.floor(255 * Math.random());

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class SetResultView extends Component {
  static displayName = 'SetResultView';

  static propTypes = {
    exId: PropTypes.string.isRequired,
    setId: PropTypes.string.isRequired,
    setLabel: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    grip: PropTypes.string.isRequired,
    reps: PropTypes.number.isRequired,
    save: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    workoutStateActions: PropTypes.shape({
      adjustWeight: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      lastSuccess: -1,
    };
  }

  save = () => {
    const {exId, setId, save} = this.props
    save(exId, setId, this.state.lastSuccess)
  };

  addWeight = () => {
    this.props.workoutStateActions.adjustWeight(true, true, this.props.exId)
  }

  removeWeight = () => {
    this.props.workoutStateActions.adjustWeight(false, true, this.props.exId)
  }

  repsComplete = (i) => {
    this.setState({lastSuccess: i})
  }

  render() {
    const {grip,setLabel,weight,reps} = this.props
    const buttonText = 'Save';
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={[styles.row, styles.rowplus]}>
            <Text style={styles.header}>Enter Results for Set</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Grip:</Text>
            <Text style={styles.content}>{grip}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Set:</Text>
            <Text style={styles.content}>{setLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.content}>{weight}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <RepsComplete reps={reps}
                        style={styles.container}
                        cb={this.repsComplete}
                        complete={this.state['lastSuccess']}/>
        </View>
        <View style={styles.row}>
          <WeightView weight={weight}
                      title='Next Workout Weight'
                      addCb={this.addWeight}
                      removeCb={this.removeWeight}
                      allowUpdate={true}/>
        </View>
        <View style={styles.row}>
          <Button color='#ee7f06' title={buttonText} onPress={this.save}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  repsComplete: {
    flex: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  rowplus: {
    flex: 1.5,
  },
  header: {
    flex: 1,
    color: '#989898',
    fontSize: 38,
    textAlign: 'right',
    paddingRight: 10
  },
  label: {
    flex: 1,
    color: '#878787',
    fontSize: 32,
    textAlign: 'right',
    paddingRight: 30
  },
  content: {
    flex: 1,
    color: '#878787',
    fontSize: 32,
    textAlign: 'left',
  },
});

export default SetResultView;
