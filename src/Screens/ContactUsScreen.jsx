import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icons from 'react-native-vector-icons/MaterialIcons';

import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import NameField from '../Components/NameField';
import EmailField from '../Components/EmailField';
import MessageField from '../Components/MessageField';
import CustomField from '../Components/CustomField';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  imageBack: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#FCC0DA',
    borderRadius: wp(5),
    padding: wp(3),
    width: wp(70),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  textBtn: {
    fontSize: wp(5),
    color: 'white',
    marginLeft: wp(4),
    fontWeight: '600',
  },
  contactText: {
    fontSize: wp(12),
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: wp(35),
  },
  msgText: {
    marginTop: hp(5),
    fontSize: wp(5),
    width: wp(90),
    color: 'white',
  },
  textArea: {
    height: hp(15),
    borderRadius: wp(6),
    width: wp(70),
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: wp(4),
    margin: 12,
    fontSize: wp(5),
    color: 'black',
  },
});

export default function ContactUsScreen() {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInput = (name, value) => {
    setData({...data, [name]: value});
  };

  return (
    <View>
      <ImageBackground
        source={require('../../assets/contact.png')}
        style={styles.imageBack}>
        <Text style={styles.contactText}>Contact Us</Text>
        <Text style={styles.msgText}>
          Leave us a message. We will get contact you as soon as possible
        </Text>
        <CustomField
          placeholder="Full name"
          value={data.name}
          onChangeText={text => handleInput('name', text)}
        />
        <CustomField
          placeholder="Your mail"
          value={data.email}
          onChangeText={text => handleInput('email', text)}
        />
        <CustomField
          placeholder="Message"
          multiline={true}
          numberOfLines={5}
          value={data.message}
          onChangeText={text => handleInput('message', text)}
        />
        <Pressable style={styles.btn}>
          <Icons
            name="near-me"
            size={35}
            color="white"
            style={styles.iconStyle}
          />
          <Text style={styles.textBtn}>SENT</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}
