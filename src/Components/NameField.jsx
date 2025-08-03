import {StyleSheet, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  input: {
    height: hp(6),
    width: wp(70),
    textAlign: 'left',
    backgroundColor: 'white',
    padding: wp(3),
    margin: wp(2),
    fontSize: wp(5),
    color: 'black',
    borderRadius: wp(10),
  },
  nameMargin: {
    marginTop: wp(5),
  },
});
export default function NameField({value,onChangeText}) {
  return (
    <TextInput
      placeholder="Full name"
      value={value}
      style={[styles.input, styles.nameMargin]}
      onChangeText={onChangeText}
    />
  );
}
