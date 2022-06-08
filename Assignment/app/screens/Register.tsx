import React, {useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Background from '../componet/Comman/Background';
import ThemeChange from '../componet/Dashboard/ThemeChange';
import InputComponent from '../componet/Register/InputComponent';
import {OtherButton} from '../componet/Register/OtherButton';
import translate from '../localization/i18n';
import {UserInfo} from '../modals/Invoice';
import {switchMode} from '../redux/ThemeAction';
import {Mode} from '../Redux/ThemeReducer';
import {AppColors_Light, AppColors_Dark} from '../utils/AppColors';
import {validatePassword, validateUsername} from '../utils/Validations';

const Register = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const userName = useRef<string | null>(null);
  const password = useRef<string | null>(null);

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
      headerBackVisible: false,
    });
  });
  return (
    <Background>
      <View />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <InputComponent
            title={translate('username')}
            isSecureField={false}
            onChange={(text: string) => {
              setError(null);
              userName.current = text;
            }}
            error={''}
          />
          <InputComponent
            title={translate('password')}
            isSecureField={true}
            onChange={(text: string) => {
              setError(null);
              password.current = text;
            }}
            error={''}
          />
          {error && (
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  ...styles.error_message,
                  ...{
                    color:
                      theme === 'light'
                        ? AppColors_Light.errorMessageColor
                        : AppColors_Dark.errorMessageColor,
                  },
                }}>
                {error}
              </Text>
            </View>
          )}
          <OtherButton
            styleProp={{marginTop: 10}}
            title={translate('register')}
            onPress={() => {
              let username_validation = validateUsername(userName.current);
              let password_validation = validatePassword(password.current);
              if (username_validation !== null) {
                setError(username_validation);
                return;
              }
              if (password_validation !== null) {
                setError(password_validation);
                return;
              }

              let userInfo: UserInfo = {
                username: userName.current!,
                password: password.current!,
                mpin: '',
                date: new Date(),
              };
              navigation.push('PinScreen', userInfo);
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
  },
  error_message: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Register;
