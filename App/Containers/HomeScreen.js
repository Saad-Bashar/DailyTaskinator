import React, { Component } from 'react';
import { View, LayoutAnimation, Text } from 'react-native';
import AddTaskModal from './AddTaskModal';
import moment from 'moment'
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Calendar from '../Components/Calendar';
import RoundedIcon from '../Components/RoundedIcon';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedDate: moment().format('YYYY-MM-DD')
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    props.navigation.setParams({ selectedDate: moment().format('YYYY-MM-DD') })
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  onDateChange = (value) => {
    const selectedDate =  moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.setState({
      selectedDate
    });
    this.props.navigation.setParams({ selectedDate });
  }

  render() {
    return ( 
      <View style={{ flex: 1 }}>
        <Calendar onDateSelected={(value) => this.onDateChange(value)} />
        <RoundedIcon onPress={() => this.setModalVisible(true)} />
        <AddTaskModal
          visible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedDate={this.state.selectedDate}
        />
      </View>
    );
  }
} 

export default compose(
  firebaseConnect((props) => {
    const uid = getFirebase().auth().currentUser.uid;
    const selectedDate = props.navigation.getParam('selectedDate', '')
    return [
      { path: `Users/${uid}/${selectedDate}` }
    ]
  }),
  connect(
    (state) => {
      const usersTask = state.firebase.data.Users && Object.entries(state.firebase.data.Users)
      const taskList = usersTask && Object.entries(usersTask[0][1])
      const tasks = taskList && Object.entries(taskList[0][1])

      return {
        tasks
      }
    } 
  )
)(HomeScreen);