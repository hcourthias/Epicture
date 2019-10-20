import React, { Component } from "react";
import { Container, Text } from 'native-base';
import { StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import CardImage from '../../components/Card'
import { getUserFavorites } from '../../api/imgur'


class Favorites extends Component {

    state = {
        items: null,
        isReady: false,
        isFetching: false,
    };

    items = null;

    componentWillMount() {
        getUserFavorites().then((data) => {
            this.items = data;
            this.setState({ isReady: true });
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
                                return <CardImage
                                    image={{ id: item.id, height: item.height, width: item.width }}
                                    item={item}
                                    header={true}
                                    navigation={this.props.navigation}
                                />
                            } catch (e) {
                                console.log(e);
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
        marginTop: 0,
        marginHorizontal: 5
    },
    appLoading: {
        flex: 1,
        justifyContent: 'center'
    },
});
export default Favorites