import React, { Component } from 'react';
import { Text, Image, View, Animated, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Images, Colors, Fonts } from '../Themes';

// Styles
import styles from './Styles/LaunchScreenStyles';

class LaunchScreen extends Component {
  state = {
    animation: new Animated.Value(1),
    opacityAnimation: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.stagger(200, [
      Animated.timing(this.state.animation, {
        toValue: 3,
        duration: 600,
      }),
      Animated.timing(this.state.opacityAnimation, {
        toValue: 1,
        duration: 600,
      }),
    ]).start(() => this.navigateUser());
  }

  navigateUser = async () => {
    const { navigation } = this.props;

    try {
      const value = await AsyncStorage.getItem('onboarding');
      if (value !== null) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('OnboardingScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const opacityInterpolate = this.state.opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const animatedStyles = {
      transform: [{ scale: this.state.animation }],
    };

    return (
      <View style={[{ flex: 1 }, styles.centered]}>
        <Animated.View style={[animatedStyles]}>
          <Image source={Images.logo} style={styles.logo} />
        </Animated.View>
        <Animated.View style={[{ textAlign: 'center', paddingTop: 70 }, { opacity: opacityInterpolate }]}>
          <Text style={{ color: Colors.bloodOrange, fontSize: 22, fontFamily: Fonts.type.bold }}>DAILY TASKINATOR</Text>
        </Animated.View>
      </View>
    );
  }
}

export default compose(
  firebaseConnect(() => {
    return [];
  }),
  connect(state => {
    return {};
  })
)(LaunchScreen);
