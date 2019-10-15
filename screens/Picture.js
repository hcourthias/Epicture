import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Icon } from 'native-base';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { loginImgur } from '../api/imgur'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class Picture extends Component {

    state = {
        pictureUri: null
    }

    componentDidMount() {
    }


    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        if (!result.cancelled) {
            this.setState({ pictureUri: result.uri })
            this.props.navigation.navigate('PostPicture', {
                image: result,
            })
        }
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        });
        if (!result.cancelled) {
            this.setState({ pictureUri: result.uri })
            this.props.navigation.navigate('PostPicture', {
                image: result,
            })
        }
    };

    render() {
        if (this.state.pictureUri == null)
            return (
                <Container style={styles.background}>
                    <Button style={styles.button}
                        onPress={() => this.takePicture()}>
                        <Icon name="camera" style={{ color: '#FFF', fontSize: 50 }} />
                        <Text style={styles.buttonText}>Take a picture</Text>
                    </Button>
                    <Button style={styles.button}
                        onPress={() => this.selectPicture()}>
                        <Icon name="image" style={{ color: '#FFF', fontSize: 50 }} />
                        <Text style={styles.buttonText}>Pick a picture from the gallery</Text>
                    </Button>
                </Container>
            )
        else
            return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" color="#FFF" />
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#17202A',
        alignItems: 'center',
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
        fontSize: 18,
        letterSpacing: 1.2,
        textAlign: 'center',
    },
    textInput: {
        fontSize: 20,
        backgroundColor: 'white',
        marginLeft: width * 0.1,
        marginRight: width * 0.1,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 4,
    },
});
export default Picture