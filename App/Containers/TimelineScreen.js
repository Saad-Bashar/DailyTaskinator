import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TimelineScreenStyle'



class TimelineScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  getFilteredArray = (tasks) => {
    console.log('filter ', tasks)
    const filteredTask = tasks.sort(function(a,b){
      return a[1].startTime.split(':').join('') - b[1].startTime.split(':').join('');
    })

    return filteredTask;
  }

  render () {
    const {tasks} = this.props;

    const filteredTasks = this.getFilteredArray(tasks && tasks) 
    console.log('filteredTask ', filteredTasks)
    
    return (
      <ScrollView style={styles.container}>
        <Text>TimelineScreen Container</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineScreen)


// var movies = [
//   {title: 'The Godfather', rating: 9.2, release: '11:02'},
//   {title: 'The Godfather: Part II', rating: 9.0, release: '9:20'},
//   {title: 'The Shawshank Redemption', rating: 9.3, release: '17:26'},
//   {title: 'The Shawshank Redemption', rating: 9.3, release: '6:30'},
// ];

// movies.sort(function(a, b) {
//   return a.release.split(':').join('') - b.release.split(':').join('');
// });
