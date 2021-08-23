import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const SuccessfullyBooked = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <LottieView
          source={require('../../LottieAnimation/success.json')}
          autoPlay
          loop
          style={{width: wp('30%'), height: hp('27%')}}
        />
      </View>
      <View>
        <Text style={styles.messageText}>TICKET BOOKED SUCCESSFULLY</Text>
      </View>
      <Pressable
        style={styles.navigateBack}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navigateText}>Back to Home</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: '#F7A828',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navigateBack: {
    width: wp('90%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: '#F7A828',
    marginTop: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigateText: {
    color: '#F7A828',
    fontSize: 18,
  },
});

export default SuccessfullyBooked;
