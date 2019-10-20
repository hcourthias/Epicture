import React from "react";
import { Text, Button, Thumbnail, Card, CardItem, Left, Right, Body, Icon } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, TouchableHighlight } from 'react-native'
import {downvoteImage, upvoteImage, vetovoteImage, favImage} from '../api/imgur'

export default class CardVideo extends React.PureComponent {

    state = {
        result: null,
        upVoted: false,
        downVoted: false,
        fav: false,
        ups: this.props.item.ups,
        downs: this.props.item.downs
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
        }else {
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
        } else
            this.setState({ downs: tmp2 - 1 });
            vetovoteImage(this.props.item.id).then((data) => {
                console.log(data)
            })
    }

    isFav() {
        tmp = !this.state.fav

        this.setState({ fav: tmp }); 
        favImage(this.props.image.id).then((data) => {
            console.log(data)
        })
    }
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
                    <Image source={{ uri: `https://i.imgur.com/${this.props.image.id}.gif` }} style={{ aspectRatio: this.props.image.width / this.props.image.height, flex: 1 }} />
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
    }
});