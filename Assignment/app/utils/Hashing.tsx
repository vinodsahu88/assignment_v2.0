import {JSHash, JSHmac, CONSTANTS} from 'react-native-hash';

export type callback = (message: string) => {};
export const hashingPassword = (
  password: string,
  callbackSucess: callback,
  callbackError: callback,
) => {
  JSHash(password, CONSTANTS.HashAlgorithms.sha256)
    .then(hash => {
      console.log('Hash ::::::::::::::', hash);
      callbackSucess(hash);
    })
    .catch(e => {
      console.log('Hash Error ::::::::::::::', e);
      callbackError(e);
    });
};
