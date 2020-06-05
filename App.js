/* eslint-disable */
import React, {
  Component,
  Container
} from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import {
  createStackNavigator
} from 'react-navigation-stack'
import Login from './screens/Login'
import Home from './screens/Home'
import Details from './screens/Details'
import Wishlist from './screens/Wishlist'
import Scryfall from './screens/Scryfall'
import Assistant from './screens/Assistant'
import Register from './screens/Register'
import Loading from './screens/Loading'

import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC_Hg6C38tjnE9NS4MphHyLOS1AiluyBn0",
  authDomain: "compras-c63a7.firebaseapp.com",
  databaseURL: "https://compras-c63a7.firebaseio.com",
  projectId: "compras-c63a7",
  storageBucket: "compras-c63a7.appspot.com",
  messagingSenderId: "411293019784",
  appId: "1:411293019784:web:c50ce5acdb956da76cb93d",
  measurementId: "G-N4SBXPV4D4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: Home,
  Details: Details,
  Wishlist: Wishlist,
  Scryfall: Scryfall,
  Assistant: Assistant,
});

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
  Loading: Loading,
});

export default createAppContainer(
  createSwitchNavigator({
    Loading: Loading,
    App: AppStack,
    Auth: AuthStack
  }, {
    initialRouteName: "Loading"
  })
);