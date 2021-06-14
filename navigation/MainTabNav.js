import React, { createContext, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HanselGretel from '../screens/HanselGretel';
import PathList from '../screens/PathList';
import { Fontisto } from '@expo/vector-icons';
import AppContext from '../context/AppContext';

const Tab = createBottomTabNavigator();



export default function App() {
    const [trek, setTrek] = useState(null)
    return (
        <AppContext.Provider value={{trekData: {trek, setTrek}}}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Trek') {
                                iconName = 'compass'
                            } else if (route.name === 'Paths') {
                                iconName = 'nav-icon-list';
                            }

                            // You can return any component that you like here!
                            return <Fontisto name={iconName} size={24} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#A12F35',
                        inactiveTintColor: 'white',
                        style: {
                            backgroundColor: '#F8DDA1',
                        }
                    }}
                >
                    <Tab.Screen name="Trek" component={HanselGretel} />
                    <Tab.Screen name="Paths" component={PathList} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}