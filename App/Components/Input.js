import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import { Colors } from '../Themes'

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { label, onChangeText, multiline, onFocus, value } = this.props;

    return (
      <TextField
        label={label}
        baseColor={Colors.bloodOrange}
        tintColor={Colors.bloodOrange}
        placeholderTextColor={Colors.bloodOrange}
        inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: Colors.bloodOrange }}
        onChangeText={onChangeText}
        multiline={multiline}
        onFocus={onFocus}
        value={value}
      />
    );
  }
}
