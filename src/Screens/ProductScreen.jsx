/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {getProducts} from '../Api/getProducts';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../Components/ProductCard';
import SmallProductCard from '../Components/SmallProductCard';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Modals from '../Components/Modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('screen');

export default function UserScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: '',
  });
  const [image, setImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const handleInput = (name, value) => {
    setSearch({...search, [name]: value});
  };

  const fetchData = async () => {
    const response = await getProducts();
    setData(response);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FBFBFB',
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    iconStyle: {
      backgroundColor: '#EEEEEE',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginTop: 10,
      height: 50,
      width: 50,
      textAlign: 'center',
      paddingTop: 10,
    },
    userStyle: {
      height: hp(8),
      width: wp(15),
      resizeMode: 'cover',
      marginRight: 10,
      marginTop: 10,
      borderRadius: wp(50),
      overflow: 'hidden',
    },
    searchStyle: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 40,
      margin: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '90%',
      height: 50,
      borderRadius: 15,
      paddingLeft: 12,
      paddingRight: 12,
    },
    searchText: {
      fontSize: 19,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    allFeatureWidget: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    allFeatureText: {
      margin: 20,
      fontSize: 23,
      fontWeight: '600',
    },
    allFeatureWidget2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    feature: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginRight: 10,
    },
    featureText: {
      fontSize: 19,
    },
    featureWidget: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '90%',
      margin: 'auto',
      borderRadius: 15,
      padding: 10,
    },
    featureImageView: {
      alignItems: 'center',
    },
    featureImageViewLast: {
      marginRight: 10,
    },
    featureImage: {
      height: 70,
      width: 70,
      margin: 12,
      borderRadius: 50,
    },
    featureTexts: {
      fontSize: 16,
    },
    saleImage: {
      marginTop: 20,
      width: '90%',
      height: 200,
      margin: 'auto',
      borderRadius: 15,
    },
    dealWidget: {
      flexDirection: 'row',
      backgroundColor: '#4392F9',
      width: '90%',
      margin: 'auto',
      borderRadius: 15,
      padding: 12,
      marginTop: 20,
      justifyContent: 'space-between',
    },
    dealColor: {
      color: 'white',
    },
    dealBox1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
    },
    dealBox2: {
      flexDirection: 'row',
      margin: 'auto',
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
      padding: 10,
    },
    dealText: {
      fontSize: 25,
    },
    dealText2: {
      fontSize: 19,
    },
    productSlide: {
      flexDirection: 'row',
      marginTop: 30,
      width: '90%',
      margin: 'auto',
    },

    starView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginRight: 50,
      paddingLeft: 10,
    },
    specialOffer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      width: '90%',
      margin: 'auto',
      borderRadius: 15,
      padding: 12,
      marginTop: 10,
      elevation: 5,
    },
    specialOfferImage: {
      height: 80,
      width: 80,
    },
    specialOfferText: {
      fontSize: 15,
      width: 200,
      marginLeft: 15,
    },
    specialOfferText2: {
      fontSize: 19,
      width: 200,
      marginLeft: 15,
    },
    trendWidget: {
      flexDirection: 'row',
      backgroundColor: '#FD6E86',
      width: '90%',
      margin: 'auto',
      borderRadius: 15,
      padding: 10,
      marginTop: 20,
      justifyContent: 'space-between',
    },
    saleBox2: {
      backgroundColor: 'white',
      width: '90%',
      margin: 'auto',
      borderRadius: 15,
      elevation: 5,
      marginTop: 10,
    },
    saleImage2: {
      width: '100%',
      height: 200,
      margin: 'auto',
      borderRadius: 15,
    },
    sale2View: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      margin: 'auto',
      paddingTop: 10,
      paddingBottom: 10,
    },
    saleText: {
      fontSize: 24,
    },
    saleText2: {
      fontSize: 19,
    },
    saleButton: {
      backgroundColor: '#F83758',
      padding: 7,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
    },
    saleFont: {
      fontSize: 17,
      color: 'white',
    },
    sponsor: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: 15,
      width: '90%',
      borderRadius: 10,
      margin: 'auto',
      paddingTop: 10,
      paddingBottom: 10,
      padding: 10,
      backgroundColor: 'white',
      elevation: 5,
      marginBottom: 10,
    },
    sponsorImage: {
      margin: 'auto',
      borderRadius: 10,
    },
    sponsor2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      alignContent: 'space-between',
    },
    sponsorText: {
      fontSize: 19,
      fontWeight: 'bold',
      marginTop: 7,
    },
    sponsorText2: {
      fontSize: 23,
      fontWeight: '500',
      marginBottom: 7,
    },
  });

  const getLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status === RESULTS.GRANTED;
    }
  };

  const getData = async () => {
    const hasPermission = await getLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Location permission is required to get your position.',
      );
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        const {
          latitude,
          longitude,
          altitude,
          accuracy,
          altitudeAccuracy,
          heading,
          speed,
        } = position.coords;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Altitude:', altitude);
        console.log('Accuracy:', accuracy);
        console.log('Altitude Accuracy:', altitudeAccuracy);
        console.log('Heading:', heading);
        console.log('Speed:', speed);
        console.log('Timestamp:', position.timestamp);
      },
      error => {
        console.warn('Location Error:', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
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
    getData();
    getDatas();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Icons name="menu" size={30} color="black" style={styles.iconStyle} />
        </Pressable>
        <Text
          style={{
            fontFamily: 'Avenue de Madison',
            fontSize: hp(8),
            color: '#f83758',
            paddingTop: hp(3),
          }}>
          Shoppy
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Image source={{uri: image?.uri}} style={styles.userStyle} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchStyle}>
        <View style={styles.searchBox}>
          <Icons name="search" size={30} />
          <TextInput
            placeholder="Search any Product"
            value={search.name}
            onChangeText={text => handleInput('name', text)}
            style={styles.searchText}
          />
        </View>
        <Pressable>
          <Icons name="mic" size={30} />
        </Pressable>
      </View>

      <View style={styles.allFeatureWidget}>
        <Text style={styles.allFeatureText}>All Featured</Text>
        <View style={styles.allFeatureWidget2}>
          <Pressable>
            <View style={styles.feature}>
              <Text style={styles.featureText}>Sort</Text>
              <Icons name="swap-vert" size={30} />
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.feature}>
              <Text style={styles.featureText}>Filter</Text>
              <Icons name="filter-alt" size={30} />
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.featureWidget} horizontal={true}>
        <Pressable>
          <View style={styles.featureImageView}>
            <Image
              source={require('../../assets/beauty.jpg')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Beauty</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.featureImageView}>
            <Image
              source={require('../../assets/fashion.png')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Fashion</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.featureImageView}>
            <Image
              source={require('../../assets/kids.png')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Kids</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.featureImageView}>
            <Image
              source={require('../../assets/menscloth.jpg')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Mens</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={[styles.featureImageView, styles.featureImageViewLast]}>
            <Image
              source={require('../../assets/womencloths.jpg')}
              style={styles.featureImage}
            />
            <Text style={styles.featureText}>Womens</Text>
          </View>
        </Pressable>
      </ScrollView>

      <Image
        source={require('../../assets/sale1.jpg')}
        style={styles.saleImage}
      />
      <View style={styles.dealWidget}>
        <View>
          <View>
            <Text style={[styles.dealColor, styles.dealText]}>
              Deal Of The Day
            </Text>
          </View>
          <View style={styles.dealBox1}>
            <Icons name="alarm" style={styles.dealColor} size={20} />
            <Text style={[styles.dealColor, styles.dealText2]}>
              22h 55m 20s remaining
            </Text>
          </View>
        </View>
        <View>
          <Pressable style={styles.dealBox2}>
            <Text style={[styles.dealColor, styles.dealText2]}>View all</Text>
            <Icons name="east" style={styles.dealColor} size={25} />
          </Pressable>
        </View>
      </View>
      <ScrollView horizontal={true} style={styles.productSlide}>
        {data.map((val, ind) => (
          <ProductCard val={val} key={ind} data={data} />
        ))}
      </ScrollView>
      <View style={styles.specialOffer}>
        <View>
          <Image
            source={require('../../assets/specialoffer.jpg')}
            style={styles.specialOfferImage}
          />
        </View>
        <View>
          <Text style={styles.specialOfferText2}>Special Offers 😱</Text>
          <Text style={styles.specialOfferText}>
            We make sure you get the offer you need at best price
          </Text>
        </View>
      </View>
      <Image
        source={require('../../assets/heels.png')}
        style={styles.saleImage}
      />
      <View style={styles.trendWidget}>
        <View>
          <View>
            <Text style={[styles.dealColor, styles.dealText]}>
              Trending Products
            </Text>
          </View>
          <View style={styles.dealBox1}>
            <Icons name="calendar-month" style={styles.dealColor} size={20} />
            <Text style={[styles.dealColor, styles.dealText2]}>
              Last Date 29/02/22
            </Text>
          </View>
        </View>
        <View>
          <Pressable style={styles.dealBox2}>
            <Text style={[styles.dealColor, styles.dealText2]}>View all</Text>
            <Icons name="east" style={styles.dealColor} size={25} />
          </Pressable>
        </View>
      </View>
      <ScrollView horizontal={true} style={styles.productSlide}>
        {data.map((val, ind) => (
          <SmallProductCard val={val} key={ind} data={data} />
        ))}
      </ScrollView>
      <View style={styles.saleBox2}>
        <Image
          source={require('../../assets/sale2.jpg')}
          style={styles.saleImage2}
        />
        <View style={styles.sale2View}>
          <View>
            <View>
              <Text style={styles.saleText}>New Arrival</Text>
            </View>
            <View>
              <Text style={styles.saleText2}>Summer'25 collection</Text>
            </View>
          </View>
          <View>
            <Pressable style={styles.saleButton}>
              <Text style={styles.saleFont}>View all</Text>
              <Icons name="east" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.sponsor}>
        <Text style={styles.sponsorText2}>Sponserd</Text>
        <Image
          source={require('../../assets/sponsor.jpg')}
          style={styles.sponsorImage}
        />
        <View style={styles.sponsor2}>
          <Text style={styles.sponsorText}>Upto 50% Off</Text>
          <Icons name="chevron-right" size={30} />
        </View>
      </View>
      <Modals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        image={image}
      />
    </ScrollView>
  );
}
