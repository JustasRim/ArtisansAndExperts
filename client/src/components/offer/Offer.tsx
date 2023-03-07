import Button from '../button/Button';
import { Card } from '../card/Card';
import Input from '../input/Input';
import { TextArea } from '../textArea/TextArea';
import styles from './offer.module.scss';

export function Offer() {
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
            <select>
              <option>Kuo skubiau</option>
              <option>Per artimiausius tris mėnesius</option>
              <option>Aš esu lankstus</option>
              <option>Specifiška data</option>
            </select>
          </Card>
        </div>
        <Card className={styles.offer__card}>
          <h2>Kurioje vietoje turi būti atliktas darbas?</h2>
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
