import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from 'react-native-collapsible/Accordion';
import {useState} from 'react';

const styles = StyleSheet.create({});

const PrivacyScreen = () => {
  const [collapse, setCollapse] = useState(true);

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, shipping address, billing address, and payment details.',
        'Usage Data: App usage patterns, device information, IP address, and cookies (if applicable).',
        'Order Details: Products purchased, order history, and preferences.',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'Process and deliver your orders.',
        'Provide customer support and respond to inquiries.',
        'Send updates, promotions, and offers (only if you opt in).',
        'Improve app performance, features, and security.',
      ],
    },
    {
      title: '3. Sharing Your Information',
      content: [
        'Trusted third-party service providers (payment gateways, shipping companies).',
        'Law enforcement if required by law.',
      ],
    },
    {
      title: '4. Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is completely secure.',
      ],
    },
    {
      title: '5. Your Rights',
      content: [
        'Access, update, or delete your personal information.',
        'Opt out of promotional communications.',
      ],
    },
    {
      title: '6. Contact Us',
      content: [
        '📧 Email: support@shoppyapp.com',
        '📍 Address: 123 Market Street, Karachi, Pakistan',
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={{margin: wp(5)}}>
      <View style={styles.privacyView}>
        <Icons name="privacy-tip" size={130} color="green" />
        <Text style={styles.privacyHead}>Privacy Policy</Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyScreen;
