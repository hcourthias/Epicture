import React from 'react'
import { Root } from "native-base";
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';


import * as Font from 'expo-font';
import AppContainer from './navigation/AppContainer.js'


export default class App extends React.Component {

  state = { loading: true };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      VAGRounderStd: require("./assets/fonts/VAGRoundedStd.otf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <StatusBar barStyle="light-content" /> 
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <StatusBar barStyle="light-content" /> 
        <AppContainer />
      </Root>
    );
  }
}