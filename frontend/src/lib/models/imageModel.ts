import axios from 'axios';
import { md5 } from '../../utils/hash/hash';
import { BACKEND_URL } from '../../config/backend/backend';

export default class ImageModel {
  public static putImage = async (signedRequest: string, file: File, fileType: string) => {
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
  // public static saveImage = async () => {
  //   const res = await axios.post(`${BACKEND_URL}/get_all_organizations`, {  }, { withCredentials: true })
  // }
  public static uploadImage = async (file: File) => {
    try {
      const fileParts = file.name.split('.');
      const fileName = fileParts[0];
      const fileType = fileParts[1];
      console.log(fileName, fileType);
      const resAfterSigning = await axios.post('https://images.sharemyride.ru/api/sign_s3', {
        fileName: md5(fileName),
        fileType: fileType
      });
      const returnData = resAfterSigning.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      await ImageModel.putImage(signedRequest, file, fileType);
      return url;
    } catch (e) {
      throw new Error(e);
    }
  };
}
