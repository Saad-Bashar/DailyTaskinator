import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../../Components/ListItem';
import { TabHeader } from '../../Components/TabHeader';
import { Images } from '../../Themes';
import EmptyState from '../../Components/EmptyState';
import { scale } from 'react-native-size-matters';

export default class FamilyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({ item }) => {
    return <ListItem item={item} />;
  };

  keyExtractor = item => item[0];

  render() {
    const { tasks } = this.props;

    if (!tasks || (tasks && tasks.length <= 0)) {
      return (
        <EmptyState
          textStyle={{ marginTop: scale(20) }}
          text={'Spend sometime with your family today'}
          image={Images.notFoundFamily}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {/* <TabHeader header="Family" /> */}
        <FlatList
          data={tasks && tasks}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{ padding: 20 }}
        />
      </View>
    );
  }
}
