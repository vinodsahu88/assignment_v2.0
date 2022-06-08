import React from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Light, AppColors_Dark} from '../../utils/AppColors';

const Background = ({children}: {children: Element[]}) => {
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  return (
    <SafeAreaView
      style={{
        ...backgroundStyles.container,
        ...{
          backgroundColor:
            theme === 'light'
              ? AppColors_Light.backgroundColor
              : AppColors_Dark.backgroundColor,
        },
      }}>
      {children}
    </SafeAreaView>
  );
};

const backgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Background;
