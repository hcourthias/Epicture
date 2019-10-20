import React from "react";
import { Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, Image, View, TouchableOpacity } from 'react-native'
import { downvoteImage, upvoteImage, vetovoteImage, favImage, getUserAvatar } from '../api/imgur'
import { Video } from 'expo-av';

export default class CardImage extends React.PureComponent {

    state = {
        result: null,
        upVoted: this.props.item.vote === "up" ? true : false,
        downVoted: this.props.item.vote === "down" ? true : false,
        fav: this.props.item.favorite,
        ups: this.props.item.ups,
        downs: this.props.item.downs,
        shouldPlay: false,
        isLooping: false,
        showIcon: true,
    };

    isUpVoted() {
        tmp = !this.state.upVoted
        tmp2 = this.state.ups
        tmp3 = this.state.downs

        this.setState({ upVoted: tmp });
        if (tmp) {
            upvoteImage(this.props.item.id).then((data) => {
                console.log(data)
            })
            this.setState({ ups: tmp2 + 1 });
            if (this.state.downVoted) {
                this.setState({ downs: tmp3 - 1, downVoted: false });
            }
        } else {
            this.setState({ ups: tmp2 - 1 });
            vetovoteImage(this.props.item.id).then((data) => {
                console.log(data)
            })
        }
    }
    isDownVoted() {
        tmp = !this.state.downVoted
        tmp2 = this.state.downs
        tmp3 = this.state.ups

        this.setState({ downVoted: tmp });
        if (tmp) {
            downvoteImage(this.props.item.id).then((data) => {
                console.log(data)
            })
            this.setState({ downs: tmp2 + 1 });
            if (this.state.upVoted) {
                this.setState({ ups: tmp3 - 1, upVoted: false });
            }
        } else {
            this.setState({ downs: tmp2 - 1 });
            vetovoteImage(this.props.item.id).then((data) => {
                console.log(data)
            })
        }
    }

    isFav() {
        tmp = !this.state.fav

        this.setState({ fav: tmp });
        favImage(this.props.item.id).then((data) => {
        })
    }

    render() {
        console.log(this.props.image)
        return (
            <Card transparent>
                <CardItem style={styles.card}>
                    <Left>
                        <Thumbnail source={{ uri: `https://imgur.com/user/${this.props.item.account_url}/avatar?maxwidth=290` }} />
                        <Body>
                            <Text style={styles.title}>{this.props.item.title}</Text>
                            <Text style={styles.username}>{this.props.item.account_url}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { data: this.props.item })
                    }>
                        <Image source={{ uri: `https://i.imgur.com/${this.props.image.id}.gif` }}
                            style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }} />
                        {this.props.image.type.includes('video') && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon style={{ fontSize: 50, color: 'white' }} name='play' />
                        </View>}
                    </TouchableOpacity>
                </CardItem>
                <CardItem style={styles.card}>
                    <Left>
                        <Button transparent onPress={() => this.isUpVoted()}>
                            <Icon style={this.state.upVoted ? styles.active : styles.white} name="arrow-up" />
                            <Text style={styles.white}>{this.state.ups}</Text>
                        </Button>
                        <Button transparent onPress={() => this.isDownVoted()}>
                            <Icon style={this.state.downVoted ? styles.active : styles.white} name="arrow-down" />
                            <Text style={styles.white}>{this.state.downs}</Text>
                        </Button>
                        <Button transparent onPress={() => this.isFav()}>
                            <Icon style={this.state.fav ? styles.active : styles.white} name="heart" />
                            <Text style={styles.white}>{this.props.item.favorite_count}</Text>
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
    white: {
        color: 'white',
    },
    active: {
        color: '#19B76F',
    },
    title: {
        color: 'white',
        fontSize: 18
    },
    username: {
        color: 'white',
        fontSize: 14
    },
    playView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playIcon: {
        color: 'white',
        fontSize: 50
    },
});
