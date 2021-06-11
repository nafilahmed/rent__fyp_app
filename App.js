import React from 'react';

import AuthLoading from "./src/component/AuthLoading";

import LoginScreen from './src/screens/Login';

import HomeScreen from './src/screens/Home';

import Product from './src/screens/Product';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Register from './src/screens/Register';

const StackNavigator = createStackNavigator(
  {
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions: {
    //     // headerShown: false
    //   },
    // },
    Product: {
      screen: Product,
      navigationOptions: {
        // headerShown: false
      },
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        // headerShown: false
      },
    }
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}