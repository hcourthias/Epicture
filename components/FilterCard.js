import React from "react";
import {Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native'


export default class CardImage extends React.PureComponent {

    render() {
        return (
            <ImageBackground source={{ uri: 'https://i.imgur.com/oB1KOoT.png' }}
            style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 10}}
            imageStyle={{ opacity: 0.8 }}>
                <Button transparent><Text style={styles.tagText}>Lego</Text></Button>
          </ImageBackground>
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#17202A',    
    },
    white: {
        color: 'white',    
    },
    title: {
        color: 'white',
        fontSize: 18   
    },
    username: {
        color: 'white', 
        fontSize: 14   
    },
    tagText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});
