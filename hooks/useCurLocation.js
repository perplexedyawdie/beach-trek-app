import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';


export default function useCurLocation() {

    const [curLoc, setCurLoc] = useState(null)
    useEffect(() => {
        Location.getCurrentPositionAsync({}).then((loc) => {
            setCurLoc(loc.coords)
            // console.log(loc)
        })
    }, []);


    return { curLoc }
}
