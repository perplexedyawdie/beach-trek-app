import React, { useState, useEffect, useContext } from 'react'
import MapView, { Marker } from 'react-native-maps';
import useCurLocation from '../hooks/useCurLocation';
import { Text, View, FlatList, SafeAreaView, StyleSheet, StatusBar, Dimensions } from 'react-native';

export default function Map({ location }) {
    const { curLoc } = useCurLocation()
    const [route, setRoute] = useState(null)

    useEffect(() => {
        if (curLoc) {
            setRoute({
                latitude: curLoc?.latitude,
                longitude: curLoc?.longitude,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0022,
            })
        }
    }, [curLoc])
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                region={route}
            >

                {location.length > 0 ? location.map((loc, idx) => {
                    return <Marker
                        key={idx}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                    />
                }) : null}

            </MapView>

        </View>
    )

}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 4
    },
    map: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
})