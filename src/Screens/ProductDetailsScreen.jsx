/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    padding: wp(4),
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
  },
  productImage: {
    width: wp(90),
    height: hp(40),
    resizeMode: 'contain',
  },
  sizeContainer: {
    marginVertical: hp(1),
  },
  sizeText: {
    fontWeight: '600',
    fontSize: hp(2.4),
    marginBottom: hp(1),
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
  },
  sizeBox: {
    borderWidth: hp(0.3),
    borderColor: '#fa7189',
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    backgroundColor: 'white',
  },
  sizeBoxFocus: {
    borderWidth: hp(0.3),
    borderColor: '#fa7189',
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    backgroundColor: '#fa7189',
  },
  sizeBoxText: {
    fontSize: hp(2.4),
    color: '#fa7189',
    fontWeight: '500',
  },
  sizeBoxTextFocus: {
    fontSize: hp(2.4),
    color: 'white',
    fontWeight: '500',
  },
  productDetails: {
    marginTop: hp(1),
  },
  productTitle: {
    fontSize: hp(3.0),
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: hp(2.4),
    color: 'gray',
    marginVertical: hp(0.5),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: wp(2),
    fontSize: hp(2.1),
    color: 'gray',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    gap: wp(2),
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: hp(2.4),
  },
  discountPrice: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: '#e91e63',
  },
  discountTag: {
    backgroundColor: '#fa7189',
    color: 'white',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: 5,
    fontSize: hp(2.4),
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: hp(2),
    justifyContent: 'space-between',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#eb3030',
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: hp(3.0),
  },
  deliveryBox: {
    backgroundColor: '#ffe0e0',
    padding: hp(1),
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: hp(2),
  },
  deliveryText: {
    fontSize: hp(3),
    color: 'gray',
  },
  deliveryTime: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  descriptionContainer: {
    marginBottom: hp(2),
  },
  productDescription: {
    fontSize: hp(2.4),
    fontWeight: '500',
  },
  description: {
    fontSize: hp(2.4),
    lineHeight: hp(2.6),
    color: '#444',
  },
  similarCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: wp(3),
    elevation: 2,
  },
  similarListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: hp(2),
    marginBottom: hp(5),
  },
  similarImage: {
    width: '100%',
    height: hp(15),
    resizeMode: 'contain',
    marginBottom: hp(1),
  },
  similarTitle: {
    fontSize: hp(2.4),
    color: '#333',
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  similarPrice: {
    textAlign: 'center',
    fontSize: hp(2),
    fontWeight: '800',
    borderColor: 'lightgrey',
    borderRadius: wp(2),
    borderWidth: 1,
    paddingVertical: hp(0.6),
    marginTop: hp(1),
    width: '100%',
  },
  sectionTitle: {
    marginVertical: hp(2),
    fontSize: hp(3.0),
    fontWeight: 'bold',
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
    height: hp(5),
    width: wp(13),
    textAlign: 'center',
    borderColor: '#e91e63',
    borderWidth: hp(0.5),
    color: 'black',
    fontSize: hp(2.6),
    fontWeight: '500',
    // padding: hp(2),
  },
  buttonView: {
    marginHorizontal: wp(9),
    flexDirection: 'row',
    gap: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn1: {
    height: hp(6),
    width: wp(12),
    textAlign: 'center',
    fontSize: hp(4),
    borderRadius: hp(10),
    backgroundColor: '#e91e63',
    color: 'white',
    // padding: hp(3),
  },
  btn2: {
    height: hp(6),
    width: wp(12),
    textAlign: 'center',
    fontSize: hp(4),
    borderRadius: hp(10),
    backgroundColor: '#e91e63',
    color: 'white',
  },
});

export default function ProductDetailsScreen({route}) {
  const {product, data} = route.params;
  const [selectedSize, setSelectedSize] = useState('XXL');
  const navigation = useNavigation();
  const [add, setAdd] = useState(1);

  const datas = {
    image: product.image,
    title: product.title,
    price: product.price,
    quantity: add,
    size: selectedSize,
  };

  const addToCart = async () => {
    try {
      const existing = await AsyncStorage.getItem('user-products');
      let cart = existing ? JSON.parse(existing) : [];
      console.log('product adding', datas);
      cart.push(datas);
      await AsyncStorage.setItem('user-products', JSON.stringify(cart));
    } catch (e) {
      console.log(e);
    }
  };

  // const removeCart = async () => {
  //   await AsyncStorage.removeItem('user-products');
  // };

  const handlePress = () => {
    setAdd(prev => prev + 1);
  };

  const handlePress2 = () => {
    if (add > 1) {
      setAdd(prev => prev - 1);
    }
  };

  const handleCartData = async () => {
    await addToCart();
    await AsyncStorage.setItem('product', JSON.stringify(product));
    await AsyncStorage.setItem('data', JSON.stringify(data));
    navigation.navigate('CartScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.productImage} />
      </View>

      <View style={styles.sizeContainer}>
        <Text style={styles.sizeText}>Size: {selectedSize}</Text>
        <View style={styles.sizeRow}>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedSize === size ? styles.sizeBoxFocus : styles.sizeBox
              }
              onPress={() => setSelectedSize(size)}>
              <Text
                style={
                  selectedSize === size
                    ? styles.sizeBoxTextFocus
                    : styles.sizeBoxText
                }>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <View style={styles.ratingContainer}>
          <StarRatingDisplay
            rating={product.rating.rate}
            starSize={hp(3.3)}
            starStyle={{marginHorizontal: -1}}
          />
          <Text style={styles.ratingText}>{product.rating.count} reviews</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>Rs 3000</Text>
        <Text style={styles.discountPrice}>Rs {add * product.price}</Text>
        <Text style={styles.discountTag}>50% OFF</Text>
      </View>

      <View style={styles.addView}>
        <View style={styles.viewText}>
          <Text style={styles.addText}>{add}</Text>
        </View>
        <View style={styles.buttonView}>
          <Pressable onPress={() => handlePress()}>
            <Text style={styles.btn1}>+</Text>
          </Pressable>
          <Pressable onPress={() => handlePress2()}>
            <Text style={styles.btn2}>-</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.productDescription}>Product Details</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buyButton} onPress={handleCartData}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryBox}>
        <Text style={styles.deliveryText}>Delivery in</Text>
        <Text style={styles.deliveryTime}>1 within Hour</Text>
      </View>

      <Text style={styles.sectionTitle}>Similar Products</Text>
      <View style={styles.similarListContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.similarCard}
            onPress={() =>
              navigation.push('ProductDetailsScreen', {
                product: item,
                data: data,
              })
            }>
            <Image source={{uri: item.image}} style={styles.similarImage} />
            <Text numberOfLines={2} style={styles.similarTitle}>
              {item.title}
            </Text>
            <Text style={styles.similarPrice}>Rs {item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
