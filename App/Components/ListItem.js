import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';
import { CheckBox } from 'react-native-elements'
import { Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/Feather'
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';
import EditTaskModal from '../Containers/EditTaskModal';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.item[1].isComplete || false,
      modalVisible: false
    };
  }

  updateTask = () => {
    this.setState({
      checked: !this.state.checked
    }, () => {
      const { firebase, selectedDate, item } = this.props;
      const uid = getFirebase().auth().currentUser.uid;
      const checked = this.state.checked

      firebase.database().ref(`/Users/${uid}/${selectedDate.selectedDate}/${item[0]}`).update({
        isComplete: checked
      })
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { taskName, taskContent, startTime, endTime, isComplete } = this.props.item[1];
    const { modalVisible } = this.state;
    
    return (
      <Card>
        <TouchableOpacity onPress={() => this.setModalVisible(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            checkedColor={Colors.bloodOrange}
            checked={this.state.checked}
            onPress={this.updateTask}
          />
          <View>
            <Text style={{ fontSize: Fonts.size.medium, fontWeight: '500', fontFamily: Fonts.type.bold }}>
              {taskName}
            </Text>
            <View style={{ flexDirection: 'row', paddingVertical: 2, alignItems: 'center' }}>
              <Icon 
                name="clock"
                size={15}
                color={'#EB8F0D'}
                style={{ paddingRight: 5 }}
              />
              <Text style={{ fontSize: 12 }}>
                {startTime} ~ {endTime}
              </Text>
            </View>

            <Text style={{ fontSize: 11, color: '#9C9C9C' }}>
              {taskContent}
            </Text>
          </View>
        </TouchableOpacity>
        <EditTaskModal selectedDate={this.props.selectedDate.selectedDate} item={this.props.item} visible={modalVisible} setModalVisible={this.setModalVisible} />
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDate: state.selectedDate
  }
}

export default compose(
  firebaseConnect((props) => {
    
  }),
connect(mapStateToProps, null))(ListItem);
