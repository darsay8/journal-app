import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: '',
  secure: true,
});

describe('fileUpload test', () => {
  test('should load a file and return an url', async () => {
    const res = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
    );
    const blob = await res.blob();

    const file = new File([blob], 'image.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // delete image
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.v2.api.delete_resources(imageId, {}, (e, res) => {
      console.log(res);
    });
  });

  test('should return an error', async () => {
    const file = new File([], 'image.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
