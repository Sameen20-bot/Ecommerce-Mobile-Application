/* eslint-disable react-native/no-inline-styles */
import {StyleSheet} from 'react-native';
import {Button, View} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const styles = StyleSheet.create({});

export default function AnimationScreen() {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = width.value + 50;
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title='Check Me'/>
    </View>
  );
}
