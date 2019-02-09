import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import WorkIcon from 'react-native-vector-icons/MaterialIcons'
import PersonalIcon from 'react-native-vector-icons/Ionicons'
import WorkTab from './WorkTab';
import IslamTab from './IslamTab';
import { Colors } from '../../Themes'
import FamilyTab from './FamilyTab';
import PersonalTab from './PersonalTab';

export default class TaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Islam' },
        { key: 'second', title: 'Family' },
        { key: 'third', title: 'Work' },
        { key: 'fourth', title: 'Personal' }
      ],
    };
  }

  getIcons = (title) => {
    switch(title) {
      case 'Islam':
        return (
          <MatIcon 
            name="islam"
            size={22}
            color={Colors.bloodOrange}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Work': 
        return (
          <WorkIcon 
            name="work"
            size={22}
            color={Colors.bloodOrange}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Personal': 
        return (
          <PersonalIcon 
            name="ios-man"
            size={22}
            color={Colors.bloodOrange}
            style={{ paddingRight: 5 }}
          />
        )
      case 'Family': 
        return (
          <MatIcon 
            name="human-male-female"
            size={22}
            color={Colors.bloodOrange}
            style={{ paddingRight: 5 }}
          />
        )
    }
  }

  _renderLabel = scene => {
    return (
      <View>
        {this.getIcons(scene.route.title)}
      </View>
    );
  }


  render() {
    const { tasks } = this.props; 
    const workTasks = tasks && tasks.filter(task => task[1].category === "Work")
    const familyTasks = tasks && tasks.filter(task => task[1].category === "Family")
    const personalTasks = tasks && tasks.filter(task => task[1].category === "Personal")
    const islamTasks = tasks && tasks.filter(task => task[1].category === "Islam")

    console.log(workTasks, familyTasks, personalTasks, islamTasks)
    return (
      <TabView
        navigationState={this.state}
        renderScene = {({ route }) => {
          switch (route.key) {
            case 'first':
              return <IslamTab tasks={islamTasks}/>
            case 'second':
              return <FamilyTab tasks={familyTasks} />
            case 'third':
              return <WorkTab tasks={workTasks}/>
            case 'fourth':
              return <PersonalTab tasks={personalTasks} />
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
    );
  }
}
