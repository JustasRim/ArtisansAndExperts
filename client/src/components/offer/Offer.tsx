import { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

import { Select } from '../../utils/Interfaces';
import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import { MultiSelectWrapper } from '../multiselect/MultiselectWrapper';
import { TextArea } from '../textArea/TextArea';
import styles from './offer.module.scss';

export function Offer() {
  const [selected, setSelected] = useState<Select[]>([]);

  return (
    <div className={styles.offer}>
      <form>
        <div className={styles.offer__head}>
          <Card className={styles.offer__card}>
            <h2>Pasirinkite paslaugos tipą</h2>
            <select>
              <option>a</option>
              <option>b</option>
            </select>
          </Card>
          <Card className={styles.offer__card}>
            <h2>Kada darbas turi būti atliktas?</h2>
            <MultiSelectWrapper
              options={[
                { label: 'Kuo skubiau', value: 1 },
                { label: 'Per artimiausius tris mėnesius', value: 2 },
                { label: 'Aš esu lankstus', value: 3 },
                { label: 'Specifiška data', value: 4 },
              ]}
              value={selected}
              onChange={setSelected}
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
