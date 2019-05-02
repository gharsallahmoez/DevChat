import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FormInput, FormLabel, Button, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { addPost } from '../actions';

import Colors from '../constants/Colors';

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageName: '',
            postImage: '',
            disabled: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.added) {
            this.props.navigation.goBack();
        }
    }


    showErrorMessage() {
        if (this.props.error) {
            return (
                <View style={styles.containerWithMargin}>
                    <Text style={styles.errorMessage}>{this.props.error}</Text>
                </View>
            );
        }
    }

    onSelectPostImage() {
        const options = {
            title: 'Select Image to share',
            quality: 0.1,
            mediaType: 'photo',
            maxHeight: 200
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response) {
                const imageName = `${this.props.profile.id}-${response.fileName}`;
                this.setState({
                    postImage: response.uri,
                    imageName,
                    disabled: false
                });
            } else {
                this.setState({ disabled: true });
            }
        });
    }

    onShareButtonPressed() {
        const { postImage, imageName, title , description} = this.state;
        const { profile } = this.props;
        this.props.addPost(title, profile, postImage, imageName , description);
    }

    render() {
        return (
            <View>
                <View style={styles.containerWithMargin} >
                    <Avatar
                        large
                        onPress={this.onSelectPostImage.bind(this)}
                        source={{ uri: this.state.postImage }}
                    />
                </View>

                <FormLabel>Title</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoFocus
                    onChangeText={(title) => this.setState({ title })}
                />

                <FormLabel>Description</FormLabel>
                <TextInput
                    autoCorrect={false}
                    autoFocus
                    onChangeText={(description) => this.setState({ description })}
                />

                {this.showErrorMessage()}

                <Button
                    title='Share'
                    backgroundColor={Colors.redColor}
                    buttonStyle={{ marginTop: 20 }}
                    disabled={this.state.disabled}
                    onPress={this.onShareButtonPressed.bind(this)}
                    loading={this.props.loading}
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    containerWithMargin: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        color: Colors.redColor,
        fontSize: 16
    }
});


const mapStateToProps = state => {
    return {
        profile: state.auth.profile,
        loading: state.posts.loading,
        error: state.posts.error,
        added: state.posts.added
    };
};

export default connect(mapStateToProps, { addPost })(AddPost);
