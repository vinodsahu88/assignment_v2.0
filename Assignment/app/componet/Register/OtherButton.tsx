import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {Mode} from '../../Redux/ThemeReducer';
import AppColors, {
  AppColors_Dark,
  AppColors_Light,
} from '../../utils/AppColors';

export const OtherButton = ({
  title,
  onPress,
  styleProp,
}: {
  title: string;
  onPress: any;
  styleProp: any | null;
}) => {
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  return (
    <TouchableOpacity
      style={{
        ...buttonStyle.button,
        ...styleProp,
        ...{
          backgroundColor:
            theme === 'light'
              ? AppColors_Light.submitButtonColor
              : AppColors_Dark.submitButtonColor,
        },
      }}
      onPress={() => onPress()}>
      <Text style={buttonStyle.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
  },
});
