import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItem from '../../Components/ListItem';
import { Fonts, Colors } from '../../Themes';

export default class FamilyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ paddingLeft: 20, fontSize: Fonts.size.h2, color: Colors.cloud, fontFamily: Fonts.type.bold }}>
          Family
        </Text>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
