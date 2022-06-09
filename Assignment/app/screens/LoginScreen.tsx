import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Background from '../componet/Comman/Background';
import PinComponent from '../componet/Comman/PinComponent';
import {OtherButton} from '../componet/Register/OtherButton';
import translate from '../localization/i18n';
import {UserInfo} from '../modals/Invoice';
import {AppColors_Dark, AppColors_Light} from '../utils/AppColors';
import {getUserInfo} from '../utils/Database';
import {validatePin, validatePinAndConfirmPin} from '../utils/Validations';
import {useSelector} from 'react-redux';
import {Mode} from '../Redux/ThemeReducer';
import ThemeChange from '../componet/Dashboard/ThemeChange';
import {switchMode} from '../redux/ThemeAction';
import {hashingPassword} from '../utils/Hashing';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });
  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const [error, setError] = useState<string | null>(null);
  let pin = useRef<string | undefined>();

  useEffect(() => {
    getUserInfo().then(value => {
      setUserInfo(value);
    });
  }, []);

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

  const validate = () => {
    let pinValidation = validatePin(pin.current);

    if (pinValidation !== undefined) {
      setError(pinValidation);
      return;
    }

    hashingPassword(
      pin.current!,
      password => {
        if (!validatePinAndConfirmPin(password, userInfo?.mpin!)) {
          setError(translate('invalid_mpin'));
          return;
        }
        setError(null);
        navigation.push('Dashboard');
      },
      error => {
        setError(pinValidation);
        return;
      },
    );
  };

  return (
    <Background>
      <View />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center', marginTop: '10%'}}>
            <PinComponent
              title={translate('enter_mpin')}
              onTextChange={(password: string) => {
                pin.current = password;
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
            title={translate('login')}
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

export default LoginScreen;
