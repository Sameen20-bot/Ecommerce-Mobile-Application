/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import CartScreen from './src/Screens/CartScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserScreen from './src/Screens/UserScreen';
import ProductScreen from './src/Screens/ProductScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactUsScreen from './src/Screens/ContactUsScreen';
import SettingScreen from './src/Screens/SettingScreen';
import UploadScreen from './src/Screens/UploadScreen';
import ProfileEditScreen from './src/Screens/ProfileEditScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProductDetailsScreen from './src/Screens/ProductDetailsScreen';
import CheckOutScreen from './src/Screens/CheckOutScreen';
import AnimationScreen6 from './src/AnimationsPractice/AnimationScreen6';

// import UserScreen from './src/Screens/UserScreen';
// import ProductsScreen from './src/Screens/ProductsScreen';
// import ProductScreen from './src/Screens/ProductScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

// function ProductTopTabs() {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="Product" component={ProductScreen} />
//       <TopTab.Screen name="Cart" component={CartScreen} />
//       <TopTab.Screen name="User" component={UserScreen} />
//     </TopTab.Navigator>
//   );
// }

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: hp(8),
          padding: hp(2),
          backgroundColor: '#fff',
          elevation: 10,
          borderTopWidth: 1,
        },
      }}>
      {/* <Tab.Screen name="Home" component={ProductTopTabs} /> */}
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icons
                name="home"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Home'}
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f83758',
                  padding: hp(1),
                  borderRadius: hp(40),
                  marginTop: -hp(2),
                  elevation: 5,
                  width: wp(17),
                  height: hp(8),
                }}>
                <Icons name="shopping-cart" size={30} color="#fff" />
              </View>
            );
          },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icons
                name="settings"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Settings'}
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: 280,
        },
        drawerActiveBackgroundColor: '#FEC5F6',
        drawerPosition: 'left',
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={MyTabs}
        options={{
          drawerIcon: ({focused}) => {
            return (
              <Icons
                name="home"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Home'}
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Gift Cards"
        component={AnimationScreen6}
        options={{
          drawerIcon: ({focused}) => {
            return (
              <Icons
                name="card-giftcard"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Gift Cards'}
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({focused}) => {
            return (
              <Icons
                name="call"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Contact Us'}
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: ({focused}) => {
            return (
              <Icons
                name="settings"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Settings'}
              </Text>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={UserScreen}
        options={{
          drawerIcon: ({focused}) => {
            return (
              <Icons
                name="logout"
                size={30}
                style={{color: focused ? '#f83758' : 'black'}}
              />
            );
          },
          drawerLabel: ({focused}) => {
            return (
              <Text
                style={{color: focused ? '#f83758' : 'black', fontSize: 18}}>
                {'Log Out'}
              </Text>
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Drawer">
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} />
          <Stack.Screen
            name="ProfileEditScreen"
            component={ProfileEditScreen}
          />
          <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
          />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
          {/* Add other screens here if needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
