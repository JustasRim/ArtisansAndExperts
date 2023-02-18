import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { useAxios } from '../../hooks/useAxios';
import { UserProfile } from '../../utils/Interfaces';
import Button from '../button/Button';
import Card from '../card/Card';
import Input from '../input/Input';
import { PictureUpload } from '../pictureUpload/PictureUpload';

const userProfile = z.object({
  workDescription: z.string().optional(),
  mobilePhone: z.string(),
  city: z.string().max(100),
  radius: z.number(),
});

type UserProfileInput = z.infer<typeof userProfile>;

export function Profile() {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<UserProfile, Error>('profile', async () => {
    const profile = await ax.get('user');
    return profile.data;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileInput>({
    defaultValues: { ...data },
    resolver: zodResolver(userProfile),
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  const onSubmit = async (data: UserProfileInput) => {
    const userData = await ax.post('user', data);
    if (!userData) {
      throw 'errror';
    }
  };

  if (isLoading) {
    return <div>Kraunasi...</div>;
  }

  if (error) {
    return <div>Klaida...</div>;
  }

  return (
    <>
      <h1>Profilis</h1>
      <Card>
        <h2>Nuotrauka</h2>
        <PictureUpload initialImgSrc={data?.profileSrc} />
      </Card>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Asmeneninė informacija</h2>
          <label htmlFor="mobilePhone">Mobilus numeris</label>
          <Input register={register} id="mobilePhone" type="text" />
          {errors.mobilePhone?.message && <p className="error">{errors.mobilePhone?.message}</p>}
          <label htmlFor="workDescription">Darbo aprašymas</label>
          <Input register={register} id="workDescription" type="text" />
          {errors.workDescription?.message && <p className="error">{errors.workDescription?.message}</p>}
          <label htmlFor="city">Miestas</label>
          <Input register={register} id="city" type="text" />
          {errors.city?.message && <p className="error">{errors.city?.message}</p>}
          <label htmlFor="radius">Perimetras</label>
          <Input register={register} id="radius" type="number" />
          {errors.radius?.message && <p className="error">{errors.radius?.message}</p>}
          <Button type="submit">Atnaujinti duomenis</Button>
        </form>
      </Card>
    </>
  );
}
