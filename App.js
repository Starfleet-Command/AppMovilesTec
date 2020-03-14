/* eslint-disable */
import React, { Component, Container } from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './screens/Login'
import Home from './screens/Home'
import Details from './screens/Details'
import Wishlist from './screens/Wishlist'
import Scryfall from './screens/Scryfall'
import Assistant from './screens/Assistant'



class App extends Component {
  render() { return (<Container />); }
}

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    Home: Home,
    Details: Details,
    Wishlist: Wishlist,
    Scryfall: Scryfall,
    Assistant: Assistant,

  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);