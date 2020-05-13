import axios from 'axios';

type availableFileTypes = 'png' | 'jpeg';
type PresignAmazonData = Record<string, any>;

export default class ImageModel {
  private static getPresignUrl = async (fileType: availableFileTypes): Promise<PresignAmazonData> => {
    const res = await axios.get('/api/user/sign_s3', {
      params: {
        fileType
      }
    });
    return res.data;
  };

  static uploadImage = async (image: File): Promise<void> => {
    try {
      const fileType = image.type.split('/')[1] as availableFileTypes;
      const presignData = await ImageModel.getPresignUrl(fileType);
      const bodyFormData = new FormData();
      Object.entries(presignData.fields).forEach(([key, value]) => bodyFormData.set(key, value as string));
      bodyFormData.append('file', image);
      axios.post(presignData.url, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}
