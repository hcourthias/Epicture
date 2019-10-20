import React, { Component } from "react";
import { Container, Text, Button, Header, Left, Right, Icon, Input, Item, Content, Body, Thumbnail } from 'native-base';
import { StyleSheet, Dimensions, View, ActivityIndicator, Image, StatusBar, FlatList, BackHandler } from 'react-native'
import { loginImgur, uploadImage, getImageComments } from '../api/imgur'
import CardFullPost from '../components/CardFullPost'
import Comment from '../components/Comment'
import { Video } from 'expo-av';

class Post extends Component {

    state = {
        data: {},
        comments: []
    }

    backHandler = null

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({ data: navigation.getParam('data', {}) })
        getImageComments(navigation.getParam('data', {}).id)
            .then((result) => {
                this.setState({ comments: result });
            })
            .catch((e => e));
    }

    render() {
        return (
            <Container style={styles.background}>
                <Header style={styles.header}>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" style={{ color: '#FFF', fontSize: 30 }} />
                    </Button>
                    <Body>
                        <Text style={styles.titleText}>Post</Text>
                    </Body>
                </Header>
                <Content>
                    <CardFullPost image={this.state.data.images[0]}
                        item={this.state.data}
                        navigation={this.props.navigation} />
                    <View>
                        <FlatList
                            data={this.state.comments}
                            initialNumToRender={5}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                    return <Comment item={item} />
                            }}
                        />
                    </View>
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