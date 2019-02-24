import React, { Component } from 'react';
import { View, LayoutAnimation } from 'react-native';
import AddTaskModal from './AddTaskModal';
import moment from 'moment'
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Calendar from '../Components/Calendar';
import RoundedIcon from '../Components/RoundedIcon';
import SelectedDateActions from '../Redux/SelectedDateRedux'
import TaskScreen from './TaskScreens';
import firebase from 'firebase'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      index: 0,
      routes: [
        { key: 'first', title: 'Islam' },
        { key: 'second', title: 'Family' },
        { key: 'third', title: 'Work' },
        { key: 'fourth', title: 'Personal' }
      ],
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    props.navigation.setParams({ selectedDate: moment().format('YYYY-MM-DD') })
    props.setSelectedDate(moment().format('YYYY-MM-DD'))
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('lla ', user.uid);
      }
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onDateChange = (value) => {
    const selectedDate =  moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.props.navigation.setParams({ selectedDate });
    this.props.setSelectedDate(selectedDate)
  }

  render() {
    const selectedDate = this.props.navigation.getParam('selectedDate', '');
    const { modalVisible } = this.state;
    return ( 
      <View style={{ flex: 1 }}>
        <Calendar onDateSelected={(value) => this.onDateChange(value)} />
        <TaskScreen navigation={this.props.navigation} tasks={this.props.tasks && this.props.tasks} />
        <RoundedIcon onPress={() => this.setModalVisible(true)} />
        <AddTaskModal visible={modalVisible} setModalVisible={this.setModalVisible} selectedDate={selectedDate} />
      </View>
    );
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDate: data => dispatch(SelectedDateActions.setSelectedDate(data))
  }
}

const mapStateToProps = (state) => {
  const uid = getFirebase().auth().currentUser.uid;
  console.log('UID ', uid);
  const selectedDate = state.selectedDate.selectedDate;
  const dayTask = state.firebase.data.Users && state.firebase.data.Users[uid][selectedDate]

  return {
    tasks: dayTask && Object.entries(dayTask)
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
connect(mapStateToProps, mapDispatchToProps))(HomeScreen);