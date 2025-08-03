import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  productContent: {
    width: wp(42),
    height: hp(35),
    marginRight: wp(4),
    marginBottom: hp(4),
    backgroundColor: 'white',
    borderRadius: wp(3),
    elevation: 8,
    padding: wp(2),
    justifyContent: 'space-between',
  },
  productImage: {
    width: '100%',
    height: hp(18),
    borderRadius: wp(3),
    marginBottom: hp(1),
  },
  productTitle: {
    fontSize: hp(2.4),
    color: '#333',
    fontWeight: '600',
    marginBottom: hp(0.5),
  },
  textPrice: {
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
});

export default function SmallProductCard({val, data}) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.productContent}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {product: val, data: data})
      }>
      <Image source={{uri: val.image}} style={styles.productImage} />

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.productTitle}>
        {val.title}
      </Text>

      <Text style={styles.textPrice}>Rs {val.price}</Text>
    </Pressable>
  );
}
