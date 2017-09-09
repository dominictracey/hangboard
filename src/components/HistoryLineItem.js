import React from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'react-native-elements'

class HistoryLineItem extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.cb(this.props.index)
  }

  render() {
    const {index, title} = this.props
    return (
      <ListItem key={index} title={title} onPress={this.onPress}/>
    )
  }
}

export default HistoryLineItem
