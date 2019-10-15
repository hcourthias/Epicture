import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Header, Body, Tab, Tabs } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, FlatList, ImageBackground } from 'react-native'
import Post from './ProfileTabs/Post'
import Favorites from './ProfileTabs/Favorites.js'
import Following from './ProfileTabs/Following.js'
import Comments from './ProfileTabs/Comments.js'
import {getUserProfile, isSignedIn} from '../api/imgur'
class Profile extends Component {

    state = {
        isSignIn: false,
        userInfo: {}
    };

    componentWillMount() {
        if (isSignedIn()) {
            this.setState({isSignIn: true})
        }
        getUserProfile().then((result) => {
            this.setState({userInfo: result})
            this.setState({isSignIn: true})
        })
    }

    render() {
        if (!this.state.isSignIn) {
            return (
                <Container style={styles.centerContainer}>
                    <Button style={styles.loginButton}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </Button>
                </Container >
            )
        }
        return (
            <Container style={styles.background}>
                <ImageBackground
                    source={{ uri: this.state.userInfo.cover }}
                    style={{ width: width, height: height * 0.2, justifyContent: 'center' }}
                    imageStyle={{ opacity: 0.8 }}>
                    <Header transparent>
                        <StatusBar barStyle="light-content" />
                        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Thumbnail source={{ uri: this.state.userInfo.avatar }} />
                            <Text style={styles.username}>{this.state.userInfo.username}</Text>
                            <Text style={styles.info}>{this.state.userInfo.reputation_name} • {this.state.userInfo.reputation} Points</Text>
                            <Text style={styles.date}>Created Oct 13, 2019</Text>

                        </Body>
                    </Header>
                </ImageBackground>
                <Tabs tabStyle>
                    <Tab activeTabStyle={{backgroundColor: '#11181F'}}
                    tabStyle={{backgroundColor: '#11181F'}}
                    heading="Posts"><Post/></Tab>
                    <Tab activeTabStyle={{backgroundColor: '#11181F'}}
                    tabStyle={{backgroundColor: '#11181F'}}
                    heading="Favorites"><Favorites/></Tab>
                    <Tab activeTabStyle={{backgroundColor: '#11181F'}}
                    tabStyle={{backgroundColor: '#11181F'}}
                    heading="Following"><Following/></Tab>
                    <Tab activeTabStyle={{backgroundColor: '#11181F'}}
                    tabStyle={{backgroundColor: '#11181F'}}
                    heading="Comments"><Comments/></Tab>
                </Tabs>

            </Container >
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#11181F',
    },
    header: {
        backgroundColor: '#11181F',
    },

    username: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    },

    info: {
        color: 'white',
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2
    },
    date: {
        color: 'white',
        fontSize: 12,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#11181F',
    },
    loginButton: {
        backgroundColor: '#19B76F',
        width: width * 0.47,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'VAGRounderStd'
    },
});
export default Profile