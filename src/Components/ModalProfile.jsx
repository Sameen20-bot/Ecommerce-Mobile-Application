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
    if (type === 'camera') {
      const options = {
        quality: 1,
      };
      launchCamera(options, async response => {
        console.log('launch camera', response);
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          return;
        }

        const asset = response.assets?.[0];
        // if (asset && Utils.validateImage(asset)) {
        const data = {
          fileName: asset.fileName,
          uri: asset.uri,
          type: asset.type,
        };
        console.log(data);
        // setImage(data);
        // const storeData = async value => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('user-image', jsonValue);
        } catch (e) {
          console.log(e);
          // saving error
        }
        // };
        // setImage(prev => [...prev, data]);
        // }
      });
    } else {
      // view gallery task h.w
      //   const selectImages = type => {
      // if (type === 'camera') {
      const options = {
        quality: 1,
      };
      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          return;
        }

        const asset = response.assets?.[0];
        // if (asset && Utils.validateImage(asset)) {
        const data = {
          fileName: asset.fileName,
          uri: asset.uri,
          type: asset.type,
        };
        console.log(data);
        // setImage(data);
        // const storeData = async value => {
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('gallery-image', jsonValue);
        } catch (e) {
          console.log(e);
          // saving error
        }
        // };
        // setImage(prev => [...prev, data]);
        // }
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
              style={styles.btn}
              onPress={() => selectImages('camera')}>
              <Text style={styles.btnText}> Open Camera</Text>
            </Pressable>

            <Pressable
              style={styles.btn}
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
  btn: {
    backgroundColor: 'blue',
    padding: wp(5),
    borderRadius: wp(5),
    margin: wp(5),
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(3),
  },
  uploadBox: {
    borderStyle: 'dotted',
    borderColor: 'lightgrey',
    borderRadius: wp(5),
    borderWidth: wp(1),
    width: wp(80),
    alignSelf: 'center',
    marginTop: hp(5),
  },
});

export default ModalsProfile;
