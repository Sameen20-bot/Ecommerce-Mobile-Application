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
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 70,
    padding: 13,
    borderWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  arrow: {
    height: 30,
    width: 20,
  },
  navtext: {
    margin: 'auto',
    fontSize: 25,
    fontWeight: '500',
  },
  setprofile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    marginTop: hp(12),
    height: hp(20),
    width: wp(40),
    borderRadius: wp(70),
  },
  profileUserText: {
    fontSize: hp(3),
    marginTop: hp(1),
  },
  scrollSettings: {
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderRadius: wp(10),
    elevation: hp(5),
    width: wp(90),
    height: hp(130),
    margin: 'auto',
    marginTop: hp(5),
    padding: wp(8),
  },
  pressableSettings: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(4),
    paddingBottom: hp(1),
    borderBottomColor: 'lightgrey',
    borderBottomWidth: wp(0.5),
  },
  pressableSettingsText: {
    color: 'grey',
    marginLeft: wp(3),
    fontSize: hp(2),
  },
});

// 0 kahrab , 1 achi image

export default function SettingScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState();

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
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrow}
            source={require('../../assets/leftarrow.png')}
          />
        </Pressable>
        <Text
          style={[
            styles.navtext,
            // {color: data.length > -1 ? 'green' : 'red'}
          ]}>
          Settings
        </Text>
      </View>
      <View style={styles.setprofile}>
        <Image
          source={{uri: image?.uri}}
          height={hp(10)}
          width={wp(10)}
          style={styles.profile}
        />
        <Text style={styles.profileUserText}>Sameen Zaki</Text>
      </View>
      <View style={styles.scrollSettings}>
        <Pressable
          style={styles.pressableSettings}
          onPress={() => navigation.navigate('UploadScreen')}>
          <Icons name="camera" size={30} color="purple" />
          <Text style={styles.pressableSettingsText}>Upload Picture</Text>
        </Pressable>

        <Pressable
          style={styles.pressableSettings}
          onPress={() => navigation.navigate('ProfileEditScreen')}>
          <Icons name="account-circle" size={30} color="deeppink" />
          <Text style={styles.pressableSettingsText}>Profile Edit</Text>
        </Pressable>

        <Pressable style={styles.pressableSettings}>
          <Icons name="brightness-6" size={30} color="orange" />
          <Text style={styles.pressableSettingsText}>Appearance</Text>
        </Pressable>

        <Pressable style={styles.pressableSettings}>
          <Icons name="shopping-cart" size={30} color="green" />
          <Text style={styles.pressableSettingsText}>Past Orders</Text>
        </Pressable>

        <Pressable style={styles.pressableSettings}>
          <Icons name="help" size={30} color="blue" />
          <Text style={styles.pressableSettingsText}>Help Center</Text>
        </Pressable>
      </View>
    </View>
  );
}
