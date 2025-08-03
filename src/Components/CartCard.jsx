import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';

const CartCard = ({val, fetchDelete, layout}) => {
  return (
    <TouchableOpacity onPress={() => fetchDelete(val.id)} style={layout}>
      <View>
        <Image source={{uri: val.image}} style={styles.imageLayout} />
      </View>
      <View style={styles.right}>
        <Text style={styles.textLayout}>{val.title}</Text>
        <View style={styles.starView}>
          <Text style={styles.starText}>{val.rating.rate}</Text>
          <StarRatingDisplay
            rating={val.rating.rate}
            starSize={30}
            starStyle={{marginHorizontal: -1}}
          />
        </View>
        <Text style={styles.textPrice}>${val.price}</Text>
        <View style={styles.orderLayout}>
          <Text>Total Order (1) :</Text>
          <Text>${val.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  imageLayout: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },
  right: {
    marginLeft: 15,
    width: '60%',
  },
  textLayout: {
    flexWrap: 'wrap',
    fontSize: 19,
    fontWeight: '600',
    maxWidth: '100%',
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
