/* eslint-disable */
import React, { Component, Container } from 'react';
import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Login from './screens/Login'
import Home from './screens/Home'
import Details from './screens/Details'



class App extends Component {
  render() {return (<Container />);}
}

const AppNavigator = createStackNavigator(
  {
    Login:Login,    
    Home:Home,
    Details:Details
    
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);