/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import { md5 } from '../../utils/hash/hash';
import { BACKEND_URL } from '../../config/backend/backend';

export default class ImageModel {
  private static putImage = async (signedRequest: string, file: File, fileType: string) => {
    try {
      await axios.put(signedRequest, file, {
        headers: {
          'Content-Type': fileType
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  };
  private static saveImage = async (photoUrl: string) => {
    const res = await axios.post(`${BACKEND_URL}/upload_avatar`, { photo_url: photoUrl }, { withCredentials: true });
    return res.data.photo_url;
  };
  public static uploadImage = async (file: File) => {
    try {
      const fileParts = file.name.split('.');
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      const resAfterSigning = await axios.post('https://images.sharemyride.ru/api/sign_s3', {
        fileName: md5(fileName),
        fileType: fileType
      });
      const returnData = resAfterSigning.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      await ImageModel.putImage(signedRequest, file, fileType);
      const savedUrl = await ImageModel.saveImage(url);
      return savedUrl;
    } catch (e) {
      throw new Error(e);
    }
  };
}
