import React, { Component } from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

// Styles
import styles from './Styles/RootContainerStyles';
import { Colors } from '../Themes';

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.applicationView}>
        <StatusBar backgroundColor={Colors.bloodOrange} barStyle="light-content" />
        <ReduxNavigation />
      </SafeAreaView>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  null,
  mapDispatchToProps
)(RootContainer);
