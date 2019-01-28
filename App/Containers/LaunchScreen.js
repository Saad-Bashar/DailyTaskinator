import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  componentDidMount() {
    const auth = this.props.firebase.auth();
    const { navigation } = this.props;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        navigation.navigate('HomeScreen')
      } else {
        console.log("User is not signed in.")
        auth.signInAnonymously()
        .then(() => navigation.navigate('HomeScreen'))
        .catch(function(error) {
          console.error(error);
        });
      }
    });
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

          <DevscreensButton />
        </ScrollView>
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
