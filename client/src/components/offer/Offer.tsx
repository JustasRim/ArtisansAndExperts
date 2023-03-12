import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { useAxios } from '../../hooks/useAxios';
import { SelectOption } from '../../utils/Interfaces';
import Button from '../button/Button';
import { Card } from '../card/Card';
import { ImageUploader } from '../imageUploader/ImageUploader';
import Input from '../input/Input';
import { Select } from '../select/Select';
import { TextArea } from '../textArea/TextArea';
import styles from './offer.module.scss';

const offer = z.object({
  activityId: z.string(),
  timeLine: z.string(),
  city: z.string().max(100),
  name: z.string().max(100),
  description: z.string(),
});

type OfferInputs = z.infer<typeof offer>;

export function Offer() {
  const { ax } = useAxios();
  const { data: activities } = useQuery<SelectOption[], Error>('activities', async () => {
    const activitiesRes = await ax.get('project/activities');
    return activitiesRes.data;
  });

  const [offerId, setOfferId] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferInputs>({ resolver: zodResolver(offer) });

  const submit = async (submitData: OfferInputs) => {
    const response = await ax.post('project', submitData);
    if (response.status !== 201) {
      throw response.statusText;
    }

    setOfferId(response.data.id);
  };

  return (
    <div className={styles.offer}>
      {!offerId ? (
        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.offer__head}>
            <Card className={styles.offer__card}>
              <h2>Pasirinkite paslaugos tipą</h2>
              {activities && <Select options={activities} register={register} id="activityId" />}
              {errors.activityId?.message && <p className="error">{errors.activityId?.message}</p>}
            </Card>
            <Card className={styles.offer__card}>
              <h2>Kada darbas turi būti atliktas?</h2>
              <Select
                options={[
                  { label: 'Kuo skubiau', value: 0 },
                  { label: 'Per artimiausius tris mėnesius', value: 1 },
                  { label: 'Aš esu lankstus', value: 2 },
                  { label: 'Specifiška data', value: 3 },
                ]}
                register={register}
                id="timeLine"
              />
              {errors.timeLine?.message && <p className="error">{errors.timeLine?.message}</p>}
            </Card>
          </div>
          <Card className={styles.offer__card}>
            <h2>Kuriame mieste turi būti atliktas darbas?</h2>
            <Input type="text" register={register} id="city" />
            {errors.city?.message && <p className="error">{errors.city?.message}</p>}
          </Card>
          <Card className={styles.offer__card}>
            <h2>Problemos pavadinimas</h2>
            <Input type="text" register={register} id="name" />
            {errors.name?.message && <p className="error">{errors.name?.message}</p>}
            <h2>Aprašykite turimą problemą</h2>
            <TextArea rows={5} register={register} id="description" />
            {errors.description?.message && <p className="error">{errors.description?.message}</p>}
          </Card>
          <div className={styles.offer__submit}>
            <Button>Skelbti problemą</Button>
          </div>
        </form>
      ) : (
        <>
          <h2>Nuotraukos, jūsų užsakymui</h2>
          <ImageUploader projectId={offerId} />
        </>
      )}
    </div>
  );
}
