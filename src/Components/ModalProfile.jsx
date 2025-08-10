import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModalsProfile = ({modalVisible, setModalVisible}) => {
  const [image, setImage] = useState();
  const selectImages = type => {
    const options = {
      quality: 1,
    };

    if (type === 'camera') {
      launchCamera(options, async response => {
        if (response.didCancel || response.errorCode) return;

        const asset = response.assets?.[0];
        const data = {
          fileName: asset.fileName,
          uri: asset.uri,
          type: asset.type,
        };
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('camera-image', jsonValue);
          console.log('Camera image saved:', jsonValue);
        } catch (e) {
          console.log(e);
        }
      });
    } else {
      launchImageLibrary(options, async response => {
        if (response.didCancel || response.errorCode) return;

        const asset = response.assets?.[0];
        const data = {
          fileName: asset.fileName,
          uri: asset.uri,
          type: asset.type,
        };
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('gallery-image', jsonValue);
          console.log('Gallery image saved:', jsonValue);
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <Pressable
        style={styles.centeredView}
        onPressOut={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <View style={styles.uploadBox}>
            <Pressable
              style={styles.btn1}
              onPress={() => selectImages('camera')}>
              <Text style={styles.btnText}> Open Camera</Text>
            </Pressable>

            <Pressable
              style={styles.btn2}
              onPress={() => selectImages('gallery')}>
              <Text style={styles.btnText}> View Gallery</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    backgroundColor: '#465C88',
    padding: wp(3),
    borderRadius: wp(5),
    margin: wp(5),
  },
  btn2: {
    backgroundColor: '#D7D7D7',
    padding: wp(3),
    borderRadius: wp(5),
    margin: wp(5),
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(3),
  },
  uploadBox: {
    elevation: 10,
    // borderStyle: 'dotted',
    borderColor: 'lightgrey',
    borderRadius: wp(5),
    // borderWidth: wp(1),
    width: wp(80),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp(5),
  },
});

export default ModalsProfile;
