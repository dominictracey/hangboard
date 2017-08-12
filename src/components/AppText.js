import React, {PropTypes, Component} from 'react';
import {Text, StyleSheet} from 'react-native'

class AppText extends Component {
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.string,
    theme: PropTypes.string,
    align: PropTypes.string,
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

  render() {
    const {children, size = 'lg', theme = 'light', align = 'center'} = this.props
    const sizeStyle = this.getSize(size)
    const colorStyle = this.getColor(theme)
    const alignStyle = this.getAlign(align)
    return (
      <Text style={[sizeStyle, colorStyle, alignStyle]}>{children}</Text>
    )
  }
}

const styles = StyleSheet.create({
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
