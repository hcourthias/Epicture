import React, { Component } from "react";
import { Container, Text } from 'native-base';
import { StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import CardImage from '../../components/Card'
import {getUserPosts} from '../../api/imgur'


class Following extends Component {

    state = {
        items: null,
        isReady: false,
        isFetching: false,
    };

    items = null;

    render() {
        return (
            <Container style={styles.background}>
                <ActivityIndicator style={styles.appLoading} size="small" color="#FFF" />
            </Container >
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#11181F',
    },
    cardContent: {
        marginTop: 0,
        marginHorizontal: 5
    },
    appLoading: {
        flex: 1,
        justifyContent: 'center'
      },
});
export default Following