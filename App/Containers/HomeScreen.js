import React, { Component } from 'react';
import { View, SafeAreaView, LayoutAnimation, TouchableOpacity, Text, StyleSheet } from 'react-native';

import moment from 'moment';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Calendar from '../Components/Calendar';
import SelectedDateActions from '../Redux/SelectedDateRedux';
import TaskScreen from './TaskScreens';
import ListIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimelineIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../Themes/Colors';
import TimelineScreen from './TimelineScreen';
import { Colors } from '../Themes';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      index: 0,
      isTimeline: false,
      routes: [
        { key: 'first', title: 'Islam' },
        { key: 'second', title: 'Family' },
        { key: 'third', title: 'Work' },
        { key: 'fourth', title: 'Personal' },
      ],
      open: false,
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    props.navigation.setParams({ selectedDate: moment().format('YYYY-MM-DD') });
    props.navigation.setParams({ deviceId: props.deviceId.id });
    props.setSelectedDate(moment().format('YYYY-MM-DD'));
  }

  onOpened = () => {
    this.setState({
      open: true,
    });
  };

  onClosed = () => {
    this.setState({
      open: false,
    });
  };

  renderInner = () => {
    const { tasks } = this.props;
    let reflection = tasks && tasks.filter(task => task[0] === 'reflection');

    if (reflection && reflection.length > 0) {
      return (
        <View style={styles.panel}>
          <Text style={styles.panelSubtitle}>{reflection[0][1]}</Text>
        </View>
      );
    }

    return (
      <View style={styles.panel}>
        <Text>No reflection added yet</Text>
      </View>
    );
  };

  renderHeader = () => {
    const { open } = this.state;

    return (
      <View style={styles.header}>
        <Icon name={open ? 'ios-arrow-down' : 'ios-arrow-up'} style={{ fontSize: 20, height: 22, color: 'white' }} />
        <Text style={[styles.panelButtonTitle]}>TODAY'S JOURNAL</Text>
      </View>
    );
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  onDateChange = value => {
    const selectedDate = moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD');
    this.props.navigation.setParams({ selectedDate });
    this.props.setSelectedDate(selectedDate);
  };

  render() {
    const { isTimeline } = this.state;
    const { tasks } = this.props;
    let reflection = tasks && tasks.filter(task => task[0] === 'reflection');

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity
          onPress={() => this.setState({ isTimeline: !this.state.isTimeline })}
          style={{ alignItems: 'flex-end', paddingRight: 20, marginTop: 10 }}
        >
          {!isTimeline ? (
            <TimelineIcon name="timeline" size={24} color={colors.bloodOrange} />
          ) : (
            <ListIcon name="playlist-check" size={24} color={colors.bloodOrange} />
          )}
        </TouchableOpacity>

        <Calendar onDateSelected={value => this.onDateChange(value)} />

        {isTimeline ? (
          <TimelineScreen navigation={this.props.navigation} tasks={this.props.tasks && this.props.tasks} />
        ) : (
          <TaskScreen
            reflection={reflection && reflection}
            navigation={this.props.navigation}
            tasks={this.props.tasks && this.props.tasks}
          />
        )}
        <View style={styles.container}>
          <BottomSheet
            snapPoints={[500, 50]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            enabledManualSnapping={false}
            enabledInnerScrolling={false}
            onOpenEnd={this.onOpened}
            onCloseEnd={this.onClosed}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedDate: data => dispatch(SelectedDateActions.setSelectedDate(data)),
  };
};

const mapStateToProps = state => {
  const selectedDate = state.selectedDate.selectedDate;
  const deviceId = state.deviceId.id;
  const dayTask = state.firebase.data.Users && state.firebase.data.Users[deviceId][selectedDate];

  return {
    tasks: dayTask && Object.entries(dayTask),
    deviceId: state.deviceId,
  };
};

export default compose(
  firebaseConnect(props => {
    const selectedDate = props.navigation.getParam('selectedDate', ''); // getting the date
    const deviceId = props.navigation.getParam('deviceId', '');

    return [{ path: `Users/${deviceId}/${selectedDate}` }]; // return the task of the user on the date
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#2c2c2f',
  },

  panel: {
    height: 600,
    padding: 20,
    backgroundColor: Colors.snow,
    zIndex: 4,
  },

  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#2c2c2f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  panelSubtitle: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '200',
    lineHeight: 19,
    marginBottom: 10,
  },

  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 10,
  },

  panelButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
