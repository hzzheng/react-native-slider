import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

export default class Tooltip extends Component {

  render() {
    const { children, message, visible } = this.props;

    return (
      <View style={styles.tooltip}>
        {
          visible && (
            <View style={styles.inner}>
              <Text style={styles.message}>{message}</Text>
            </View>
          )
        }
        {
          visible && <View style={styles.arrow} />
        }
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltip: {
    position: 'relative'
  },
  inner: {
    position: 'absolute',
    top: -38,
    width: 34,
    height: 30,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    overflow: 'visible',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    left: 13,
    top: -8,
    width: 6,
    height: 6,
    transform: [{
      translateX: -3,
    }],
    borderWidth: 6,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopColor: 'rgba(0, 0, 0, 0.7)'
  },
  message: {
    color: '#fff',
    fontSize: 12
  }
})