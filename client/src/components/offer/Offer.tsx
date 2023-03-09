import { useState } from 'react';
import { useQuery } from 'react-query';

import { useAxios } from '../../hooks/useAxios';
import { SelectOption } from '../../utils/Interfaces';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import { Select } from '../select/Select';
import { TextArea } from '../textArea/TextArea';
import styles from './offer.module.scss';

export function Offer() {
  const { ax } = useAxios();
  const { data: activities } = useQuery<SelectOption[], Error>('activities', async () => {
    const activitiesRes = await ax.get('project/activities');
    return activitiesRes.data;
  });

  return (
    <div className={styles.offer}>
      <form>
        <div className={styles.offer__head}>
          <Card className={styles.offer__card}>
            <h2>Pasirinkite paslaugos tipą</h2>
            {activities && <Select options={activities} />}
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
            />
          </Card>
        </div>
        <Card className={styles.offer__card}>
          <h2>Kuriame mieste turi būti atliktas darbas?</h2>
          <Input id="problem" type="text" onChange={() => {}} />
        </Card>
        <Card className={styles.offer__card}>
          <h2>Problemos pavadinimas</h2>
          <Input id="problem" type="text" onChange={() => {}} />
          <h2>Aprašykite turimą problemą</h2>
          <TextArea id="description" rows={5} />
        </Card>
        <div className={styles.offer__submit}>
          <Button>Skelbti problemą</Button>
        </div>
      </form>
    </div>
  );
}
