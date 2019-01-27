import { createStore, applyMiddleware, compose } from 'redux'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase';



// creates the store
export default (rootReducer, rootSaga) => {

  /* ------------- Firebase Configuration ------------- */
  const reduxFirebaseConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    enableRedirectHandling: false
  };
  
  const firebaseConfig = {
    apiKey: "AIzaSyCEGbvgREy6E1Jf5hDh5AReXiBtwsuqlnQ",
    authDomain: "dailytaskinator-6d5be.firebaseapp.com",
    databaseURL: "https://dailytaskinator-6d5be.firebaseio.com",
    projectId: "dailytaskinator-6d5be",
    storageBucket: "dailytaskinator-6d5be.appspot.com",
    messagingSenderId: "566725824313"
  };
  
  const fb = firebase.initializeApp(firebaseConfig);
  
  
  const firebaseEnhancer = compose(
    reactReduxFirebase(fb, reduxFirebaseConfig),
  );

  const enhancer = composeWithDevTools(
    {
      // Options: https://github.com/jhen0409/react-native-debugger#options
    },
  )(firebaseEnhancer);
  


  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
  )
  middleware.push(navigationMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(enhancer)
  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
