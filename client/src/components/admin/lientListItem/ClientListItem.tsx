import { useEffect, useState } from 'react';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import Button from '../../button/Button';
import styles from '../ExpertListItem/expertListItem.module.scss';

export function ClientListItem({ name, lastName, email, banned: isBanned, registrationDate }: AdminUser) {
  const [banned, setBanned] = useState<boolean>(isBanned);
  const { ax } = useAxios();

  useEffect(() => {
    setBanned(isBanned);
  }, [isBanned]);

  const banToggle = async (email: string) => {
    const response = await ax.patch(`client/block?email=${email}`);
    if (response.status === 204) {
      setBanned((curr) => !curr);
    }
  };

  return (
    <div className={styles.list__item}>
      <span>{`${name} ${lastName}`}</span>
      <span>{email}t</span>
      <span>{`${registrationDate}`}</span>
      <Button>Peržiūrėti</Button>
      <Button onClick={() => banToggle(email)}>{banned ? 'Neblokuoti' : 'Blokuoti'}</Button>
    </div>
  );
}
