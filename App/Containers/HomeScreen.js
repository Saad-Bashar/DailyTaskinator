import React, { Component } from 'react';
import { View, LayoutAnimation, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/AntDesign'
import AddTaskModal from '../Components/AddTaskModal';
import moment from 'moment'


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedDate: moment().format('YYYY-MM-DD')
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  onDateChange = (value) => {
    const selectedDate =  moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.setState({
      selectedDate
    })

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarStrip
          calendarAnimation={{type: 'sequence', duration: 300}}
          style={{height: 100, paddingTop: 20, paddingBottom: 10}}
          calendarHeaderStyle={{color: Colors.bloodOrange, paddingBottom: 10, fontSize:12, fontWeight:'800' }}
          calendarColor={'#fff'}
          dateNumberStyle={{color: Colors.bloodOrange, fontSize:15, paddingTop:5}}
          dateNameStyle={{color: Colors.bloodOrange, fontSize:12}}
          highlightDateNumberStyle={{color: '#fff', fontSize:15, backgroundColor:Colors.bloodOrange, width:40, height:30, paddingTop:5}}
          highlightDateNameStyle={{color: '#fff', fontSize:12, backgroundColor:Colors.bloodOrange, width:40, height:20, paddingTop:5}}
          iconContainer={{flex: 0.1}}
          onDateSelected={this.onDateChange}
        />
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 30, alignSelf: 'center'  }}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon 
            name="pluscircleo"
            size={50}
            color={Colors.bloodOrange}
          />
        </TouchableOpacity>
        <AddTaskModal
          visible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          selectedDate={this.state.selectedDate}
        />
      </View>
    );
  }
}
