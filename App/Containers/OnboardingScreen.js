import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Images, Colors, Fonts } from '../Themes';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import Emoji from 'react-native-emoji';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OnboardingScreenStyle';

const Screen1 = ({ props }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
      }}
    >
      <Image style={{ width: 150, height: 120 }} source={Images.graphics} />
      <View style={{ margin: 20 }}>
        <Image style={{ height: 60, width: 60, alignSelf: 'flex-end' }} source={Images.logo} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            textAlign: 'right',
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          DAILY
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            textAlign: 'right',
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          TASKINATOR
        </Text>
      </View>
    </View>
    <LottieView style={{ height: 200, width: 200 }} source={require('../Images/stopwatch.json')} autoPlay loop />
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', width: 300 }}>
      Waking up each day not knowing what to do?
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginRight: 10 }}>
        Not to worry, swipe right
      </Text>
      <Emoji name="wink" style={{ fontSize: 24 }} />
    </View>
  </View>
);

const Screen2 = ({ props }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
      }}
    >
      <View style={{ margin: 20 }}>
        <Image style={{ height: 60, width: 60 }} source={Images.logo} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          DAILY
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          TASKINATOR
        </Text>
      </View>
      <Image style={{ width: 150, height: 120 }} source={Images.graphics} />
    </View>
    <LottieView style={{ height: 300, width: 300 }} source={require('../Images/tasks.json')} autoPlay loop />
    <Text style={{ fontSize: 18, textAlign: 'center', width: 300, lineHeight: 21 }}>
      Seize your day with <Text style={{ fontWeight: 'bold', color: '#024449' }}>ISLAM</Text>,{' '}
      <Text style={{ fontWeight: 'bold', color: '#916800' }}>FAMILY</Text>,{' '}
      <Text style={{ fontWeight: 'bold', color: '#21C8B7' }}>WORK</Text> and{' '}
      <Text style={{ fontWeight: 'bold', color: '#FF8762' }}>PERSONAL</Text> activities
    </Text>
    <View style={{ marginTop: 10, width: 300 }}>
      <Text style={{ fontSize: 14, lineHeight: 21, textAlign: 'center' }}>
        Each day, spend sometime to think of 3-5 important tasks for these four areas in your life
      </Text>
    </View>
  </View>
);

const Screen3 = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
      }}
    >
      <Image style={{ width: 150, height: 120 }} source={Images.graphics} />
      <View style={{ margin: 20 }}>
        <Image style={{ height: 60, width: 60, alignSelf: 'flex-end' }} source={Images.logo} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            textAlign: 'right',
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          DAILY
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.bloodOrange,
            textAlign: 'right',
            lineHeight: 21,
            paddingTop: 4,
          }}
        >
          TASKINATOR
        </Text>
      </View>
    </View>
    <LottieView style={{ height: 200, width: 200 }} source={require('../Images/trophy.json')} autoPlay loop />
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', width: 300 }}>
      Live a much more fulfilling life inshaaAllah
    </Text>
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', width: 300 }}>
        Never again will you live your day without adding value to it.
      </Text>
    </View>

    <TouchableOpacity
      style={{
        borderRadius: 8,
        backgroundColor: Colors.bloodOrange,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        marginTop: 25,
      }}
      onPress={() => navigation.navigate('HomeScreen')}
    >
      <Text style={{ fontSize: 14, color: Colors.snow, textAlign: 'center', fontWeight: '600' }}>LETS DO IT</Text>
    </TouchableOpacity>
  </View>
);

class OnboardingScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <Swiper style={{ flex: 1 }} activeDotColor={Colors.bloodOrange}>
        <Screen1 />
        <Screen2 />
        <Screen3 navigation={this.props.navigation} />
      </Swiper>
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
)(OnboardingScreen);
