import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import { PostAPI, server_url } from '../networking/Server';
import StudentFlatList from '../components/StudentFlatList'

export default class MainScreen extends Component {

    render() {

        return (

            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <StudentFlatList parent={this}></StudentFlatList>
                </View>
            </View>


        );
    }
}