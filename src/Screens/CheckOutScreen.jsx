import React, {useEffect, useState} from 'react';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

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
} from 'react-native';
import {getProducts} from '../Api/getProducts';
import {useNavigation} from '@react-navigation/native';
import CartCard from '../Components/CartCard';

const {height, width} = Dimensions.get('screen');

export default function CheckOutScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const fetchDelete = async id => {
    fetch('https://fakestoreapi.com/carts/1', {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const fetchData = async () => {
    const res = await getProducts();
    setData(res);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    scrollContainer: {
      backgroundColor: '#FBFBFB',
    },
    layout: {
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 15,
      margin: 10,
      padding: 10,
      elevation: 5,
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
    navtext: {
      margin: 'auto',
      fontSize: 25,
      fontWeight: '500',
    },
    deliveryView: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 15,
    },
    locationIcon: {
      height: 30,
      width: 30,
    },
    locationText: {
      fontSize: 22,
      fontWeight: '600',
    },
    deliveryWidget: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    deliveryIcon: {
      height: 40,
      width: 40,
    },
    writeIcon: {
      height: 25,
      width: 25,
    },
    addressView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    box1: {
      backgroundColor: 'white',
      elevation: 10,
      padding: 10,
      width: '75%',
    },
    box2: {
      backgroundColor: 'white',
      elevation: 10,
      padding: 10,
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    boxBold: {
      fontWeight: '700',
    },
    boxText: {
      fontSize: 19,
      textAlign: 'justify',
    },
    arrow: {
      height: 30,
      width: 20,
    },
    shoppingText: {
      fontSize: 22,
      fontWeight: '600',
      margin: 15,
    },
    right: {
      marginLeft: 15,
      width: '60%',
    },
    imageLayout: {
      width: 140,
      height: 140,
      borderRadius: 20,
    },
    textLayout: {
      flexWrap: 'wrap',
      fontSize: 19,
      fontWeight: '600',
      maxWidth: '100%',
    },
    textPrice: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: '800',
      borderColor: 'lightgrey',
      borderRadius: 10,
      borderWidth: 1,
      width: '45%',
      paddingTop: 5,
      paddingBottom: 5,
    },
    starView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 50,
    },
    starText: {
      fontSize: 19,
      fontWeight: '500',
    },
    orderLayout: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'lightgrey',
      borderTopWidth: 1,
      marginTop: 10,
      padding: 12,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  console.log(data);
  let a;
  if (data.length > -1) {
    a = 1;
  }

  console.log(a);

  return (
    <View>
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
          Checkout
        </Text>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{paddingTop: 70}}>
        <View style={styles.deliveryView}>
          <Image
            source={require('../../assets/location.png')}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>Delivery Address</Text>
        </View>
        <View style={styles.deliveryWidget}>
          <View style={styles.box1}>
            <View style={styles.addressView}>
              <Text style={[styles.boxText, styles.boxBold]}>Address:</Text>
              <Image
                source={require('../../assets/write.png')}
                style={styles.writeIcon}
              />
            </View>
            {/* {Platform.OS === 'ios' && ( */}
            <Text style={styles.boxText}>
              {Platform.OS === 'ios'
                ? '123 Main Street, Apt 4B New York, NY 10001'
                : 'android'}
            </Text>
            {/* )} */}
          </View>
          <View style={styles.box2}>
            <Pressable>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.deliveryIcon}
              />
            </Pressable>
          </View>
        </View>
        <Text style={styles.shoppingText}>Shopping List</Text>
        {data.map((val, ind) => (
          <CartCard
            val={val}
            key={ind}
            fetchDelete={fetchDelete}
            layout={styles.layout}
          />
        ))}
      </ScrollView>
    </View>
  );
}
