import React, { Component } from 'react'
import { Text, Image, View, Animated } from 'react-native'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Images, Colors, Fonts } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  state = {
    animation: new Animated.Value(1),
    opacityAnimation: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 600
      }),
      Animated.timing(this.state.opacityAnimation, {
        toValue: 1,
        duration: 600
      }),
    ]).start(() => this.setAuth());
  }

  setAuth = () => {
    const auth = this.props.firebase.auth();
    const { navigation } = this.props;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate('HomeScreen');
      } else {
        auth.signInAnonymously()
        .then(() => navigation.navigate('HomeScreen'))
        .catch(function(error) {
          console.error(error);
        });
      }
    });
  }

  render () {
    const opacityInterpolate = this.state.opacityAnimation.interpolate({
      inputRange: [0,1],
      outputRange: [0,1]
    });

    const animatedStyles = {
      transform: [
        { scale: this.state.animation }
      ]
    };

    return (
      <View style={[{ flex: 1 }, styles.centered,]}>
        <Animated.View style={[animatedStyles]}>
          <Image source={Images.logoNew} style={styles.logo} />
        </Animated.View>
        <Animated.View 
          style={[{textAlign: 'center', paddingTop: 40 }, {opacity: opacityInterpolate}]}
        >
          <Text style={{ color: Colors.fire, fontSize: Fonts.size.h6 }}>
            Daily Taskinator
          </Text>
        </Animated.View>
      </View>
      
    )
  }
}

export default compose(
  firebaseConnect(() => {
    return [
      
    ]
  }),
  connect(
    (state) => {
      return {

      }
    } 
  )
)(LaunchScreen)