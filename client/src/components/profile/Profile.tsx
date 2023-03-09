import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { useAxios } from '../../hooks/useAxios';
import { SelectOption, UserProfile } from '../../utils/Interfaces';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import { MultiSelectWrapper } from '../multiselect/MultiselectWrapper';
import { PictureUpload } from '../pictureUpload/PictureUpload';
import { TextArea } from '../textArea/TextArea';
import styles from './profile.module.scss';

const userProfile = z.object({
  workDescription: z.string().max(250, 'Neviršykite 250 raidžių limito').optional(),
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
  email?: string;
};

export function Profile({ email }: Props) {
  const { ax } = useAxios();
  const { isLoading, error, data } = useQuery<UserProfile, Error>('profile', async () => {
    let path = 'user';
    if (email) {
      path += `/${email}`;
    }

    const profile = await ax.get(path);
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

  const [selected, setSelected] = useState<SelectOption[]>([]);

  useEffect(() => {
    reset({ ...data, activities: data?.activities ?? [] });
    if (!data?.selectedActivities) return;
    setSelected(data?.selectedActivities);
  }, [data]);

  const onSubmit = async (submitData: UserProfileInput) => {
    submitData.activities = selected;
    let path = 'user';
    if (email) {
      path += `/${email}`;
    }

    const userData = await ax.post(path, submitData);
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
        <PictureUpload initialImgSrc={data?.profileSrc} email={email} />
      </Card>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Asmeneninė informacija</h2>
          <label htmlFor="mobilePhone">Mobilus numeris</label>
          <Input register={register} id="mobilePhone" type="text" />
          {errors.mobilePhone?.message && <p className="error">{errors.mobilePhone?.message}</p>}
          <label htmlFor="workDescription">Trumpas veiklos aprašymas</label>
          <TextArea register={register} id="workDescription" />
          {errors.workDescription?.message && <p className="error">{errors.workDescription?.message}</p>}
          <label htmlFor="city">Miestas</label>
          <Input register={register} id="city" type="text" />
          {errors.city?.message && <p className="error">{errors.city?.message}</p>}
          <label htmlFor="radius">Perimetras (km)</label>
          <Input register={register} id="radius" type="number" />
          {errors.radius?.message && <p className="error">{errors.radius?.message}</p>}
          <label htmlFor="activities">Veiklos:</label>
          <MultiSelectWrapper options={data?.activities ?? []} value={selected} onChange={setSelected} />
          {errors.activities?.message && <p className="error">{errors.activities?.message}</p>}
          <Button type="submit">Atnaujinti duomenis</Button>
        </form>
      </Card>
    </>
  );
}
