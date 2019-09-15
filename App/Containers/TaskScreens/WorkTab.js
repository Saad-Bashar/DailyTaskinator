import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../../Components/ListItem';
import EmptyState from '../../Components/EmptyState';
import { Images, Colors } from '../../Themes';
import AddTaskModal from '../AddTaskModal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import FloatingButton from '../../Components/FloatingButton';
import NoteModal from '../../Components/NoteModal';
import { firebaseConnect } from 'react-redux-firebase';

class WorkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      noteModal: false,
    };
  }

  renderItem = ({ item }) => {
    return <ListItem item={item} />;
  };

  keyExtractor = item => item[0];

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setNoteModalVisible = visible => {
    this.setState({ noteModal: visible });
  };

  updateTask = reflection => {
    const { firebase, selectedDate, deviceId } = this.props;

    firebase
      .database()
      .ref(`/Users/${deviceId}/${selectedDate}`)
      .update({
        reflection,
      });
  };

  render() {
    const { tasks, selectedDate, reflection } = this.props;
    const { modalVisible, noteModal } = this.state;

    if (!tasks || (tasks && tasks.length <= 0)) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4 }}>
            <EmptyState text={'Work with passion and determination'} image={Images.notFoundWork} />
          </View>

          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <AddTaskModal
              category={'Work'}
              visible={modalVisible}
              setModalVisible={this.setModalVisible}
              selectedDate={selectedDate}
            />
          </View>

          <NoteModal
            reflection={reflection && reflection}
            save={this.updateTask}
            closeModal={this.setNoteModalVisible}
            visible={noteModal}
          />

          <FloatingButton addAction={this.setModalVisible} color={Colors.work} noteAction={this.setNoteModalVisible} />
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
          <AddTaskModal
            category={'Work'}
            visible={modalVisible}
            setModalVisible={this.setModalVisible}
            selectedDate={selectedDate}
          />
        </View>

        <NoteModal
          reflection={reflection && reflection}
          save={this.updateTask}
          closeModal={this.setNoteModalVisible}
          visible={noteModal}
        />

        <FloatingButton addAction={this.setModalVisible} color={Colors.work} noteAction={this.setNoteModalVisible} />
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
  firebaseConnect(props => {}),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(WorkTab);
