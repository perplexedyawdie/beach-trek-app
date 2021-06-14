import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from '../component/ListItem';

export default function List() {
    const [paths, setPaths] = useState(null)

    useEffect(() => {

        AsyncStorage.getAllKeys()
            .then((result) => {
                return AsyncStorage.multiGet(result)
            })
            .then((retrievedPaths) => {
                setPaths(retrievedPaths.map((path) => {
                    return { name: path[0], path: JSON.parse(path[1]) }
                }))
                // console.log(retrievedPaths.map((path) => {
                //     return {name: path[0], path: JSON.parse(path[1])[0]}
                // }))
            })
            .catch((err) => {
                console.log(err)
            });

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {
                paths ? <FlatList data={paths} renderItem={ListItem} keyExtractor={item => item.name} />
                    : <></>
            }
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
})
