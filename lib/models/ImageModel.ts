import axios from 'axios';

type availableFileTypes = 'png' | 'jpeg';

export default class ImageModel {
  static getPresignUrl = async (fileType: availableFileTypes) => {
    await axios.get('/user/sign_s3', {
      params: {
        fileType
      }
    });
  };
}
