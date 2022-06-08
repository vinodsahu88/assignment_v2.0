import translate from '../localization/i18n';

export const validateUsername = (username: string | null) => {
  if (username === null) {
    return translate('enter_user_name');
  }
  if (username.trim().length <= 0) {
    return translate('enter_valid_user_name');
  }
  return null;
};

export const validatePassword = (password: string | null) => {
  if (password === null) {
    return translate('enter_user_password');
  }
  if (password.trim().length <= 0) {
    return translate('enter_valid_user_password');
  }
  return null;
};

export const validatePin = (pin: string | undefined) => {
  if (pin === undefined || pin.trim().length < 4) {
    return translate('enter_pin');
  }
  return undefined;
};

export const validateConfirmPin = (pin: string | undefined) => {
  if (pin === undefined || pin.trim().length < 4) {
    return translate('enter_confirm_pin');
  }
  return undefined;
};

export const validatePinAndConfirmPin = (pin: string, confirm: string) => {
  if (pin !== confirm) {
    return false;
  }
  return true;
};
