import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { TabHeader } from '../../Components/TabHeader';
import ListItem from '../../Components/ListItem';

export default class PersonalTab extends Component {
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
      <View>
        <TabHeader header="Personal" />
        <FlatList
          data={tasks && tasks}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
