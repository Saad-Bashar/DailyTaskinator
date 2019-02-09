import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import styles from './Styles/CardStyle'


export default class CardItem extends Component {
  render() {
    return (
      <Card containerStyle={styles.containerStyle}>
        {this.props.children}
      </Card>
    );
  }
}
