import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function ListItem({ item }) {
    const {  displayTrek } = useContext(AppContext)
    const navigation = useNavigation();

    function handlePathClick() {

        AsyncStorage.getItem(item.name)
            .then((result) => {
                displayTrek.setPath(JSON.parse(result))
                navigation.navigate("Path")
            }).catch((err) => {
                console.log(err)
            });
    }
    return (
        <Ripple style={styles.container}
            rippleColor={`white`}
            rippleOpacity={0.6}
            rippleDuration={500}
            onPress={() => handlePathClick()}
        >
            <Text style={styles.itemText}>
                {item.name}
            </Text>
        </Ripple>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00A3D3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    itemText: {
        color: 'white'
    }
})