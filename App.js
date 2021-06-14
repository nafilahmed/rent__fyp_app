import React from 'react';

import AuthLoading from "./src/component/AuthLoading";

import LoginScreen from './src/screens/Login';

import HomeScreen from './src/screens/Home';

import Product from './src/screens/Product';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Register from './src/screens/Register';
import { NavigationContainer } from 'react-navigation';


const DrawerNavigator = createDrawerNavigator({
  Login:{
    screen: LoginScreen,
  },
  Register: {
    screen: Register,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Product: {
    screen: Product,
  }
});

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}