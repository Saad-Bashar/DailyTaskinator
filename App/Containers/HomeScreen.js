import React, { Component } from 'react';
import { View, LayoutAnimation, Text, Dimensions } from 'react-native';
import AddTaskModal from './AddTaskModal';
import moment from 'moment'
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux';
import Calendar from '../Components/Calendar';
import RoundedIcon from '../Components/RoundedIcon';
import SelectedDateActions from '../Redux/SelectedDateRedux'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import WorkTab from './WorkTab';
import IslamTab from './IslamTab';
import { Colors } from '../Themes'
import FamilyTab from './FamilyTab';
import PersonalTab from './PersonalTab';
import Icon from 'react-native-vector-icons/AntDesign'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import WorkIcon from 'react-native-vector-icons/MaterialIcons'
import PersonalIcon from 'react-native-vector-icons/Ionicons'



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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onDateChange = (value) => {
    const selectedDate =  moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    this.props.navigation.setParams({ selectedDate });
    this.props.setSelectedDate(selectedDate)
  }

  getIcons = (title) => {
    switch(title) {
      case 'Islam':
        return (
          <MatIcon 
            name="islam"
            size={22}
            color={'#EB8F0D'}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Work': 
        return (
          <WorkIcon 
            name="work"
            size={22}
            color={'#F5C820'}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Personal': 
        return (
          <PersonalIcon 
            name="ios-man"
            size={22}
            color={'#FF8C00'}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Family': 
        return (
          <MatIcon 
            name="human-male-female"
            size={22}
            color={'#B17667'}
            style={{ paddingRight: 5 }}
          />
        )
    }
  }

  _renderLabel = scene => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.getIcons(scene.route.title)}
        {/* <Text style={{ color: Colors.bloodOrange, fontWeight: 'bold'}}>{ scene.route.title }</Text> */}
      </View>
    );
  }

  render() {
    const selectedDate = this.props.navigation.getParam('selectedDate', '');
    const { modalVisible } = this.state;
    return ( 
      <View style={{ flex: 1 }}>
        <Calendar onDateSelected={(value) => this.onDateChange(value)} />
        <TabView
          navigationState={this.state}
          renderScene = {({ route }) => {
            switch (route.key) {
              case 'first':
                return <IslamTab />
              case 'second':
                return <FamilyTab />
              case 'third':
                return <WorkTab />
              case 'fourth':
                return <PersonalTab />
              default:
                return null;
            }
          }}
          renderTabBar={props =>
            <TabBar
              {...props}
              style={{ backgroundColor: '#fff' }}
              indicatorStyle={{ backgroundColor: Colors.bloodOrange, paddingBottom: 5 }}
              renderLabel={ this._renderLabel }
            />
          }
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        />
        <RoundedIcon onPress={() => this.setModalVisible(true)} />
        <AddTaskModal
          visible={modalVisible}
          setModalVisible={this.setModalVisible}
          selectedDate={selectedDate}
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

const mapStateToProps = (state) => {
  const uid = getFirebase().auth().currentUser.uid;
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