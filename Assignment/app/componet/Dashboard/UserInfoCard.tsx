import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import translate from '../../localization/i18n';
import {UserInfo} from '../../modals/Invoice';
import {Mode} from '../../Redux/ThemeReducer';
import {AppColors_Dark, AppColors_Light} from '../../utils/AppColors';
import {getUserInfo} from '../../utils/Database';

const UserInfoCard = () => {
  const [user, setUser] = useState<UserInfo | null>();

  const theme: Mode = useSelector(store => {
    return store.theme.mode;
  });

  useEffect(() => {
    getUserInfo().then(value => {
      setUser(value);
    });
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        ...{
          backgroundColor:
            theme === 'light'
              ? AppColors_Light.userInfoCardbackground
              : AppColors_Dark.userInfoCardbackground,
        },
      }}>
      <Text
        style={{
          ...styles.title,
          ...{
            fontSize: 18,
            textAlign: 'center',
            color:
              theme === 'light'
                ? AppColors_Light.userInfoCardText
                : AppColors_Dark.userInfoCardText,
          },
        }}>
        {translate('welcom_back') + '\n' + user?.username}
      </Text>
      <Text
        style={{
          ...styles.title,
          ...{
            marginTop: 10,
            fontSize: 12,
            color:
              theme === 'light'
                ? AppColors_Light.userInfoCardText
                : AppColors_Dark.userInfoCardText,
          },
        }}>
        {translate('last_login') + ':' + user?.date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontWeight: '600',
  },
});

export default UserInfoCard;
