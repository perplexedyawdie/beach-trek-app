import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Map from '../component/Map';
import AppContext from '../context/AppContext';

export default function Path() {
    const { displayTrek } = useContext(AppContext)
    console.log(typeof (displayTrek.path))
    console.log(displayTrek.path)
    return (
        <View style={styles.container}>
            <Map location={displayTrek.path} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00A3D3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
