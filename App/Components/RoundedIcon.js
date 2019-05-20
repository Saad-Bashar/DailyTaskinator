import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../Themes'
import CardStyle from './Styles/CardStyle';


export default class RoundedIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          ...CardStyle.containerStyle,
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 80, 
          backgroundColor: Colors.bloodOrange,
          
        }}
        onPress={this.props.onPress}
      >
        <Icon 
          name="plus"
          size={24}
          color={Colors.snow}
        />
      </TouchableOpacity>
    );
  }
}
