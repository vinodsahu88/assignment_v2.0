import React, {useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../componet/Comman/Background';
import PinComponent from '../componet/Comman/PinComponent';
import ThemeChange from '../componet/Dashboard/ThemeChange';
import {OtherButton} from '../componet/Register/OtherButton';
import translate from '../localization/i18n';
import {UserInfo} from '../modals/Invoice';
import {switchMode} from '../redux/ThemeAction';
import {Mode} from '../Redux/ThemeReducer';
import {AppColors_Dark, AppColors_Light} from '../utils/AppColors';
import {setUserInfo} from '../utils/Database';
import {hashingPassword} from '../utils/Hashing';
import {
  validateConfirmPin,
  validatePin,
  validatePinAndConfirmPin,
} from '../utils/Validations';

const PinScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const dispatch = useDispatch();
  const userInfo: UserInfo = route.params;
  const [error, setError] = useState<string | null>(null);
  let pin = useRef<string | undefined>();
  let confirmPin = useRef<string | undefined>();

  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThemeChange
          profileCallback={() => {
            dispatch(switchMode(theme === 'light' ? 'dark' : 'light'));
          }}
        />
      ),
    });
  });

  const validate = () => {
    let pinValidation = validatePin(pin.current);
    let confirmPinValidation = validateConfirmPin(confirmPin.current);

    console.log('Errors :::', pinValidation, confirmPinValidation);

    if (pinValidation !== undefined) {
      setError(pinValidation);
      return;
    }
    if (confirmPinValidation !== undefined) {
      setError(confirmPinValidation);
      return;
    }
    if (!validatePinAndConfirmPin(pin.current!, confirmPin.current!)) {
      setError(translate('pin_not_match'));
      return;
    }
    setError(null);
    hashingPassword(
      pin.current!,
      password => {
        userInfo.mpin = password;
        setUserInfo(userInfo).then(() => {
          navigation.push('LoginScreen');
        });
      },
      error => {
        setError(translate('pin_not_match'));
      },
    );
  };

  return (
    <Background>
      <View />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <PinComponent
              title={translate('enter_mpin')}
              onTextChange={(password: string) => {
                pin.current = password;
              }}
            />
            <View style={{height: 40}} />
            <PinComponent
              title={translate('enter_confirm_mpin')}
              onTextChange={(password: string) => {
                confirmPin.current = password;
              }}
            />
          </View>
          {error && (
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color:
                    theme === 'light'
                      ? AppColors_Light.errorMessageColor
                      : AppColors_Dark.errorMessageColor,
                  fontWeight: '500',
                }}>
                {error}
              </Text>
            </View>
          )}
          <OtherButton
            styleProp={{marginTop: 20, width: '50%'}}
            title={translate('save')}
            onPress={() => {
              validate();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: 'center',
  },
});

export default PinScreen;
