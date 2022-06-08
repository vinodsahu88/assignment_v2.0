import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserInfo} from '../modals/Invoice';

export const setUserInfo = async (userInfo: UserInfo) => {
  try {
    let value = JSON.stringify(userInfo);
    await AsyncStorage.setItem('setUserInfo', value);
    return 'success';
  } catch (e) {
    // saving error
  }
};

export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('setUserInfo');
    if (value !== null) {
      let userInfo: UserInfo = JSON.parse(value);
      return userInfo;
    }
    return null;
  } catch (e) {
    // error reading value
  }
};
