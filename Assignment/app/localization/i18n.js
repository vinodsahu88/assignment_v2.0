import i18n from 'i18n-js';
import {en,es} from './supportedLanguages';
import {getLanguageCode} from './getDeviceLanguage';

console.log("Locale ::::::::::::::::::",getLanguageCode())
i18n.locale = getLanguageCode();
i18n.fallbacks = true;
i18n.translations = { en, es };

const translate = (path) => i18n.t(path);
export default translate;
