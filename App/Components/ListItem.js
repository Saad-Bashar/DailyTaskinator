import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';
import { CheckBox } from 'react-native-elements';
import { Colors, Fonts } from '../Themes';
import Icon from 'react-native-vector-icons/Feather';
import { firebaseConnect, getFirebase } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import EditTaskModal from '../Containers/EditTaskModal';
import LottieView from 'lottie-react-native';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.item[1].isComplete || false,
      modalVisible: false,
      clap: false,
    };
  }

  updateTask = () => {
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => {
        const { firebase, selectedDate, item, deviceId } = this.props;
        const checked = this.state.checked;

        if (checked) {
          this.setState(
            {
              clap: true,
            },
            () => setTimeout(this.hideClap, 3000)
          );
        }

        firebase
          .database()
          .ref(`/Users/${deviceId.id}/${selectedDate.selectedDate}/${item[0]}`)
          .update({
            isComplete: checked,
          });
      }
    );
  };

  hideClap = () => {
    this.setState({
      clap: false,
    });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  getLottie = () => {
    let lotties = [
      <LottieView
        style={{ marginLeft: 5, height: 50, width: 50 }}
        source={require('../Images/clap.json')}
        autoPlay
        loop
      />,
      <LottieView
        style={{ marginLeft: 5, height: 60, width: 60 }}
        source={require('../Images/trophy.json')}
        autoPlay
        loop
      />,

      <LottieView
        style={{ marginLeft: 5, height: 60, width: 60 }}
        source={require('../Images/star.json')}
        autoPlay
        loop
      />,

      <LottieView
        style={{ marginLeft: 5, height: 60, width: 60 }}
        source={require('../Images/splash.json')}
        autoPlay
        loop
      />,
    ];

    return lotties[Math.floor(Math.random() * lotties.length)];
  };

  render() {
    const { taskName, taskContent, startTime, endTime, isComplete } = this.props.item[1];
    const { modalVisible, clap } = this.state;

    return (
      <Card>
        <TouchableOpacity
          onPress={() => this.setModalVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <CheckBox checkedColor={Colors.bloodOrange} checked={this.state.checked} onPress={this.updateTask} />

          <View>
            <Text style={{ fontSize: Fonts.size.medium, fontWeight: '500', fontFamily: Fonts.type.bold }}>
              {taskName}
            </Text>

            <View style={{ flexDirection: 'row', paddingVertical: 2, alignItems: 'center' }}>
              <Icon name="clock" size={15} color={'#EB8F0D'} style={{ paddingRight: 5 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>{startTime}</Text>
                <Icon style={{ paddingHorizontal: 10 }} name="arrow-right" size={14} color={Colors.bloodOrange} />
                <Text style={{ fontSize: 12 }}>{endTime}</Text>
              </View>
            </View>

            <Text style={{ paddingTop: 4, fontSize: 11, color: '#9C9C9C' }}>{taskContent}</Text>
          </View>

          {clap && this.getLottie()}
        </TouchableOpacity>

        <EditTaskModal
          selectedDate={this.props.selectedDate.selectedDate}
          item={this.props.item}
          visible={modalVisible}
          setModalVisible={this.setModalVisible}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedDate: state.selectedDate,
    deviceId: state.deviceId,
  };
};

export default compose(
  firebaseConnect(props => {}),
  connect(
    mapStateToProps,
    null
  )
)(ListItem);
