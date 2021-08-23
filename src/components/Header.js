import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons';

const Header = ({headerTitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icons name="west" size={30} color="white" />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: hp('7%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    // fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold',
    // paddingRight: 10,
  },
  iconContainer: {
    width: wp('10%'),
    justifyContent: 'center',
    // paddingLeft: 10,
  },
  headingContainer: {
    width: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
