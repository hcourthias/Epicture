import React from 'react'
import {Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native'


export default class Comment extends React.PureComponent {


    state = {
        upVoted: false,
        downVoted: false,
        fav: this.props.item.favorite ? true : false,
        ups: this.props.item.ups,
        downs: this.props.item.downs,
    };

    render() {
        return (
            <Card transparent>
                <CardItem style={styles.card}>
                    <Left>
                        <Thumbnail  style={styles.usernameAvatar} source={{ uri: `https://imgur.com/user/${this.props.item.author}/avatar?maxwidth=290` }} />
                        <Body>
                            <Text style={styles.username}>{this.props.item.author}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem style={styles.cardItem}>
                        <Text style={styles.title}>{this.props.item.comment}</Text>
                </CardItem>
                <CardItem style={styles.cardItem}>
                    <Left>
                        <Button transparent>
                            <Icon style={this.state.upVoted ? styles.active : styles.white} name="arrow-up" />
                            <Text style={styles.white}>{this.state.ups}</Text>
                        </Button>
                        <Button transparent>
                            <Icon style={this.state.downVoted ? styles.active : styles.white} name="arrow-down" />
                            <Text style={styles.white}>{this.state.downs}</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#17202A',
    },

    cardItem: {
        backgroundColor: '#17202A',
        paddingTop: 0,
        paddingBottom: 0
    },
    white: {
        color: 'white',    
    },
    title: {
        color: 'white',
        fontSize: 14   
    },
    username: {
        color: 'white', 
        fontSize: 14,
        fontWeight: 'bold'   
    },
    usernameAvatar: {
        height: 25, 
        width: 25
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
