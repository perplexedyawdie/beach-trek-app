import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Map from '../component/Map';
import AppContext from '../context/AppContext';

function MapControl() {
    
    return (
        <View style={styles.controlContainer}>
            <Text>Hello Wolrd</Text>
        </View>
    )
}

export default function Path() {
    const { displayTrek } = useContext(AppContext)
    console.log(typeof (displayTrek.path))
    console.log(displayTrek.path)
    return (
        <View style={styles.container}>
            <Map location={displayTrek.path} />
            <MapControl />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00A3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row'
    },
})
