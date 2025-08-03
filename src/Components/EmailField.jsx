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
});

export default function EmailField({value, onChangeText}) {
  return (
    <TextInput
      placeholder="Your mail"
      value={value}
      style={styles.input}
      onChangeText={onChangeText}
    />
  );
}
