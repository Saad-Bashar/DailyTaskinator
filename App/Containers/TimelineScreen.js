import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import Timeline from '../Lib/react-native-timeline-listview'

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


  getColor = (cat) => {
    switch (cat) {
      case "Work":
        return '#21C8B7'
      case "Islam":
        return '#024449'
      case "Family":
        return '#FFCD4E'
      case "Personal":
        return '#FF8762'
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
          // icon: this.getIcon(item[1].category)
          circleColor: this.getColor(item[1].category),
          lineColor: this.getColor(item[1].category),
          category: item[1].category
        })
      )
    })

    console.log('timeline Array ', timelineArray);

    return timelineArray;
  };

  render() {
    const { tasks } = this.props;

    const filteredTasks = this.getFilteredArray(tasks && tasks);
    console.log("filteredTask ", filteredTasks && filteredTasks[0].lineColor);

    return (
      <ScrollView style={styles.container}>
        <Timeline
          data={filteredTasks}
          circleSize={20}
          innerCircle={'icon'}
          lineColor={Colors.bloodOrange}
          timeContainerStyle={{textAlign: 'center', width: 60, marginTop: -5, backgroundColor: '#FF8762', borderTopRightRadius: 10, borderBottomLeftRadius: 10 }}
          timeStyle={{textAlign: 'center',  color:'white', padding:5,  }}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{ paddingTop:5, }
          }}
          separator={true}
          innerCircle={'dot'}
          detailContainerStyle={{ marginTop: -10 }}
          onEventPress={() => console.log('Pressed')}
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
