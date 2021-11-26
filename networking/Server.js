import React, { Component } from 'react';
//import RNFetchBlob from 'react-native-fetch-blob';

export const server_url = "http://192.168.1.33/qlsv/";

export async function PostAPI(params) {
    try {
        var api_path = server_url + "api.php"

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        const response = await fetch(api_path, requestOptions);

        const json = await response.json();

        return json;

    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}

export async function ExecuteQuery(params) {
    try {
        var api_path = server_url + "api.php"

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };

        const response = await fetch(api_path, requestOptions);

        const json = await response.text();

        console.log(json);

        return json;

    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}

export async function UploadImageServer(mdata) {
    try {

        // var api_path = server_url + "upload.php"

        // RNFetchBlob.fetch('POST', api_path, {
        //     Authorization: "Bearer access-token",
        //     otherHeader: "foo",
        //     'Content-Type': 'multipart/form-data',
        // }, [
        //     { name: 'image', filename: 'image.png', type: 'image/png', data: mdata }
        // ]).then((resp) => {
        //     return resp.text();
        // }).catch((err) => {
        //     console.error(err);
        // })

    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}