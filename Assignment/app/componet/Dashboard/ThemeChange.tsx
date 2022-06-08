import React from 'react';
import {Image, StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Dark, AppColors_Light} from '../../utils/AppColors';

const ThemeChange = ({profileCallback}: {profileCallback: any}) => {
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{
          false: AppColors_Dark.backgroundColor,
          true: AppColors_Light.backgroundColor,
        }}
        thumbColor={'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={profileCallback}
        value={theme === 'light'}
      />
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

export default ThemeChange;
