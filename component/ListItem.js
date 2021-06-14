import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

export default function ListItem({ item }) {
    console.log(item)
    return (
        <Ripple style={styles.container}
            rippleColor={`white`}
            rippleOpacity={0.6}
            rippleDuration={500}
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