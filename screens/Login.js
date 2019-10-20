import React, { Component } from "react";
import { Container, Text, Button, Thumbnail } from 'native-base';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { loginImgur, loginInit } from '../api/imgur'


class Login extends Component {

    componentWillMount() {
        loginInit()
        .then(() => {
            this.props.navigation.navigate('Home');
        })
        .catch(e => e)
    }

    render() {
        return (

            <Container style={styles.background}>
                <Container style={styles.top}>
                    <Text style={styles.logo}>epicture</Text>
                    <Container style={styles.bottom}>
                        <Button style={styles.loginButton}
                            onPress={() => loginImgur().then(() => { this.props.navigation.navigate('Home') })}>
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        </Button>
                        <Button transparent style={{ marginTop: height * 0.01 }}
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
    },
    guestText: {
        color: '#FFF',
        fontSize: 14,
        letterSpacing: 1.2,
    }
});
export default Login