import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { useAxios } from '../../hooks/useAxios';
import Button from '../button/Button';
import styles from './imageUploader.module.scss';

type PreviewBlob = Blob & {
  preview: string;
};

type Props = {
  projectId: string;
};

export function ImageUploader({ projectId }: Props) {
  const [files, setFiles] = useState<PreviewBlob[]>([]);

  const { ax } = useAxios();

  const submit = async () => {
    const formData = new FormData();

    files.forEach((img: PreviewBlob) => {
      formData.append('files', img);
    });

    const response = await ax.post(`project/pictures?projectId=${projectId}`, formData);
    if (response.status !== 204) {
      throw response.statusText;
    }

    window.location.href = 'dashboard';
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <div className={styles['thumb-container__thumb']} key={file.name}>
      <div className={styles['thumb-container__inner']}>
        <img
          src={file.preview}
          className={styles['thumb-container__img']}
          alt="thumbnail"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <section>
      <div className={styles.container} {...getRootProps()}>
        <p>Tempkite nuotraukas čia</p>
        <input {...getInputProps()} />
      </div>
      <aside className={styles['thumb-container']}>{thumbs}</aside>
      <div className={styles.container__submit}>
        <Button onClick={() => submit()}>Išsaugoti nuotraukas</Button>
      </div>
    </section>
  );
}
