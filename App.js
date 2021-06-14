import React, { useState, useEffect } from 'react'
import MainTabNav from './navigation/MainTabNav'
import * as Location from 'expo-location';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);
  return (
    <>
      {
        errorMsg ?
          <View style={styles.container}>
            <Text>
              {errorMsg}
            </Text>
          </View> :
          <MainTabNav />
      }
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


