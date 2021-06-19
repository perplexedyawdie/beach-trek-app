import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Location from 'expo-location';
import AppContext from '../context/AppContext'
import SaveModal from '../component/SaveModal';
import Map from '../component/Map'
import useFormatTime from '../hooks/useFormatTime';


function MapControls({ setLocation, location }) {
    const [pressed, setPressed] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [stopwatch, setStopwatch] = useState(null)
    const [watcher, setWatcher] = useState(null)
    const [time, setTime] = useState(null)
    const { trekData } = useContext(AppContext)
    function handleControlButtonPress() {
        setPressed(prevState => !prevState)
    }

    useEffect(() => {
        if (pressed) {
            setStopwatch(setInterval(() => {
                incrementStopwatch()
            }, 1000));
            setWatcher(Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 1, timeInterval: 1000, }, (loc) => {
                setLocation(prevLoc => {
                    return [...prevLoc, {...loc.coords, id: prevLoc.length + 1}]
                })
            }))
        }

        //Stop the tracker
        if (pressed === false && stopwatch && watcher) {
            (async () => await watcher.remove());
            //Add object with time data and distance.
            //Calculate distance between nodes with geolib
            trekData.setTrek(location)
            setLocation([])
            clearInterval(stopwatch)
            setStopwatch(null)
            setEnd(start)
            setStart(0)
        }
    }, [pressed])

    useEffect(() => {
        setTime(useFormatTime(start))
    }, [start])

    function incrementStopwatch() {
        setStart(prevState => prevState + 1);
    }




    return (
        <View style={styles.controlContainer}>
            <View style={styles.controlTextView}>
                <Text style={styles.timeText}>Time: {time?.hrs}:{time?.mins}:{time?.secs}</Text>
                <Text style={styles.distanceText}>Distance: {end}</Text>
                {/* <Text>{location ? `lat: ${location.latitude} lng: ${location.longitude}` : 'loading...'}</Text> */}
            </View>
            <View style={styles.controlButtonView}>
                <Ripple
                    onPress={() => handleControlButtonPress()}
                    style={[styles.controlButton, { backgroundColor: pressed ? '#a12f35' : '#f8dda1', }]}
                    rippleColor={`white`}
                    rippleOpacity={0.6}
                    rippleDuration={500}
                >
                    <Text style={[styles.controlButtonText, { color: pressed ? 'white' : '#a12f35', }]}>{pressed ? 'STOP' : 'START'}</Text>
                </Ripple>
            </View>
        </View>
    )
}

export default function HanselGretel() {
    const [location, setLocation] = useState([]);
    const { trekData } = useContext(AppContext)
    return (
        <View style={styles.container}>
            <Map location={location} />
            <MapControls setLocation={setLocation} location={location} />
            <SaveModal />
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
    controlTextView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        height: '100%',
        padding: 20,
        borderWidth: 0

    },
    timeText: {
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    distanceText: {
        color: 'white',
        marginRight: 50,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    controlButtonView: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    controlButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: 100,
    },
    controlButtonText: {
        color: '#a12f35',
        fontSize: 20,
    }
});
