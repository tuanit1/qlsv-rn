import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableWithoutFeedback, TouchableHighlight,
        Button} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-datepicker';

import {PostAPI, ExecuteQuery, server_url} from '../networking/Server';

export default class DetailScreen extends Component {

    constructor(props){
        super(props);

        
        var mode = this.props.route.params.mode;
        var fl = this.props.route.params.fl;
        var navigation = this.props.route.params.navigation;
        var item;

        if(mode == 'add'){
            item = {
                id: 0,
                name: '',
                class_id: 0,
                image: 'sadsa',
                birthday: new Date().toISOString(),
                address: '',
            }
        }else{
            item = this.props.route.params.item;
        }

        console.log(item);

        this.state =({
            mNavigation : navigation,
            mMode: mode,
            mImage: item.image,
            mFl: fl,
            mId : item.id,
            mName : item.name,
            mClassID : item.class_id,
            mBirthday : new Date(item.birthday),
            mAddress : item.address,
            array_class : [],
        });


    }

    componentDidMount() {
        this._GetAllClass();
    }

    _GetAllClass = () => {

        let params = {
            method_name: 'method_get_all_class'
        }

        PostAPI(params).then((result) => {
            this.setState({
                array_class: result.array_class,
            });
            console.log(result.array_class)
        }).catch((error) => {
            this.setState({
                array_class: [],
            });
            console.error(error);
        });
    } 

    _DeleteStudent = () => {
        let params = {
            method_name: 'method_del_student',
            id: this.state.mId,
        }

        console.log(JSON.stringify(params));

        ExecuteQuery(params).then((result) => {
            if(result == 'success'){

                this.state.mFl.refreshDataFromServer();
                alert('Xoá học viên thành công');

                this.state.mNavigation.navigate("Main");

            }else{
                alert('Đã có lỗi xảy ra');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    _UpdateStudent = () =>{
        let params = {
            method_name: this.state.mMode == 'add'?'method_add_student':'method_update_student',
            id: this.state.mId,
            name: this.state.mName,
            class_id: this.state.mClassID,
            birthday: this.state.mBirthday,
            address: this.state.mAddress
        }

        console.log(JSON.stringify(params));

        ExecuteQuery(params).then((result) => {
            if(result == 'success'){

                this.state.mFl.refreshDataFromServer();

                alert(this.state.mMode == 'add'?'Thêm học viên thành công':'Cập nhập thông tin thành công');

                this.state.mNavigation.navigate("Main");

            }else{
                alert('Đã có lỗi xảy ra');
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    render() {

        var item = this.props.route.params.item;
 
        const FindClassIndex = (class_id) => {
            return this.state.array_class.findIndex((item) => item.id == class_id);
        }

        var img_path;

        if(this.state.mImage == '') {
            img_path = server_url + 'image/default_ic.jpg';
        }else{
            img_path = server_url + 'image/' + this.state.mImage;
        }

        return (

            <ScrollView>
                <View style={styles.container}>
                    {this.state.mMode == 'update'?(
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image
                                source={{uri: img_path}}
                                style={{
                                    width: 150,
                                    height: 150,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    borderRadius: 10,
                                }}
                            />

                            <TouchableWithoutFeedback>
                                <Text style={{
                                    borderWidth:1,
                                    borderRadius: 5,
                                    padding: 5, 
                                }}>Đổi ảnh đại diện</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    ):null}
                    
                    <Text style={styles.inputTitle}>Tên học viên</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={this.state.mName}
                        onChangeText={(text) => {
                            this.setState({mName: text})
                        }}
                        keyboardType="default"
                    />

                    <Text style={styles.inputTitle}>Lớp học</Text>
                    <View style={{
                        color: 'black',
                        width: 300,
                        padding: 1,
                        alignItems: 'center',
                        fontSize: 16,
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        <SelectDropdown
                            data={this.state.array_class}
                            onSelect={(selectedItem, index) => {
                                this.setState({
                                    mClassID : selectedItem.id,
                                });
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.name;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.name;
                            }}
                            defaultValue={this.state.array_class[FindClassIndex(this.state.mClassID)]}
                            
                        />
                    </View>

                    <Text style={styles.inputTitle}>Ngày sinh</Text>                  
                    <DatePicker
                        showIcon={false}
                        style={{width:300}}
                        androidMode="spinner"
                        date={this.state.mBirthday}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Chọn"
                        cancelBtnText="Hủy"
                        customStyles={{
                            dateInput: {
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            },
                        }}
                        onDateChange={(date) => {
                            this.setState({ mBirthday: date });
                        }}
                        />

                    <Text style={styles.inputTitle}>Địa chỉ</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={this.state.mAddress}
                        onChangeText={(text) => this.setState({mAddress: text})}
                        keyboardType="default"
                    />

                    <TouchableWithoutFeedback onPress={() => this._UpdateStudent()}>
                        <View style={styles.btn_ok}>
                            <Text style={{fontSize: 20, color: 'white'}}>{this.state.mMode == 'add'?"Thêm":"Cập nhập"}</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {this.state.mMode == 'update'?(
                        <TouchableWithoutFeedback onPress={() => this._DeleteStudent()}>
                        <View style={styles.btn_del}>
                            <Text style={{fontSize: 20, color: 'white'}}>Xóa</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    ): null}
                    
                    
                </View>
                
            </ScrollView>

            
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

    inputTitle: {
        color: 'mediumblue',
        marginTop: 30,
        marginBottom: 10,
        fontSize: 20,

    },

    input: {
        color: 'black',
        width: 300,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1
    },

    btn_ok: {
        width:200,
        marginTop: 30,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'dodgerblue'
    },

    btn_del: {
        width:200,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'tomato'
    }
});