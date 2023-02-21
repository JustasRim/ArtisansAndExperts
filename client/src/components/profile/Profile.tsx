import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { useAxios } from '../../hooks/useAxios';
import { Select, UserProfile } from '../../utils/Interfaces';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import { PictureUpload } from '../pictureUpload/PictureUpload';
import styles from './profile.module.scss';

const userProfile = z.object({
  workDescription: z.string().optional(),
  mobilePhone: z.string(),
  city: z.string().max(100),
  radius: z.number(),
  activities: z
    .object({
      label: z.string(),
      value: z.number(),
    })
    .array()
    .optional(),
});

type UserProfileInput = z.infer<typeof userProfile>;

type Props = {
  profileLink: string;
};

export function Profile({ profileLink }: Props) {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<UserProfile, Error>('profile', async () => {
    const profile = await ax.get(profileLink);
    return profile.data;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileInput>({
    defaultValues: { ...data, activities: data?.activities ?? [] },
    resolver: zodResolver(userProfile),
  });

  const [selected, setSelected] = useState<Select[]>([]);

  useEffect(() => {
    reset({ ...data, activities: data?.activities ?? [] });
    if (!data?.selectedActivities) return;
    setSelected(data?.selectedActivities);
  }, [data]);

  const onSubmit = async (submitData: UserProfileInput) => {
    submitData.activities = selected;
    const userData = await ax.post('user', submitData);
    if (!userData) {
      throw 'error';
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
          <label htmlFor="radius">Perimetras (km)</label>
          <Input register={register} id="radius" type="number" />
          {errors.radius?.message && <p className="error">{errors.radius?.message}</p>}
          <label htmlFor="activities">Veiklos:</label>
          <MultiSelect
            className={styles.profile__multiselect}
            overrideStrings={{
              selectAll: 'Pasirinkti viską',
              search: 'Ieškoti',
              selectSomeItems: 'Pasirinkti',
            }}
            options={data?.activities ?? []}
            value={selected}
            onChange={setSelected}
            labelledBy="Pasirinkti"
          />
          {errors.activities?.message && <p className="error">{errors.activities?.message}</p>}
          <Button type="submit">Atnaujinti duomenis</Button>
        </form>
      </Card>
    </>
  );
}
