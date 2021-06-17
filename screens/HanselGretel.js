import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Dimensions, Button } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Location from 'expo-location';
import AppContext from '../context/AppContext'
import SaveModal from '../component/SaveModal';
import Map from '../component/Map'


function MapControls({ setLocation, location }) {
    const [pressed, setPressed] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [stopwatch, setStopwatch] = useState(null)
    const [watcher, setWatcher] = useState(null)
    const { trekData } = useContext(AppContext)

    function handleControlButtonPress() {
        setPressed(prevState => !prevState)
    }

    useEffect(() => {
        if (pressed) {
            setStopwatch(setInterval(() => {
                incrementStopwatch()
            }, 10));
            setWatcher(Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 1, timeInterval: 1000, }, (loc) => {
                setLocation(prevLoc => {
                    return [...prevLoc, {...loc.coords, id: prevLoc.length + 1}]
                })
            }))
        }

        //Stop the tracker
        if (pressed === false && stopwatch && watcher) {
            (async () => await watcher.remove());
            trekData.setTrek(location)
            setLocation([])
            clearInterval(stopwatch)
            setStopwatch(null)
            setEnd(start)
            setStart(0)
        }
    }, [pressed])

    function incrementStopwatch() {
        setStart(prevState => prevState + 1);
    }

    function formatTime(time) {

        if (time) {
            return {
                hrs: Math.floor(time / 3600) >= 0 ? (Math.floor(time / 3600) < 10 ? `0${Math.floor(time / 3600)}` : Math.floor(time / 3600)) : '00',
                mins: Math.floor(time / 60) > 0 && Math.floor(time % 60) <= 59 ? ((Math.floor(time / 60) % 60) < 10 ? `0${Math.floor(time / 60) % 60}` : Math.floor(time / 60) % 60) : '00',
                secs: Math.floor(time % 60) <= 59 ? (Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)) : '00'
            }
        }
        return {
            hrs: '00',
            mins: '00',
            secs: '00'
        };
    }



    return (
        <View style={styles.controlContainer}>
            <View style={styles.controlTextView}>
                <Text style={styles.timeText}>Time: {formatTime(start)?.hrs}:{formatTime(start)?.mins}:{formatTime(start)?.secs}</Text>
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
