import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useSelector} from 'react-redux';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Light, AppColors_Dark} from '../../utils/AppColors';

const PinComponent = ({
  title,
  onTextChange,
}: {
  title: string;
  onTextChange: any;
}) => {
  const [pin, setPin] = useState();
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  return (
    <View>
      <Text
        style={{
          ...styles.title,
          ...{
            color:
              theme === 'light'
                ? AppColors_Light.inputFiledTitles
                : AppColors_Dark.inputFiledTitles,
          },
        }}>
        {title}
      </Text>
      <SmoothPinCodeInput
        cellStyle={{
          ...styles.cellStyle,
          ...{
            borderColor:
              theme === 'light'
                ? AppColors_Light.inputBorderColor
                : AppColors_Dark.inputBorderColor,
          },
        }}
        textStyle={{
          ...styles.textStyle,
          ...{
            color:
              theme === 'light'
                ? AppColors_Light.inputBorderColor
                : AppColors_Dark.inputBorderColor,
          },
        }}
        password
        mask="﹡"
        cellSize={36}
        codeLength={4}
        value={pin}
        onFulfill={() => {
          console.log('................Done ..........');
        }}
        onTextChange={(password: any) => {
          console.log('password :::::', password);
          setPin(password);
          onTextChange(password);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cellStyle: {borderWidth: 1},
  textStyle: {fontSize: 24},
});

export default PinComponent;
