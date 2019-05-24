import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Images, Colors } from '../Themes';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkIcon from 'react-native-vector-icons/MaterialIcons';
import PersonalIcon from 'react-native-vector-icons/Ionicons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
// import styles from './Styles/OnboardingScreenStyle';

// const styles = StyleSheet.create({
//   mainContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   image: {
//     width: 320,
//     height: 320,
//   },
//   text: {
//     color: '#303030',
//     backgroundColor: 'transparent',
//     textAlign: 'center',
//     paddingHorizontal: 16,
//   },
//   title: {
//     fontSize: 22,
//     color: 'white',
//     backgroundColor: 'transparent',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
// });

const slides = [
  {
    index: 0,
    key: 'somethun',
    title: 'NEVER FEEL UNPRODUCTIVE',
    // text: 'Your one sheet hack for a much more fulfilling life inshaAllah.',
    // image: require('./assets/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    index: 1,
    key: 'somethun-dos',
    title: 'CATEGORIZE YOUR TASKS',
    text: 'Categorize your tasks into four categories - Islam, Family, Personal, Work',
    // image: require('./assets/2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    key: 'somethun1',
    title: 'SCHEDULE YOUR PRIORITY',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    // image: require('./assets/3.jpg'),
    backgroundColor: '#22bcb5',
  },
];

class OnboardingScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  _renderItem = item => {
    console.log(item);
    return (
      <View style={{ flex: 1 }}>
        {item.index === 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image
              style={{ height: 150, width: 150, alignSelf: 'flex-start' }}
              resizeMode="cover"
              source={Images.graphics}
            />

            <View style={{ padding: 20 }}>
              <Image style={{ height: 60, width: 60, alignSelf: 'flex-end' }} source={Images.logo} />
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    color: Colors.bloodOrange,
                    paddingTop: 10,
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}
                >
                  DAILY
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    color: Colors.bloodOrange,
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}
                >
                  TASKINATOR
                </Text>
              </View>
            </View>
          </View>
        )}

        {item.index == 1 && (
          <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 150, width: 200, alignSelf: 'center' }}
              resizeMode="cover"
              source={Images.graphicsCenter}
            />
            <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 50 }}>
              <View
                style={{
                  backgroundColor: Colors.bloodOrange,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  marginRight: 5,
                  width: 60,
                  paddingVertical: 5,
                }}
              >
                <MatIcon name="islam" size={32} color={Colors.snow} />
              </View>

              <View
                style={{
                  backgroundColor: Colors.bloodOrange,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  width: 60,
                  paddingVertical: 5,
                }}
              >
                <MatIcon name="human-male-female" size={32} color={Colors.snow} />
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: Colors.bloodOrange,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  marginRight: 5,
                  width: 60,
                  paddingVertical: 5,
                }}
              >
                <WorkIcon name="work" size={32} color={Colors.snow} style={{ paddingRight: 5 }} />
              </View>

              <View
                style={{
                  backgroundColor: Colors.bloodOrange,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  width: 60,
                  paddingVertical: 5,
                }}
              >
                <PersonalIcon name="ios-man" size={32} color={Colors.snow} />
              </View>
            </View>
          </View>
        )}

        <View style={{ marginTop: 50, alignSelf: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#303030' }}>{item.title}</Text>
        </View>

        {/* <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#9999', paddingTop: 10, width: 400 }}>{item.text}</Text> */}

        {item.index === 2 && (
          <View style={{ position: 'absolute', top: 0, alignSelf: 'flex-start', padding: 20 }}>
            <Image style={{ height: 60, width: 60, alignSelf: 'flex-start' }} source={Images.logo} />
            <View>
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.bloodOrange,
                  paddingTop: 10,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                DAILY
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.bloodOrange,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}
              >
                TASKINATOR
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        dotStyle={{ backgroundColor: 'rgba(242, 145, 0, 0.3)' }}
        activeDotStyle={{ backgroundColor: 'rgba(242, 145, 0, 1)' }}
        onDone={() => this.props.navigation.navigate('HomeScreen')}
        bottomButton
        buttonStyle={{ backgroundColor: Colors.bloodOrange, borderRadius: 8 }}
      />
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
