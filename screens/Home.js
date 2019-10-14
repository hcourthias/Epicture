import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Content, Item, Toast } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, FlatList } from 'react-native'
import CardImage from '../components/Card'

class Home extends Component {

    state = {
        items: [ {"images": [{id:0}] } ],
        isReady: false,
        isFetching: false,
    };

    getTopImage = async () => {
        const res = await fetch('https://api.imgur.com/3/gallery/top', {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Client-ID 12a03496907db29',
            }),
        })
        const data = await res.json();
        return data;
    }

    componentDidMount() {
        this.getTopImage().then((data) => {
            // console.log(data.data)
            image= []
            this.setState({ items: data.data })
            console.log(data.data[5].images[0].link)
        })

    }

    render() {
        return (

            <Container style={styles.background}>
                <Content>
                    {this.state.items !== null ? <FlatList
                        style={styles.cardContent}
                        data={this.state.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <CardImage item={item}/>}

                    /> : null}
                    <Button transparent
                        onPress={() => this.setState({ ready: true })}>
                        <Text>More ...</Text>
                    </Button>
                </Content>
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
        marginTop: 50,
        marginHorizontal: 5
    }
});
export default Home