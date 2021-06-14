import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Modal, StyleSheet, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AppContext from '../context/AppContext'
import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SaveModal() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState(null)
    const { trekData } = useContext(AppContext);

    useEffect(() => {
        if (trekData.trek) {
            setModalVisible(true)
        }

    }, [trekData.trek])

    function handleSaveTrekData() {

        AsyncStorage.setItem(`${name ? name : ''}_${format(new Date(), 'MM/dd/yyyy-HH:mm:ss')}`, JSON.stringify(trekData.trek))
            .then((result) => {
                setModalVisible(!modalVisible)
                setName(null)
                trekData.setTrek(null)
            }).catch((err) => {
                console.log(err)
            });

    }
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={styles.inputView}>
                        <Text>What do you want to name this path?</Text>
                        <TextInput style={styles.input} onChangeText={setName} value={name} />
                        <Ripple
                            rippleColor={`white`}
                            rippleOpacity={0.6}
                            rippleDuration={500}
                            style={{ ...styles.saveBtn, backgroundColor: '#2196F3' }}
                            onPress={() => {
                                handleSaveTrekData()
                            }}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </Ripple>
                    </View>
                </View>
            </View>
        </Modal>



    );
}

const styles = StyleSheet.create({
    closeBtnView: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%'

    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 50,
        width: '70%',
        marginTop: 20,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    saveBtn: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
