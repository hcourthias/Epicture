import React from 'react'
import {createAppContainer ,createSwitchNavigator} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {Icon, Header, Text} from 'native-base'


import Login from '../screens/Login'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Search from '../screens/Search'


const HomeTabs = createBottomTabNavigator({
        Feed: {
        screen: Home,
        navigationOptions: {
            title: "tutu",
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="home" size={30} style={{color:tintColor}} />
              )
        },
        },
        Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="search" size={30} style={{color:tintColor}} />
              )
        },
        },
        Profile: {
        screen: Profile,
        navigationOptions: {
            title: "33",
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
        initialRouteName: 'Login',
    }
)

const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer;