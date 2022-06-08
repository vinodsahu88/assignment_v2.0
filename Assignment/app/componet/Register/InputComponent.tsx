import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Light, AppColors_Dark} from '../../utils/AppColors';

export default InputComponent = ({
  title,
  isSecureField,
  onChange,
  error,
}: {
  title: string;
  isSecureField: boolean;
  onChange: any;
  error: string;
}) => {
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });
  return (
    <View style={{marginBottom: 10}}>
      <Text
        style={{
          ...inputStyle.title,
          ...{
            color:
              theme === 'light'
                ? AppColors_Light.inputFiledTitles
                : AppColors_Dark.inputFiledTitles,
          },
        }}>
        {title}
      </Text>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={isSecureField}
        style={{
          ...inputStyle.input,
          ...{
            borderColor:
              theme === 'light'
                ? AppColors_Light.inputBorderColor
                : AppColors_Dark.inputBorderColor,
          },
        }}
        onChangeText={onChange}
      />
    </View>
  );
};

const inputStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    padding: 8,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
  },
});
