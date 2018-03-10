import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Slider from './src/Slider';
import Tooltip from './src/Tooltip';

/**
 * App
 */
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Slider step={10} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})