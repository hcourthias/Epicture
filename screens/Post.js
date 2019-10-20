import React, { Component } from "react";
import { Container, Text, Button, Header, Left, Right, Icon, Input, Item, Content, Body, Thumbnail } from 'native-base';
import { StyleSheet, Dimensions, AsyncStorage, ActivityIndicator, Image, StatusBar, Alert, BackHandler } from 'react-native'
import { loginImgur, uploadImage, getImageComments } from '../api/imgur'
import CardImage from '../components/Card'

class Post extends Component {

    state = {
        data: {},
        images: {},
        comments: []
    }

    backHandler = null

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({ data: navigation.getParam('data', {}),
                        images: navigation.getParam('image', {}) })
        getImageComments(navigation.getParam('data', {}).id)
        .then((result) => {
            this.setState({comments: result});
        })
        .catch((e => e));
    }

    render() {
        console.log("HEHEHEH");
        console.log(this.state.data)
        return (
            <Container style={styles.background}>
                <Header style={styles.header}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" style={{ color: '#FFF', fontSize: 30 }} />
                    </Button>
                    <Body>
                        <Text style={styles.titleText}>{this.state.data.title}</Text>
                    </Body>
                </Header>
                <Content>
                <CardImage image={this.state.images}
                    item={this.state.data}
                    header={true}
                    navigation={this.props.navigation} />
                </Content>
            </Container>
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#11181F',
        flex: 1,
    },
    content: {
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#17202A',
        paddingRight: 5,
        marginTop: StatusBar.currentHeight
    },

    titleText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    descText: {
        color: '#FFF',
        fontSize: 14,
    },
    usernameAvatar: {
        height: 25,
        width: 25
    },
});
export default Post