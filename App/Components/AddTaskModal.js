import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Keyboard } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors, Fonts } from '../Themes'



export default class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      taskName: '',
      taskContent: '',
      taskCategory: ''
    };
  }

  _showStartDateTimePicker = () => { Keyboard.dismiss(); this.setState({ isStartDateTimePickerVisible: true });}

  _hideStartDateTimePicker = () => this.setState({ isStartDateTimePickerVisible: false });

  _handleStartDatePicked = (date) => {
    let cusdate = date;
    let startTime = cusdate.getHours() + ":" + cusdate.getMinutes();
    console.log('starttime ', startTime)
    this.setState({ startTime })
    this._hideStartDateTimePicker();
  };

  _showEndDateTimePicker = () => { Keyboard.dismiss(); this.setState({ isEndDateTimePickerVisible: true });}

  _hideEndDateTimePicker = () => this.setState({ isEndDateTimePickerVisible: false });

  _handleEndDatePicked = (date) => {
    let cusdate = date;
    let endTime = cusdate.getHours() + ":" + cusdate.getMinutes();
    console.log('starttime ', endTime)
    this.setState({ endTime })
    this._hideStartDateTimePicker();
  };

  onChangeCategory = (cat) => {
    this.setState({
      taskCategory: cat
    });
  }

  render() {
    let data = [{
        value: 'Islam',
      }, {
        value: 'Family',
      }, {
        value: 'Work',
    }, {
        value: 'Personal'
    }];

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 40, paddingHorizontal: 25 }}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.bloodOrange, fontSize: Fonts.size.h6 }}>
                Create Task
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.setModalVisible(!this.props.visible);
                }}
              >
                <Icon 
                  name="close"
                  size={20}
                  color={Colors.bloodOrange}
                />
              </TouchableOpacity>
            </View>
            <Dropdown
              label='Select Categories'
              data={data}
              baseColor={ Colors.bloodOrange }
              onChangeText={this.onChangeCategory}
            />
            <TextField
              label='Task Name'
              baseColor={Colors.bloodOrange}
              tintColor={Colors.bloodOrange}
              placeholderTextColor={Colors.bloodOrange}
              inputContainerStyle={{ borderBottomColor: Colors.bloodOrange }}
              onChangeText={(taskName) => this.setState({taskName})}
            />
            <TextField
              label='Task Content'
              baseColor={Colors.bloodOrange}
              multiline={true}
              tintColor={Colors.bloodOrange}
              placeholderTextColor={Colors.bloodOrange}
              inputContainerStyle={{ borderBottomColor: Colors.bloodOrange }}
              onChangeText={(taskContent) => this.setState({taskContent})}
            />
            <TextField
              label='Start Time'
              baseColor={Colors.bloodOrange}
              onFocus={this._showStartDateTimePicker}
              value={this.state.startTime}
              multiline={true}
              inputContainerStyle={{ borderBottomColor: Colors.bloodOrange }}
            />
            <TextField
              label='End Time'
              baseColor={Colors.bloodOrange}
              onFocus={this._showEndDateTimePicker}
              value={this.state.endTime}
              multiline={true}
              inputContainerStyle={{ borderBottomColor: Colors.bloodOrange}}
            />
            <TouchableOpacity
              style={{ width: 150, borderRadius: 5, backgroundColor: Colors.bloodOrange, padding: 10, alignSelf: 'center', marginTop: 60 }}
            >
              <Text style={{ fontSize: Fonts.size.h6, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}>Save</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isStartDateTimePickerVisible}
              mode="time"
              onConfirm={this._handleStartDatePicked}
              onCancel={this._hideStartDateTimePicker}
            />
            <DateTimePicker
              isVisible={this.state.isEndDateTimePickerVisible}
              mode="time"
              onConfirm={this._handleEndDatePicked}
              onCancel={this._hideEndDateTimePicker}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
