import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';
import { CheckBox } from 'react-native-elements'
import { Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/Feather'

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    return (
      <Card>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            checkedColor={Colors.bloodOrange}
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
          <View>
            <Text style={{ fontSize: Fonts.size.medium, fontWeight: '500', fontFamily: Fonts.type.bold }}>Work</Text>
            <View style={{ flexDirection: 'row', paddingVertical: 2, alignItems: 'center' }}>
              <Icon 
                name="clock"
                size={15}
                color={'#EB8F0D'}
                style={{ paddingRight: 5 }}
              />
              <Text style={{ fontSize: 12 }}>
                7:00 ~ 9:00 am
              </Text>
            </View>

            <Text style={{ fontSize: 11, color: '#9C9C9C' }}>
              Finish Book
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}
