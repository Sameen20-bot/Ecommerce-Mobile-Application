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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
});

export default function CheckOutScreen({route}) {
  const {lists} = route.params;
  const navigation = useNavigation();
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
          borderRadius: hp(2),
          backgroundColor: 'white',
          height: hp(25),
          elevation: 13,
          marginTop: hp(12),
          padding: hp(3),
          marginHorizontal: wp(3),
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
    </View>
  );
}
