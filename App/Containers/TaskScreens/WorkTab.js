import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fonts, Colors } from '../../Themes';

export default class WorkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text style={{ paddingLeft: 20, fontSize: Fonts.size.h2, color: Colors.cloud, fontFamily: Fonts.type.bold }}>
          Work
        </Text>
      </View>
    );
  }
}
