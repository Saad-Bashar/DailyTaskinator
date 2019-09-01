/**
 * @format
 */

import '../App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from '../App/Containers/App'

// AppRegistry.registerComponent('Trevo', () => App)


// import 'react-native';
// import React from 'react';
// import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
