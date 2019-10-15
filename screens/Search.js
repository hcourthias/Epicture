import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Header, Item, Icon, Input } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, FlatList, ImageBackground } from 'react-native'
import Post from './ProfileTabs/Post'
import Favorites from './ProfileTabs/Favorites.js'
import Following from './ProfileTabs/Following.js'
import Comments from './ProfileTabs/Comments.js'
import {getUserProfile} from '../api/imgur'
class Search extends Component {

    state = {
    };

    componentWillMount() {
    }

    render() {
        return (
            <Container style={styles.background}>
          <Header searchBar autoCorrect={false} style={styles.header}>
            <Item style={styles.header}>
              <Icon style = {styles.iconSearch} name="search" />
              <Input style = {styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#DCDCDC" 

              />
            </Item>
          </Header>
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
        backgroundColor: '#19B76F',
    },

    user: {
        backgroundColor: '#19B76F',
    },


    iconSearch: {
        color: '#FFF',
    },

    searchInput: {
        color: 'white',
        fontWeight: 'bold'
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
export default Search