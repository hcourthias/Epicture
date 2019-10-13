import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login'

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
    },
    {
        initialRouteName: 'Login'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)
export default AppContainer;