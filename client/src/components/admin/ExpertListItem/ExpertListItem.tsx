import { useState } from 'react';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import Button from '../../button/Button';
import styles from './expertListItem.module.scss';

type Props = {
  adminUser: AdminUser;
};

export function ExpertListItem({ adminUser }: Props) {
  const [banned, setBanned] = useState<boolean>(adminUser.banned);
  const [approved, setApproved] = useState<boolean>(adminUser.approved);
  const { ax } = useAxios();
  const approveToggle = async (email: string) => {
    const response = await ax.patch(`expert/approve?email=${email}`);
    if (response.status === 204) {
      setApproved((curr) => !curr);
    }
  };

  const banToggle = async (email: string) => {
    const response = await ax.patch(`expert/block?email=${email}`);
    if (response.status === 204) {
      setBanned((curr) => !curr);
    }
  };

  return (
    <div className={styles.list__item}>
      <span>{`${adminUser.name} ${adminUser.lastName}`}</span>
      <span>{adminUser.email}t</span>
      <span>{`${adminUser.registrationDate}`}</span>
      <Button onClick={() => approveToggle(adminUser.email)}> {approved ? 'Atmesti' : 'Patvirtinti'}</Button>
      <Button>Peržiūrėti</Button>
      <Button onClick={() => banToggle(adminUser.email)}>{banned ? 'Neblokuoti' : 'Blokuoti'}</Button>
    </div>
  );
}
