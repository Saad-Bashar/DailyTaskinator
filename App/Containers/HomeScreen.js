import React, { Component } from 'react';
import { View, LayoutAnimation, Text, FlatList } from 'react-native';
import AddTaskModal from './AddTaskModal';
import moment from 'moment'
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Calendar from '../Components/Calendar';
import RoundedIcon from '../Components/RoundedIcon';
import SelectedDateActions from '../Redux/SelectedDateRedux'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedDate: moment().format('YYYY-MM-DD')
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    props.navigation.setParams({ selectedDate: moment().format('YYYY-MM-DD') })
    props.setSelectedDate(moment().format('YYYY-MM-DD'))
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
    this.props.setSelectedDate(selectedDate)
  }

  render() {
    return ( 
      <View style={{ flex: 1 }}>
        <Calendar onDateSelected={(value) => this.onDateChange(value)} />
        <RoundedIcon onPress={() => this.setModalVisible(true)} />       
        {/* <FlatList
          data={this.props.tasks}
          renderItem={({item}) => {
            console.log('Item ', item)
            return (
              <Text>{item[1].taskName}</Text>
            )
          }}
        /> */}
        <AddTaskModal
          visible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedDate={this.state.selectedDate}
        />
      </View>
    );
  }
} 

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDate: data => dispatch(SelectedDateActions.setSelectedDate(data))
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
      const uid = getFirebase().auth().currentUser.uid;
      const selectedDate = state.selectedDate.selectedDate;
      const dayTask = state.firebase.data.Users && state.firebase.data.Users[uid][selectedDate]


      return {
        tasks: dayTask && Object.entries(dayTask)
      }
    },
    mapDispatchToProps
  )
)(HomeScreen);