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
});

export default function MessageField({value,onChangeText}) {
  return (
    <TextInput
      style={styles.textArea}
      multiline
      numberOfLines={5}
      placeholder="Message"
      value={value}
      onChangeText={onChangeText}
    />
  );
}
