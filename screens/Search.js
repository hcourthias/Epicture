import React, { Component } from "react";
import { Container, Text, Button, Thumbnail, Header, Item, Icon, Input } from 'native-base';
import { StyleSheet, Dimensions, Image, StatusBar, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import Post from './ProfileTabs/Post'
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
        getTags().then((data) => {
            this.setState({ tags: data.tags })
            console.log(this.state.tags[50])
        })
    }

    handleSearch = () => {
        console.log(this.state.searchText)
        if (this.state.searchText.length == 0) {
            this.setState({items: null})
            return
        }
        this.setState({isFetching: true})
        searchPost(this.state.searchText).then((data) => {
            this.setState({items: data})
            console.log(this.state.items)
            this.setState({isFetching: false})
        })
        console.log("coucou")
    }

    onPressButton = (item) => {
        this.setState({searchText: 't/'+ item.name})
        this.setState({isFetching: true})
        searchByTag(item.name).then((data) => {
            this.setState({items: data.items})
            console.log(this.state.items)
            this.setState({isFetching: false})

        })
        console.log(item.name)
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
                            autoFocus={true}
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
                    />:
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
        return (            <Container style={styles.background}>
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