import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { TabHeader } from '../../Components/TabHeader';
import ListItem from '../../Components/ListItem';
import EmptyState from '../../Components/EmptyState';
import { Images } from '../../Themes';

export default class PersonalTab extends Component {
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
      return <EmptyState text={'Do not forget personal growth'} image={Images.notFoundPersonal} />;
    }

    return (
      <View>
        {/* <TabHeader header="Personal" /> */}
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
