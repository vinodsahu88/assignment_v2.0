import {getLocales} from 'react-native-localize';

const validLocales = ['en'];

const getDefaultDeviceLocale = () => {
  const locales = getLocales();
  return Array.isArray(locales) ? locales[0].languageCode : 'en';
};

export const getLanguageCode = () => {
  const deviceLocale = getDefaultDeviceLocale();
  //console.log("Device Locale ::::::::::",deviceLocale)
  return validLocales.includes(deviceLocale) ? deviceLocale : deviceLocale;
};
