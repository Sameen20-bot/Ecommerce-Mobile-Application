import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalsProfile from '../Components/ModalProfile';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  imageBack: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullview: {
    width: '100%',
    height: '100%',
  },
  setprofile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'absolute',
    top: hp(12),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: wp(-2),
    backgroundColor: 'darkblue',
    borderRadius: hp(5),
    padding: hp(1.3),
    zIndex: 999,
  },
  profile: {
    height: hp(15),
    width: wp(30),
    borderRadius: wp(70),
  },
  profileBlock: {
    position: 'absolute',
    top: hp(23),
    backgroundColor: 'white',
    borderRadius: hp(7),
    alignItems: 'center',
    width: wp(100),
    height: hp(130),
    paddingTop: hp(10),
    padding: hp(5),
    elevation: 2,
  },
  profileText: {
    marginLeft: wp(6),
    alignSelf: 'flex-start',
    fontSize: hp(4),
    fontWeight: '500',
    marginBottom: hp(3),
  },
  labelText: {
    marginLeft: wp(3),
    color: '#7A7A73',
    fontWeight: '400',
  },
  profileInput: {
    borderRadius: wp(3),
    borderColor: 'black',
    borderWidth: wp(0.4),
    textAlign: 'left',
    backgroundColor: 'white',
    padding: wp(3),
    margin: hp(1),
    color: 'black',
    width: wp(70),
    fontSize: hp(2),
  },
  updateButton: {
    backgroundColor: '#465C88',
    color: 'white',
    borderRadius: hp(3),
    marginTop: hp(2),
    padding: hp(1),
    width: wp(70),
    margin: 'auto',
  },
  updateText: {
    color: 'white',
    fontSize: hp(2),
    textAlign: 'center',
  },
});

export default function ProfileEditScreen() {
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInput = (name, value) => {
    setData({...data, [name]: value});
  };

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
        const userImg = {
          fileName: asset.fileName,
          uri: asset.uri,
          type: asset.type,
        };
        setImage(userImg);
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

  const submit = async () => {
    const userObj = {
      name: data.name,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      image: image,
    };
    try {
      const jsonValue = JSON.stringify(userObj);
      await AsyncStorage.setItem('user-data', jsonValue);
    } catch (e) {
      console.log(e);
      // saving error
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
    <ImageBackground
      source={require('../../assets/profileBack.jpg')}
      style={styles.imageBack}>
      <View style={styles.profileContainer}>
        <Image source={{uri: image?.uri}} style={styles.profile} />
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.iconContainer}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileBlock}>
        <Text style={styles.profileText}>Edit Profile</Text>
        <View>
          <View>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              placeholder="Enter first name"
              style={styles.profileInput}
              value={data.name}
              onChangeText={text => handleInput('name', text)}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              style={styles.profileInput}
              value={data.lastname}
              onChangeText={text => handleInput('lastname', text)}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Username</Text>
            <TextInput
              placeholder="Enter username"
              style={styles.profileInput}
              value={data.username}
              onChangeText={text => handleInput('username', text)}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.profileInput}
              value={data.email}
              onChangeText={text => handleInput('email', text)}
            />
          </View>
          <Pressable style={styles.updateButton} onPress={() => submit()}>
            <Text style={styles.updateText}>Profile Update</Text>
          </Pressable>
        </View>
      </View>
      <ModalsProfile
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ImageBackground>
  );
}
