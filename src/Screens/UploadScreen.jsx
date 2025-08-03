import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  fullview: {
    width: '100%',
    height: '100%',
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
  uploadHead: {
    fontSize: hp(5),
    fontWeight: '500',
    marginTop: hp(5),
    marginLeft: hp(3.5),
  },
  uploadPara: {
    fontSize: hp(2),
    marginTop: hp(1),
    marginLeft: hp(3.5),
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

export default function UploadScreen() {
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

  const getDatas = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-image');
      console.log('image uploaded ', jsonValue);
      // setImage(jsonValue);
      return setImage(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <View style={styles.fullview}>
      <Text style={styles.uploadHead}>Upload Picture</Text>
      <Text style={styles.uploadPara}>
        Upload a picture of youself or from the gallery
      </Text>

      <View style={styles.uploadBox}>
        <Pressable style={styles.btn} onPress={() => selectImages('camera')}>
          <Text style={styles.btnText}> Open Camera</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => selectImages('gallery')}>
          <Text style={styles.btnText}> View Gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}
