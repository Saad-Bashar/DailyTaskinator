import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../../Components/ListItem';
import { TabHeader } from '../../Components/TabHeader';

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

  keyExtractor = (item) => item[0];

  render() {
    const { tasks } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <TabHeader header="Family" /> */}
        <FlatList
          data={tasks && tasks}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
