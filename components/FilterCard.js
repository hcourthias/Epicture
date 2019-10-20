import React from "react";
import {Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native'


export default class CardImage extends React.PureComponent {

    render() {
        return (
            <ImageBackground source={{ uri: `https://i.imgur.com/${this.props.tag.background_hash}.png` }}
            style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 10,
            backgroundColor: '#' + this.props.tag.accent}}
            imageStyle={{ opacity: 0.8 }}>
                <Text style={styles.tagText}>{this.props.tag.name}</Text>
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
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
});
