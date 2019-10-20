import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Header, Item, Icon, Input } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, FlatList, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native'
import Post from './ProfileTabs/UserPost'
import FilterCard from '../components/FilterCard'
import CardImage from '../components/Card'

import { getTags, searchPost, searchByTag } from '../api/imgur'
class Search extends Component {

    state = {
        isFetching: false,
        tag: null,
        searchText: '',
        items: null,
        hintText: 'Search'
    }

    componentWillMount() {
        const { navigation } = this.props;
        getTags().then((data) => {
            this.setState({ tags: data.tags })
        }).catch((err) => err)
    }

    componentWillUnmount() {
        const { navigation } = this.props;
        this.setState({ image: navigation.getParam('image', {}) })
    }


    handleSearch = () => {
        if (this.state.searchText.length == 0) {
            this.setState({ items: null })
            return
        }
        this.setState({ isFetching: true })
        searchPost(this.state.searchText).then((data) => {
            this.setState({ items: data })
            this.setState({ isFetching: false })
        }).catch((err) => err)
    }

    onPressButton = (item) => {
        this.setState({ isFetching: true })
        searchByTag(item.name).then((data) => {
            this.setState({ items: data.items })
            this.setState({ isFetching: false })

        }).catch((err) => err)
        this.setState({ searchText: 't/' + item.name })

    }

    render() {
        if (!this.state.isFetching)
            return (
                <Container style={styles.background}>
                    <Header searchBar autoCorrect={false} style={styles.header}>
                        <Item style={styles.header}>
                            <Icon style={styles.iconSearch} name="search" />
                            <Input style={styles.searchInput}
                                placeholder="Search"
                                placeholderTextColor="#DCDCDC"
                                onChangeText={(text) => {
                                    this.setState({ searchText: text })
                                }}
                                returnKeyType='search'
                                value={this.state.searchText}
                                onSubmitEditing={this.handleSearch}
                                clearButtonMode="while-editing"
                            />
                        </Item>
                    </Header>
                    {this.state.items !== null ?
                        <FlatList style={styles.cardContent}
                            data={this.state.items}
                            initialNumToRender={5}
                            maxToRenderPerBatch={5}
                            windowSize={15}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                if (!item.images)
                                    return;
                                return <CardImage
                                    image={item.images[0]}
                                    item={item}
                                    navigation={this.props.navigation}
                                />
                            }}
                        /> :
                        <FlatList style={styles.cardContent}
                            data={this.state.tags}
                            extraData={this.state}
                            initialNumToRender={5}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => this.onPressButton(item)}>
                                        <FilterCard
                                            tag={item}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />}
                </Container >
            )
        return (<Container style={styles.background}>
            <Header searchBar autoCorrect={false} style={styles.header}>
                <Item style={styles.header}>
                    <Icon style={styles.iconSearch} name="search" />
                    <Input style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#DCDCDC"
                        onChangeText={(text) => {
                            this.setState({ searchText: text })
                        }}
                        returnKeyType='search'
                        autoFocus={true}
                        value={this.state.searchText}
                        onSubmitEditing={this.handleSearch}
                        clearButtonMode="while-editing"
                    />
                </Item>
            </Header>
            <ActivityIndicator style={styles.appLoading} size="small" color="#FFF" />
        </Container >)
    }
}


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#11181F',
    },
    header: {
        backgroundColor: '#19B76F',
    },
    iconSearch: {
        color: '#FFF',
    },

    searchInput: {
        color: 'white',
        fontWeight: 'bold'
    },
    appLoading: {
        flex: 1,
        justifyContent: 'center'
    }
});
export default Search