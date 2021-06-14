import React from 'react'
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import Path from './Path';

const Stack = createStackNavigator();

export default function PathList() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Paths" component={List} />
            <Stack.Screen name="Path" component={Path} />
        </Stack.Navigator>
    )
}
