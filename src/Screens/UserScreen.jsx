import React, {useEffect, useState} from 'react';
import {getUsers} from '../Api/getProducts';

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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

export default function UserScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: '',
  });
  const [image, setImage] = useState();
  const imagesData = ['', '', ''];

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
  const handleInput = (name, value) => {
    setSearch({...search, [name]: value});
  };

  const fetchData = async () => {
    const response = await getUsers();
    setData(response);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
    getDatas();
  }, []);

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
    arrow: {
      height: 30,
      width: 20,
    },
    searchWidget: {
      paddingTop: 80,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      height: 25,
      width: 25,
      marginRight: 10,
      marginLeft: 10,
    },
    searchText: {
      fontSize: 19,
    },
    userBox: {
      backgroundColor: 'white',
      flexDirection: 'row',
      height: 80,
      borderBottomWidth: 1,
      borderColor: 'lightgrey',
      alignItems: 'center',
      padding: 15,
    },
    userImage: {
      height: 70,
      width: 70,
    },
    userText: {
      fontSize: 19,
    },
  });

  return (
    <View>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrow}
            source={require('../../assets/leftarrow.png')}
          />
        </Pressable>
        <Text style={styles.navtext}>Users List</Text>
      </View>
      <View style={styles.searchWidget}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchText}
          onChangeText={text => handleInput('name', text)}
        />
      </View>
      <ScrollView>
        {data.map((val, ind) => (
          <View key={ind} style={styles.userBox}>
            {/* <Image source={{uri: image?.uri}}  /> */}
            <Image sourse={{uri: imagesData[ind]}} style={styles.userImage} />

            <Text style={styles.userText}>
              {capitalize(val.name.firstname)} {capitalize(val.name.lastname)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
