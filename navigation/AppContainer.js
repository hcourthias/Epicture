import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {Icon} from 'native-base'

import Login from '../screens/Login'
import Home from '../screens/Home'



const HomeTabs = createBottomTabNavigator({
        Feed: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="home" size={30} style={{color:tintColor}} />
              )
        },
        },
        Search: {
        screen: Login,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="search" size={30} style={{color:tintColor}} />
              )
        },
        },
        Discover: {
        screen: Login,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="person" size={30} style={{color:tintColor}}  />
              )
        },
        },
    },
    {
        tabBarOptions : {
            style: {
              backgroundColor: '#11181F',
            },
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            showIcon: true
          }
    }
  )
  
const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Home: {
            screen: HomeTabs
        },
    },
    {
        initialRouteName: 'Login'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer;