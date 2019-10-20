import React, { Component } from "react";
import { Container, Text } from 'native-base';
import { StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import CardImage from '../components/Card'
import { getGalleryTop, getUserAvatar } from '../api/imgur'


class Home extends Component {

    state = {
        isReady: false,
        isFetching: false,
        items: null,
    };


    componentWillMount() {
        getGalleryTop().then((data) => {
            this.state.items = data;
            this.setState({ isReady: true });
        })

    }

    render() {
        return (

            <Container style={styles.background}>
                {this.state.items !== null ?
                    <FlatList style={styles.cardContent}
                        data={this.state.items}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        windowSize={15}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            try {
                                if (!item.images)
                                    return;
                                return <CardImage
                                    image={item.images[0]}
                                    item={item}
                                />
                            } catch (e) {
                                console.log(e);
                                console.log(`Error at ${index}`);
                            }
                        }}
                    />
                    :
                    <ActivityIndicator style={styles.appLoading} size="small" color="#FFF" />}
            </Container >
        )
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#11181F',
    },
    cardContent: {
        marginTop: 30,
    },
    appLoading: {
        flex: 1,
        justifyContent: 'center'
    }
});
export default Home