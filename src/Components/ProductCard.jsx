import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  productContent: {
    width: wp(60),
    height: hp(50),
    marginBottom: hp(3),
    marginRight: wp(4),
    backgroundColor: 'white',
    borderRadius: wp(3),
    elevation: 10,
    padding: wp(3),
    justifyContent: 'space-between',
  },
  productImage: {
    width: '100%',
    height: '50%',
    borderRadius: wp(3),
    marginBottom: hp(1.5),
  },
  productTitle: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(0.5),
    flexShrink: 1,
    width: '100%',
  },
  productCategory: {
    fontSize: hp(2.0),
    color: '#666',
    marginBottom: hp(0.5),
    flexShrink: 1,
    width: '100%',
  },
  starRating: {
    marginTop: hp(0.5),
  },
  textPrice: {
    textAlign: 'center',
    fontSize: hp(2.1),
    fontWeight: '800',
    borderColor: 'lightgrey',
    borderRadius: wp(2),
    borderWidth: 1,
    paddingVertical: hp(0.8),
    marginTop: hp(1),
    marginBottom: 0,
    width: '100%',
  },
});

export default function ProductCard({val, data}) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {product: val, data: data})
      }>
      <View style={styles.productContent}>
        <Image source={{uri: val.image}} style={styles.productImage} />

        <View>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.productTitle}>
            {val.title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productCategory}>
            {val.category}
          </Text>

          <View style={styles.starRating}>
            <StarRatingDisplay
              rating={val.rating.rate}
              starSize={hp(3.3)}
              starStyle={{marginHorizontal: -1}}
            />
          </View>
        </View>

        <Text style={styles.textPrice}>Rs {val.price}</Text>
      </View>
    </Pressable>
  );
}
