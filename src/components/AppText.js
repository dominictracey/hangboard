import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, StyleSheet} from 'react-native'

class AppText extends Component {
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.string,
    theme: PropTypes.string,
    align: PropTypes.string,
    flex: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  getSize = (size) => {
    switch (size) {
      case 'xs':
        return styles.xs
      case 'sm':
        return styles.sm
      case 'lg':
        return styles.lg
      case 'xl':
        return styles.xl
      default:
        return styles.lg
    }
  }

  getColor = (theme) => {
    return theme === 'dark' ? styles.dark : styles.light
  }

  getAlign = (align) => {
    return align === 'center' ? styles.center : styles.left
  }

  getFlex = (flex) => {
    if (!isNaN(flex)) {
      return {flex: Number(flex)}
    } else {
      return {flex: 1}
    }
  }

  render() {
    const {children, size = 'lg', theme = 'light', align = 'center', flex = 1} = this.props
    const sizeStyle = this.getSize(size)
    const colorStyle = this.getColor(theme)
    const alignStyle = this.getAlign(align)
    const flexStyle = this.getFlex(flex)
    return (
      <Text style={[sizeStyle, colorStyle, alignStyle, flexStyle]}>{children}</Text>
    )
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  center: {
    textAlign: 'center',
  },
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 18,
  },
  lg: {
    fontSize: 24,
  },
  xl: {
    fontSize: 36,
  },
  dark: {
    color: '#d7d7d7',
  },
  light: {
    color: '#272727',
  }
})

export default AppText
