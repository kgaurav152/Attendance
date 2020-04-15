import React from 'react';
import { Component } from "react";
import Firebase from '../components/config';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import 'firebase/storage';
import {
    Alert,
} from "react-native";

export const uploadImageAsync = async (tableName, email, uri) => {
    let response = await fetch(uri);
    const blob = await response.blob();
    let ref = Firebase.storage().ref(tableName).child(email);
    return ref.put(blob);
}

export const downLoadProfileImage = async (email) => {
    let imageURL = "";
    const ref = Firebase.storage().ref("profileImage/" + email);
    let image = await ref.getDownloadURL()
    imageURL = image;
    return imageURL;
}

export const uploadGalleryImage = async (tableName, email) => {

    let uploadedImagePath = "";
    let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status.status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;

    }
    try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            skipBackup: true,
            quality: 1,
        });

        if (!result.cancelled) {
            await uploadImageAsync(tableName, email, result.uri);
            let downloadImage = await downLoadProfileImage(email);
            uploadedImagePath = downloadImage;
        }
    }
    catch (error) {
        console.log(error)
    }

    return uploadedImagePath;

}



