import React, { useState } from 'react'
import { Text, View } from 'react-native';
import AppContext from '../context/AppContext';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import Path from './Path';

const Stack = createStackNavigator();

export default function PathList() {
    const [path, setPath] = useState(null)

    return (
        <AppContext.Provider value={{displayTrek: {path,setPath}}}>
            <Stack.Navigator>
                <Stack.Screen name="Paths" component={List} />
                <Stack.Screen name="Path" component={Path} />
            </Stack.Navigator>
        </AppContext.Provider>

    )
}
