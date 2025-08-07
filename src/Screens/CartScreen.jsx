/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Icons from 'react-native-vector-icons/MaterialIcons';

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
  layout: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: hp(2),
    borderRadius: hp(2),
    marginHorizontal: hp(1),
    padding: hp(1),
    elevation: 5,
  },
  imageLayout: {
    width: wp(30),
    height: hp(15),
    resizeMode: 'contain',
  },
  right: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: hp(1),
    width: '60%',
  },
  textLayout: {
    flexWrap: 'wrap',
    fontSize: hp(2.3),
    fontWeight: '600',
    maxWidth: '100%',
  },
  textPrice: {
    textAlign: 'center',
    fontSize: hp(2),
    fontWeight: '800',
    borderColor: 'lightgrey',
    borderRadius: hp(1),
    borderWidth: 1,
    width: '45%',
    marginTop: hp(1),
    paddingTop: hp(0.5),
    paddingBottom: hp(0.5),
  },
  addView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: hp(3),
    marginHorizontal: wp(1),
  },
  viewText: {
    alignItems: 'center',
  },
  addText: {
    height: hp(4),
    width: wp(11),
    textAlign: 'center',
    // borderColor: '#e91e63',
    // borderWidth: hp(0.5),
    color: 'black',
    fontSize: hp(2.6),
    fontWeight: '500',
    // padding: hp(2),
  },
  buttonView: {
    marginTop: hp(2),
    marginHorizontal: wp(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    display: 'flex',
    height: hp(3.5),
    width: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(10),
    backgroundColor: '#e91e63',
  },
  btnText: {
    fontSize: hp(2.5),
    color: 'white',
    textAlign: 'center',
  },
  dustBin: {
    marginHorizontal: wp(2),
  },
  checkFn: {
    borderColor: '#F5F5F5',
    borderTopWidth: hp(0.5),
    backgroundColor: 'white',
    padding: hp(2),
    elevation: 10,
    height: hp(18.5),
  },
  checkView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
  },
  checkText: {
    fontSize: hp(3),
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

export default function CartScreen() {
  // const {product, data} = route.params;
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);

  const updatedAdd = index => {
    const lists = [...list];
    lists[index].quantity += 1;
    setList(lists);
    AsyncStorage.setItem('user-products', JSON.stringify(lists));
  };

  const updatedRemove = index => {
    const lists = [...list];
    if (lists[index].quantity > 1) {
      lists[index].quantity -= 1;
      setList(lists);
      AsyncStorage.setItem('user-products', JSON.stringify(lists));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const prod = await AsyncStorage.getItem('product');
      const dat = await AsyncStorage.getItem('data');

      setProduct(JSON.parse(prod));
      setData(JSON.parse(dat));
    };
    fetchData();
  }, []);

  // For understanding:

  //✅ useFocusEffect:
  // Jab screen focus hoti hai, React Navigation tumhara diya hua function ko run karta hai — lekin wo expect karta hai ke function bar-bar naya na ho, warna wo listener baar baar remove/add karega.

  // ✅ useCallback:
  // Yeh React ko bolta hai: “Is function ko memory me hi rakh, har render pe naya mat bana.”

  useFocusEffect(
    React.useCallback(() => {
      const getDatas = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user-products');
          console.log('Product list uploaded ', jsonValue);

          const parseStep = jsonValue ? JSON.parse(jsonValue) : [];

          const parsed = Array.isArray(parseStep) ? parseStep : [parseStep];
          // setImage(jsonValue);
          setList(parsed);
        } catch (e) {
          console.log(e);
        }
      };
      getDatas();
    }, []),
  );

  const removeValue = async itemToRemove => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-products');
      const currentList = jsonValue ? JSON.parse(jsonValue) : [];

      const removeCurrentItem = currentList.filter((item, index) => {
        return index !== itemToRemove;
      });

      await AsyncStorage.setItem(
        'user-products',
        JSON.stringify(removeCurrentItem),
      );
      setList(removeCurrentItem);
    } catch (e) {
      console.log('Error in deleting an item in cart ', e);
    }
    console.log('Done deleted sucessfully.');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrow}
            source={require('../../assets/leftarrow.png')}
          />
        </Pressable>
        <Text style={styles.navtext}>Cart</Text>
      </View>

      <ScrollView
        contentContainerStyle={{paddingTop: hp(10), paddingBottom: hp(5)}}>
        {list.map((val, ind) => (
          <TouchableOpacity
            style={styles.layout}
            key={ind}
            onPress={() =>
              navigation.navigate('ProductDetailsScreen', {
                product: product,
                data: data,
              })
            }>
            <View>
              <Image source={{uri: val.image}} style={styles.imageLayout} />
            </View>
            <View style={styles.right}>
              <View style={styles.textView}>
                <Text style={styles.textLayout} numberOfLines={2}>
                  {val.title}
                </Text>
                <Text style={styles.textPrice}>
                  Rs {val.quantity * val.price}
                </Text>
              </View>

              <View style={styles.addView}>
                <View style={styles.buttonView}>
                  <Pressable
                    onPress={() => removeValue(ind)}
                    style={styles.dustBin}>
                    <Icons name="delete" size={32} color="#e91e63" />
                  </Pressable>
                  <Pressable
                    style={styles.btn}
                    onPress={() => {
                      updatedAdd(ind);
                    }}>
                    <Text style={styles.btnText}>+</Text>
                  </Pressable>
                  <View style={styles.viewText}>
                    <Text style={styles.addText}>{val.quantity}</Text>
                  </View>
                  <Pressable
                    style={styles.btn}
                    onPress={() => {
                      updatedRemove(ind);
                    }}>
                    <Text style={styles.btnText}>-</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.checkFn}>
        <View style={styles.checkView}>
          <Text style={styles.checkText}>Total</Text>
          <Text style={styles.checkText}>
            Rs{' '}
            {list
              .reduce((acc, item) => {
                return acc + item.quantity * item.price;
              }, 0)
              .toFixed(2)}
          </Text>
        </View>
        <Pressable
          style={styles.checkBtn}
          onPress={() =>
            navigation.navigate('CheckOutScreen', {
              lists: list,
            })
          }>
          <Text style={styles.checkBtnText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
