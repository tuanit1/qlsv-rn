import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, Image, View,
    RefreshControl, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { PostAPI, server_url } from '../networking/Server';

class FlatListItem extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            context: props.parent,
        });
    }

    _onItemClick = () => {
        this.state.context.props.navigation.navigate("Detail", {
            mode: "update",
            navigation: this.state.context.props.navigation,
            item: this.props.item,
            fl: this.props.fl
        });
    }

    render() {

        var img_path;

        if (this.props.item.image == '') {
            img_path = server_url + 'image/default_ic.jpg';
        } else {
            img_path = server_url + 'image/' + this.props.item.image;
        }

        return (
            <TouchableWithoutFeedback onPress={() => this._onItemClick()}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: 'darksalmon',
                    marginBottom: 2
                }}>
                    <Image
                        source={{ uri: img_path }}
                        style={{
                            width: 120,
                            height: 120,
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            borderRadius: 5,
                        }}
                        PlaceholderContent={{ uri: server_url + 'image/' + 'tuan.jpg' }}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.flatListItem}>Họ tên: <Text style={{ fontWeight: 'bold' }}>{this.props.item.name}</Text></Text>
                        <Text style={styles.flatListItem}>Lớp tham gia: <Text style={{ fontWeight: 'bold' }}>{this.props.item.class_name}</Text></Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 16,
    }
});

export default class StudentFlatList extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            context: props.parent,
            refreshing: false,
            array_student: [],
        });
    }

    componentDidMount() {
        this.refreshDataFromServer();
    }

    onRefresh = () => {
        this.refreshDataFromServer();
    }

    refreshDataFromServer = () => {

        let params = {
            method_name: 'method_get_all_student'
        }

        this.setState({ refreshing: true });

        PostAPI(params).then((result) => {
            this.setState({
                array_student: result.array_student,
                refreshing: false,
            });
            console.log(result.array_student)
        }).catch((error) => {
            this.setState({
                array_student: [],
                refreshing: false,
            });
            console.error(error);
        });
    }

    onStudentClick = (item) => {
        console.log(item)
    }

    _openAddScreen = () => {
        this.state.context.props.navigation.navigate("Detail", {
            mode: "add",
            navigation: this.state.context.props.navigation,
            fl: this,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <TouchableWithoutFeedback onPress={() => this._openAddScreen()}>
                    <View style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'mediumblue',
                        margin: 10,
                        borderRadius: 10
                    }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Thêm học viên</Text>
                    </View>
                </TouchableWithoutFeedback>

                <FlatList
                    data={this.state.array_student}
                    renderItem={({ item, index }) => (
                        <FlatListItem item={item} index={index} parent={this.state.context} fl={this}></FlatListItem>
                    )}
                    keyExtractor={(item, index) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >


                </FlatList>
            </View>
        );
    }
}