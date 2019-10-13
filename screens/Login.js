import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Input, Item, Toast } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native'
import {AuthSession} from 'expo'

class Login extends Component {

    state = {
        result: null,
      };

    handleLogin = async() => {
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log(redirectUrl);
        let result = await AuthSession.startAsync({
          authUrl:
          `https://api.imgur.com/oauth2/authorize?client_id=12a03496907db29&response_type=token` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`});
          Toast.show({ text: "Welcome " + result.params.account_username, buttonText: 'OK', textStyle: { fontSize: 12 } })
        this.setState({ result });
    }

    render() {
        return (

            <Container style={styles.background}>
                <Container style={styles.top}>
                    <Text style={styles.logo}>epicture</Text>
                    <Container style={styles.bottom}>
                        <Button style={styles.loginButton}
                            onPress={() => this.handleLogin()}>
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        </Button>
                        <Button transparent style={{marginTop: height * 0.01}}
                        onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={styles.guestText}>CONTINUE AS GUEST</Text>
                        </Button>
                    </Container>
                </Container>
            </Container >
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#17202A',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#17202A',
        alignItems: 'center',
        marginBottom: height * 0.07
    },
    top: {
        marginTop: height * 0.23,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#17202A',
    },
    logo: {
        fontFamily: 'VAGRounderStd',
        fontSize: 60,
        color: '#FFF',
    },
    loginButton: {
        backgroundColor: '#19B76F',
        width: width * 0.47,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'VAGRounderStd'
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'Avenir'
    },
    guestText: {
        color: '#FFF',
        fontSize: 14,
        letterSpacing: 1.2,
        fontFamily: 'Avenir'
    }
});
export default Login