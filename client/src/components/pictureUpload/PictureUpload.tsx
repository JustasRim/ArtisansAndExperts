import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useAxios } from '../../hooks/useAxios';
import { ProfilePreview } from '../../utils/CropPicture';
import Button from '../button/Button';
import styles from './pictureUpload.module.scss';

type Props = {
  initialImgSrc?: string;
};

export function PictureUpload({ initialImgSrc }: Props) {
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState<string>(initialImgSrc ?? '');
  const [editOn, seteditOn] = useState(false);

  const { ax } = useAxios();

  const uploadedRef = useRef<HTMLImageElement>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles.slice(0, 1).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )[0];

      setImgSrc(file.preview);
      seteditOn(true);
    },
  });

  const saveProfilePic = async () => {
    seteditOn(false);
    const img = uploadedRef.current;
    if (!img || !crop) return;
    const blob = await ProfilePreview(img, crop);
    setImgSrc(URL.createObjectURL(blob));
    const t = await blob;
    const formData = new FormData();
    formData.append('file', t);
    const response = await ax.post('user/picture', formData, {
      headers: {
        'Content-Type': 'multiple/form-data',
      },
    });

    if (response && response.status === 200) {
      setImgSrc(response.data);
    }
  };

  const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  };

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  return (
    <>
      <div className={styles.container}>
        {imgSrc &&
          (editOn ? (
            <ReactCrop crop={crop} aspect={1} onChange={(c) => setCrop(c)} circularCrop={true}>
              <img
                className={styles.container__picture}
                ref={uploadedRef}
                src={imgSrc}
                alt="profile"
                onLoad={onImgLoad}
              />
            </ReactCrop>
          ) : (
            <img
              className={styles.container__picture}
              ref={uploadedRef}
              src={imgSrc}
              alt="profile"
              onLoad={onImgLoad}
            />
          ))}
      </div>
      <div className={styles.container__dropzone} {...getRootProps()}>
        <p>Tempkite nuotrauką čia</p>
        <input {...getInputProps()} />
      </div>
      {editOn && <Button onClick={saveProfilePic}>Išsaugoti nuotrauką</Button>}
    </>
  );
}
