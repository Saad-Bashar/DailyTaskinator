import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Timeline from 'react-native-timeline-listview'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from "./Styles/TimelineScreenStyle";
import { Colors } from "../Themes";

class TimelineScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  getIcon = (cat) => {
    switch (cat) {
      case "Work":
        return require('../Images/portfolio.png')
      case "Islam":
        return require('../Images/quran.png')
      case "Family":
        return require('../Images/house.png')
      case "Personal":
        return require('../Images/statistics.png')
      default:
        return;
    }
  }

  getFilteredArray = tasks => {
    const filteredTask = tasks && tasks.sort(function (a, b) {
      return new Date('1970/01/01 ' + a[1].startTime) - new Date('1970/01/01 ' + b[1].startTime);
    });

    let timelineArray = [];

    filteredTask && filteredTask.map(item => {
      return (
        timelineArray.push({
          time: item[1].startTime,
          title: item[1].taskName,
          description: item[1].taskContent,
          icon: this.getIcon(item[1].category)
        })
      )
    })

    console.log('timeline Array ', timelineArray);

    return timelineArray;
  };

  render() {
    const { tasks } = this.props;

    const filteredTasks = this.getFilteredArray(tasks && tasks);
    console.log("filteredTask ", filteredTasks);

    return (
      <ScrollView style={styles.container}>
        <Timeline
          data={filteredTasks}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          innerCircle={'icon'}
          lineColor={Colors.bloodOrange}
          timeContainerStyle={{minWidth:52, marginTop: -5, }}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5 }
          }}
          separator={true}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineScreen);

// var movies = [
//   {title: 'The Godfather', rating: 9.2, release: '11:02'},
//   {title: 'The Godfather: Part II', rating: 9.0, release: '9:20'},
//   {title: 'The Shawshank Redemption', rating: 9.3, release: '17:26'},
//   {title: 'The Shawshank Redemption', rating: 9.3, release: '6:30'},
// ];

// movies.sort(function(a, b) {
//   return a.release.split(':').join('') - b.release.split(':').join('');
// });
