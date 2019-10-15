import React from "react";
import {Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar } from 'react-native'


export default class CardImage extends React.PureComponent {

    state = {
        result: null,
    };

    render() {
        return (
                <Card transparent>
                    <CardItem style={styles.card}>
                        <Left>
                            <Thumbnail source={{ uri: 'https://image.noelshack.com/fichiers/2019/41/7/1570993072-70585617-3097304210311586-7609197454411431936-n-1.jpg' }} />
                            <Body>
                                <Text style={styles.title}>{this.props.item.title}</Text>
                                <Text style={styles.username}>{this.props.item.account_url}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: `https://i.imgur.com/${this.props.image.id}.jpg` }} style={{aspectRatio: this.props.image.width/this.props.image.height, flex: 1 }} />
                    </CardItem>
                    <CardItem style={styles.card}>
                        <Left>
                            <Button transparent>
                                <Icon style={styles.white} name="arrow-up" />
                                <Text style={styles.white}>{this.props.item.ups}</Text>
                            </Button>
                            <Button transparent>
                                <Icon style={styles.white} name="arrow-down" />
                                <Text style={styles.white}>{this.props.item.downs}</Text>
                            </Button>
                            <Button transparent>
                                <Icon style={styles.white} name="heart" />
                                <Text style={styles.white}>{this.props.item.favorite_count}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Icon style={styles.white} name="share" />
                                <Text style={styles.white}>share</Text>
                            </Button>
                        </Right>
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
    }
});
