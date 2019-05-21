import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import HomeScreen from '../Containers/HomeScreen';
import OnboardingScreen from '../Containers/OnboardingScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    OnboardingScreen: { screen: OnboardingScreen },
    HomeScreen: { screen: HomeScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

export default createAppContainer(PrimaryNav);
