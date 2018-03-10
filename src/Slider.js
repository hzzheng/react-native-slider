/**
 * react-native-slider
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from 'react-native';

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
};

export default class Slider extends Component {

  static defaultProps = {
    disabled: false,
    step: 1,
    min: 0,
    max: 100,
    onChange: (v) => console.log(v)
  };

  constructor(props) {
    super(props);

    this.offsetStart = 0;
    this.maxOffset = 0;
    this.offset = new Animated.Value(0);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartPanResponder,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease
    });

    this.state = {
      // value: getValue(props, 0)
      value: 60
    }
  }

  componentDidMount() {
    this.init();
  }

  handleStartPanResponder = () => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }
    return true;
  }

  handlePanResponderMove = (_event, { dx: offsetX }) => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }

    let offset = this.offsetStart + offsetX;
    if (offset < 0) {
      offset = 0;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        value: newValue,
      });
      Animated.timing(this.offset, {
        toValue: offset,
        duration: 0,
      }).start();
      return false;
    }

    if (offset > this.maxOffset) {
      offset = this.maxOffset;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        value: newValue,
      });
      Animated.timing(this.offset, {
        toValue: offset,
        duration: 0,
      }).start();
      return false;
    }

    const value = this.getValueByOffset(offset);
    offset = this.getOffsetByValue(value);
    this.setState({ value });

    Animated.timing(this.offset, {
      toValue: offset,
      duration: 0,
    }).start();
    return true;
  }

  handlePanResponderRelease = (_event, { dx: offsetX }) => {
    if (isNaN(offsetX)) {
      return false;
    }

    this.offsetStart += offsetX;

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.state.value);
    }
  }

  /**
   * 通过偏移量确定值
   * @param  {number} offset 偏移量
   * @return {number}        值
   */
  getValueByOffset = (offset) => {
    const { min, max, step } = this.props;
    const percent = offset / this.maxOffset;
    const value = Math.round((min + ((max - min) * percent)) / step) * step;
    return Math.max(Math.min(value, max), min);
  }

  /**
   * 通过值获取偏移量
   * @param  {number} value 值
   * @return {number}       偏移量
   */
  getOffsetByValue = (value) => {
    const { min, max } = this.props;
    return this.maxOffset * ((value - min) / (max - min));
  }

  /**
   * 获取最大偏移量
   */
  getMaxOffset(callback) {
    this.line.measure((x, y, width) => {
      this.maxOffset = width;
      callback();
    });
  }

  init() {
    requestAnimationFrame(() => {
      this.getMaxOffset(() => {
        const offset = this.getOffsetByValue(this.state.value);
        this.offsetStart = offset;
        // this.setState({ offset });
        Animated.timing(this.offset, {
          toValue: offset,
          duration: 300,
        }).start();
      });
    });
  }

  render() {
    const { value } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.slider}>
          <View style={styles.sliderLine} ref={line => this.line = line}>
            <Animated.View style={[styles.sliderLineBg, { width: this.offset }]} />
          </View>

          <Animated.View 
            style={[styles.sliderHandle, { left: this.offset }]}
            { ...this.panResponder.panHandlers}
          >
            <View style={styles.sliderHandleShadow}/>
          </Animated.View>
        </View>
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
  slider: {
    position: 'relative',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sliderLine: {
    height: 2,
    backgroundColor: '#ccc',
  },
  sliderLineBg: {
    width: 40,
    height: '100%',
    backgroundColor: 'red'
  },
  sliderHandle: {
    position: 'absolute',
    left: 0,
    top: -15,
    width: 30,
    height: 30,
  },
  sliderHandleShadow: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowOffset: {  width: 0,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3
  }
});
