/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomField from '../Components/CustomField';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: hp(9),
    padding: hp(1.6),
    borderWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  navtext: {
    margin: 'auto',
    fontSize: wp(6.2),
    fontWeight: '500',
  },
  arrow: {
    height: hp(3.7),
    width: wp(5.3),
  },
  listProduct: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: wp(2),
    marginLeft: wp(2),
    borderRadius: hp(4),
  },
  lastProduct: {
    marginRight: wp(2),
  },
  imageLayout: {
    width: wp(16),
    height: hp(12),
    resizeMode: 'contain',
  },
  checkText: {
    fontSize: hp(2.4),
    fontWeight: '500',
  },
  personalDetails: {
    marginTop: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
  },
  personalDetailsText: {
    marginLeft: wp(1),
    fontSize: hp(2.5),
    color: 'black',
    fontWeight: '600',
  },
  profileInput: {
    borderRadius: wp(3),
    borderColor: 'lightgrey',
    borderWidth: wp(0.4),
    textAlign: 'left',
    backgroundColor: 'white',
    padding: wp(3),
    margin: hp(1),
    color: 'black',
    width: wp(90),
    fontSize: hp(2),
    marginLeft: wp(4.5),
  },
  labelText: {
    marginLeft: wp(4.5),
    color: 'black',
    fontSize: hp(2.0),
    fontWeight: '400',
  },
  checkBtn: {
    backgroundColor: '#e91e63',
    padding: hp(1),
    margin: hp(2),
    borderRadius: hp(2),
    alignItems: 'center',
    flex: 1,
  },
  checkBtnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: hp(3.0),
  },
});

export default function CheckOutScreen({route}) {
  const {lists} = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState({
    fullName: '',
    email: '',
    number: '',
    country: '',
    address: '',
  });
  const [showPayment, setShowPayment] = useState(false);

  const handlePayment = navState => {
    const urls = navState.url;
    if (urls.startsWith('myapp://payment-success')) {
      setShowPayment(false);
      Alert.alert('Payment successful', 'Thank You');
    }
  };

  const handleInput = (name, value) => {
    setData({...data, [name]: value});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FBFBFB', width: '100%'}}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrow}
            source={require('../../assets/leftarrow.png')}
          />
        </Pressable>
        <Text style={styles.navtext}>CheckOut</Text>
      </View>
      <View
        style={{
          // alignItems: 'center',
          justifyContent: 'center',
          borderRadius: hp(6),
          backgroundColor: 'white',
          height: hp(25),
          elevation: 13,
          marginTop: hp(12),
          padding: hp(3),
          marginHorizontal: wp(6),
        }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {lists.map((val, id) => {
            const isLast = id === lists.length - 1;
            return (
              <Pressable
                key={id}
                style={[styles.listProduct, isLast && styles.lastProduct]}>
                <Image source={{uri: val.image}} style={styles.imageLayout} />
              </Pressable>
            );
          })}
        </ScrollView>
        <Text style={styles.checkText}>
          Total: Rs{' '}
          {lists
            .reduce((acc, item) => {
              return acc + item.quantity * item.price;
            }, 0)
            .toFixed(2)}
        </Text>
      </View>
      <View style={styles.personalDetails}>
        <Icon name="person" size={35} color={'lightgrey'} />
        <Text style={styles.personalDetailsText}>Personal Details</Text>
      </View>
      <ScrollView
        style={{marginTop: hp(2)}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.labelText}>Full Name</Text>
          <CustomField
            placeholder={'Enter your full name'}
            value={data.name}
            style={styles.profileInput}
            onChangeText={text => handleInput('fullname', text)}
          />
        </View>
        <View>
          <Text style={styles.labelText}>Email Address</Text>
          <CustomField
            placeholder={'Enter your email'}
            value={data.name}
            style={styles.profileInput}
            onChangeText={text => handleInput('email', text)}
          />
        </View>
        <View>
          <Text style={styles.labelText}>Phone Number</Text>
          <CustomField
            placeholder={'Enter your phone number'}
            value={data.name}
            style={styles.profileInput}
            onChangeText={text => handleInput('number', text)}
          />
        </View>
        <View>
          <Text style={styles.labelText}>Country</Text>
          <CustomField
            placeholder={'Enter your Country'}
            value={data.name}
            style={styles.profileInput}
            onChangeText={text => handleInput('country', text)}
          />
        </View>
        <View>
          <Text style={styles.labelText}>Full Address</Text>
          <CustomField
            placeholder={'Enter your address'}
            value={data.name}
            style={styles.profileInput}
            multiline={true}
            numberOfLines={5}
            onChangeText={text => handleInput('address', text)}
          />
        </View>

        <Pressable onPress={() => setShowPayment(true)} style={styles.checkBtn}>
          <Text style={styles.checkBtnText}>Proceed To Payment</Text>
        </Pressable>

        <Modal visible={showPayment}>
          <WebView
            source={{
              uri: 'https://buy.stripe.com/test_9B6cN5cYp3Bj2Rg0CY3Nm00',
            }}
            onNavigationStateChange={handlePayment}
          />
          <Button
            title="Cancel"
            onPress={() => setShowPayment(false)}
            color={'#e91e63'}
          />
        </Modal>
      </ScrollView>
    </View>
  );
}
