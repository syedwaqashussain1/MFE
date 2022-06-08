import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private encryptSecretKey = 'NF.435@7$#%$#45643%^905%43SDFSDj&fsdn%kjnksd23';

  encryptData(data) {

    try {
      return btoa(CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString());
    } catch (e) {
      /*console.log(e);*/
    }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(atob(data), this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      /*console.log(e);*/
    }
  }


  randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
