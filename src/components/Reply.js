import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';

import { fetchPosts } from '../actions';

class Reply extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPostItem({ item }) {
        return (
            <Card
                title={item.title}
                image={{ uri: item.url }}
                onPress={() => this.props.navigation.navigate('Reply')}
            >
                <ListItem
                    title={item.author.name}
                    avatar={{ uri: item.author.imageUrl }}
                    roundAvatar
                />

            </Card>
        );
    }

    keyExtractor = (item, index) => index;

    showSpinerOrPosts() {
        if (this.props.fetching) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color={Colors.redColor} />
                </View>
            );
        }

        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderPostItem}
                keyExtractor={this.keyExtractor}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                { this.showSpinerOrPosts() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:
            'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        fetching: state.posts.fetching,
        data: state.posts.data
    };
};

export default connect(mapStateToProps, { fetchPosts })(Reply);
