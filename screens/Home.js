import React, { Component } from "react";
import { Container, Text } from 'native-base';
import { StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import CardImage from '../components/Card'


class Home extends Component {

    state = {
        // items: [ {"images": [{id:0}] } ],
        items: null,
        isReady: false,
        isFetching: false,
    };

    items = null;

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
            // image= []
            // // console.log(data.data[0]);
            // console.log("----Start")
            // data.data.forEach(element => {
            //     image.push(element.images[0]);
            //     console.log(element);
            // });
            // console.log("----END")
            // try {
            // for (const post in data.data) {
            //     console.log("POST");

            //     console.log(data.data[post]);
            // }} catch(e) {
            //     console.log(e);
            // }
            this.items = data.data;
            this.setState({ isReady: true });
            console.log(this.items[0].images);
            console.log("DONE");
            // console.log(data.data[5].images[0].link)
        })

    }

    render() {
        return (

            <Container style={styles.background}>
                {this.items !== null ?
                    <FlatList style={styles.cardContent}
                        data={this.items}
                        initialNumToRender={5}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            try {
                                if (!item.images)
                                    return;
                                //console.log(item);
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
        marginHorizontal: 5
    },
    appLoading: {
        flex: 1,
        justifyContent: 'center'
      }
});
export default Home