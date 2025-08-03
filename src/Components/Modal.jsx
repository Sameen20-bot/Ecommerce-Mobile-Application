import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Modals = ({modalVisible, setModalVisible, image}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <Pressable style={styles.centeredView} onPressOut={()=>setModalVisible(false)}>
        <View style={styles.modalView}>
          <Image source={{uri: image?.uri}} style={styles.modalImage} />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
  width: wp('80%'),
  height: hp('60%'),
  resizeMode: 'cover',
  borderRadius: hp('10%'),
}
});

export default Modals;
