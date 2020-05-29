import * as CryptoJS from 'crypto-js';

export class Encryption {
    SecretKey:string="xyz";
    encrypt(input:string):string {
    let _key = CryptoJS.enc.Utf8.parse(this.SecretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.SecretKey);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(input), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
   }

   decrypt(input:string):string {
    let _key = CryptoJS.enc.Utf8.parse(this.SecretKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.SecretKey);

    let decrypted = CryptoJS.AES.decrypt(
      input, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
    return decrypted;
   }
}