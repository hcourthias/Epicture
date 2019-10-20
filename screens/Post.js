import React, { Component } from "react";
import { Container, Text, Button, Header, Left, Right, Icon, Input, Item, Content } from 'native-base';
import { StyleSheet, Dimensions, AsyncStorage, ActivityIndicator, Image, StatusBar, Alert, BackHandler } from 'react-native'
import { loginImgur, uploadImage } from '../api/imgur'

class Post extends Component {

    state = {
        image: {},
        title: null,
        desc: "",
        buttonDisabled: true,
    }

    backHandler = null

    componentWillMount() {
        const { navigation } = this.props;
        this.setState({ image: navigation.getParam('image', {}) })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleCancelation);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleCancelation = () => {
        this.props.navigation.navigate('Post')
        return true
    }

    checkInputTitle = (title) => {
        this.setState({ title })
        if (title.length == 0 || title.trim().length == 0)
            this.setState({ buttonDisabled: true })
        else {
            this.setState({ buttonDisabled: false })
        }
    }


    uploadImage = () => {
        let formData = new FormData();
        formData.append("image", this.state.image.base64);
        formData.append("type", "base64");
        formData.append("title", this.state.title)
        formData.append("description", this.state.desc)
        uploadImage(formData).then((data) => {
        })
    }
    render() {
        return (
            <Container style={styles.background}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent
                            onPress={() => this.handleCancelation()}>
                            <Icon name="close" style={{ color: '#FFF', fontSize: 30 }} />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent disabled={this.state.buttonDisabled}
                            onPress={() => this.uploadImage()}>
                            <Text style={this.state.buttonDisabled ? styles.buttonTextDisabled : styles.buttonText}>POST</Text>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.content}>
                    <Item regular style={styles.titleInput}>
                        <Input placeholder='Post Title (required)'
                            value={this.state.title}
                            placeholderTextColor='grey'
                            style={styles.titleText}
                            onChangeText={title => this.checkInputTitle(title)}
                            returnKeyType='search'
                            onSubmitEditing={this.checkInputTitle}
                            clearButtonMode="while-editing" />
                    </Item>
                    <Image source={{ uri: this.state.image.uri }}
                        style={{
                            aspectRatio: this.state.image.width / this.state.image.height,
                            width: width * 0.95,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                        }} />
                    <Item regular style={styles.descInput}>
                        <Input placeholder='Add description.'
                            value={this.state.desc}
                            style={styles.descText}
                            placeholderTextColor='grey'
                            onChangeText={desc => this.setState({ desc })}
                        />
                    </Item>
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
    button: {
        backgroundColor: '#19B76F',
        height: height * 0.25,
        width: width * 0.9,
        marginTop: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'VAGRounderStd',
        flexDirection: 'column'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonTextDisabled: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
    },
    titleInput: {
        fontSize: 20,
        backgroundColor: '#17202A',
        marginLeft: width * 0.024,
        marginRight: width * 0.024,
        marginBottom: 10,
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'transparent'
    },

    descInput: {
        fontSize: 14,
        backgroundColor: '#17202A',
        marginLeft: width * 0.024,
        marginRight: width * 0.024,
        marginBottom: 100,
        alignItems: 'center',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,

        borderColor: 'transparent'
    },

    titleText: {
        color: '#FFF',
        fontSize: 16,
    },

    descText: {
        color: '#FFF',
        fontSize: 14,
    },
});
export default Post