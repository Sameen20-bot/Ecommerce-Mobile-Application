import {StyleSheet, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textArea: {
    height: hp(15),
    borderRadius: wp(6),
    width: wp(70),
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: wp(4),
    margin: 12,
    fontSize: wp(5),
    color: 'black',
  },
  input: {
    // height: hp(6),
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

export default function CustomField({
  value,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      multiline={multiline}
      numberOfLines={numberOfLines}
      value={value}
      style={[multiline ? styles.textArea : styles.input, styles.nameMargin]}
      onChangeText={onChangeText}
    />
  );
}
