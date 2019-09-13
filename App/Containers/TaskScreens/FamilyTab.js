import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../../Components/ListItem';
import { TabHeader } from '../../Components/TabHeader';
import { Images, Colors } from '../../Themes';
import EmptyState from '../../Components/EmptyState';
import { scale } from 'react-native-size-matters';
import RoundedIcon from '../../Components/RoundedIcon';
import AddTaskModal from '../AddTaskModal';
import { compose } from 'redux';
import { connect } from 'react-redux';

class FamilyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  renderItem = ({ item }) => {
    return <ListItem item={item} />;
  };

  keyExtractor = item => item[0];

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { tasks, selectedDate } = this.props;
    const { modalVisible } = this.state;

    if (!tasks || (tasks && tasks.length <= 0)) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4 }}>
            <EmptyState
              textStyle={{ marginTop: scale(20) }}
              text={'Spend sometime with your family today'}
              image={Images.notFoundFamily}
            />
          </View>

          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <RoundedIcon backgroundColor={Colors.family} onPress={() => this.setModalVisible(true)} />
            <AddTaskModal
              category={'Family'}
              visible={modalVisible}
              setModalVisible={this.setModalVisible}
              selectedDate={selectedDate}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={tasks && tasks}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{ padding: 20 }}
        />
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <RoundedIcon backgroundColor={Colors.family} onPress={() => this.setModalVisible(true)} />
          <AddTaskModal
            category={'Family'}
            visible={modalVisible}
            setModalVisible={this.setModalVisible}
            selectedDate={selectedDate}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedDate: data => dispatch(SelectedDateActions.setSelectedDate(data)),
  };
};

const mapStateToProps = state => {
  const selectedDate = state.selectedDate.selectedDate;
  const deviceId = state.deviceId.id;

  return {
    deviceId,
    selectedDate,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FamilyTab);
