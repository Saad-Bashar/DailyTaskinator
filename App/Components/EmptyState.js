import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './Styles/EmptyStateStyle';
import { scale } from 'react-native-size-matters';

export default class EmptyState extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    const { image, text, textStyle } = this.props;
    return (
      <View style={styles.container}>
        <Image style={{ width: scale(300), height: scale(200) }} source={image} />
        <Text style={[{ textAlign: 'center', alignSelf: 'center', fontSize: 12, color: '#9999', marginTop: scale(4) }, textStyle]}>
          {text}
        </Text>
      </View>
    );
  }
}
