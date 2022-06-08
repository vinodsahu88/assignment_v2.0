import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const LogoutButton = ({profileCallback}: {profileCallback: any}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 4,
          margin: 4,
        }}
        onPress={profileCallback}>
        <Image
          style={styles.icon}
          source={require('../../resources/icons/logout.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {width: 18, height: 18, tintColor: 'white'},
});

export default LogoutButton;
