import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../Themes'


export default class RoundedIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 70, right: 10, padding: 20, alignSelf: 'center' }}
        onPress={this.props.onPress}
      >
        <Icon 
          name="pluscircleo"
          size={40}
          color={Colors.bloodOrange}
        />
      </TouchableOpacity>
    );
  }
}
