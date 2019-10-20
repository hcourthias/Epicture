import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon, Header, Text } from 'native-base'
import {createStackNavigator} from 'react-navigation-stack'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';


import Login from '../screens/Login'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import Picture from '../screens/Picture'
import PostPicture from '../screens/PostPicture'
import Post from '../screens/Post'

const PostNavigator = createStackNavigator({
    Home: { screen: Home },
    Post: { screen: Post },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },  
})

const HomeTabs = createBottomTabNavigator({
    Feed: {
        screen: PostNavigator,
        navigationOptions: {
            title: "tutu",
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="home" size={30} style={{ color: tintColor }} />
            )
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="search" size={30} style={{ color: tintColor }} />
            )
        },
    },
    Picture: {
        screen: Picture,
        navigationOptions: {
            tabBarLabel: 'Camera',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="camera" size={30} style={{ color: tintColor }} />
            )
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "33",
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, horizontal, tintColor }) => (
                <Icon name="person" size={30} style={{ color: tintColor }} />
            )
        },
    },
},
    {
        tabBarOptions: {
            style: {
                backgroundColor: '#11181F',
            },
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            showIcon: true,
            showLabel: false
        }
    }
)


const SwitchNavigator = createAnimatedSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Home: {
            screen: HomeTabs
        },
        PostPicture: {
            screen: PostPicture
        },
    },
    {
        initialRouteName: 'Login',
        transition: (
            <Transition.Together>
              <Transition.Out
                type="slide-top"
                durationMs={200}
                interpolation="easeIn"
              />
              <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
          ),
    }
)

const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer;