import React, { Component } from "react";
import { Container, Text } from 'native-base';
import { StyleSheet, Dimensions, FlatList, ActivityIndicator, BackHandler } from 'react-native'
import CardImage from '../components/Card'
import { getGalleryTop, getUserAvatar } from '../api/imgur'


class Home extends Component {

    state = {
        isReady: false,
        isFetching: false,
        isRefreshing: false,
        items: null,
        page: 0,

    };

    loadPost = () => {
        getGalleryTop(this.state.page).then((data) => {
            this.setState(prevState => ({
                items: this.state.page === 0 ? data : [...prevState.items, ...data],
                isRefreshing: false,
            }));
            this.setState({ isReady: true });
        }).catch(err => err);
    }


    handleRefresh = () => {
        this.setState({
            isRefreshing: true,
            page: 0,
            items: null
        }, () => {
            this.loadPost();
        });
    };

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.loadPost();
        });
    };


    componentWillMount() {
        this.loadPost()


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
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndThreshold={0}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            if (!item.images)
                                return;
                            return <CardImage
                                image={item.images[0]}
                                item={item}
                                navigation={this.props.navigation}
                            />
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