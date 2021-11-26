import React, {Component} from 'react';

export const server_url = "http://192.168.1.10/qlsv/";

export async function PostAPI(params) {
    try{
        var api_path = server_url + "api.php"

        const requestOptions = {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        const response = await fetch(api_path, requestOptions);

        const json = await response.json();

        return json;
    
    } catch (error){
        console.error(`Error is: ${error}`);
    }
}

export async function ExecuteQuery(params) {
    try{
        var api_path = server_url + "api.php"

        const requestOptions = {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        };

        const response = await fetch(api_path, requestOptions);

        const json = await response.text();

        console.log(json);

        return json;
    
    } catch (error){
        console.error(`Error is: ${error}`);
    }
}