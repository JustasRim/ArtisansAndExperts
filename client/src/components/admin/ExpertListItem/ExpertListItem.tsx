import { useEffect, useState } from 'react';

import { useAxios } from '../../../hooks/useAxios';
import { AdminUser } from '../../../utils/Interfaces';
import Button from '../../button/Button';
import styles from './expertListItem.module.scss';

export function ExpertListItem({
  name,
  lastName,
  email,
  approved: isApproved,
  banned: isBanned,
  registrationDate,
}: AdminUser) {
  const [banned, setBanned] = useState<boolean>(isBanned);
  const [approved, setApproved] = useState<boolean>(isApproved);
  const { ax } = useAxios();

  useEffect(() => {
    setBanned(isBanned);
    setApproved(isApproved);
  }, [isApproved, isBanned]);

  const approveToggle = async (email: string) => {
    const response = await ax.patch(`admin/approve?email=${email}&approve=${!approved}`);
    if (response.status === 200) {
      setApproved(response.data);
    }
  };

  const banToggle = async (email: string) => {
    const response = await ax.patch(`admin/expert/block?email=${email}&block=${!banned}`);
    if (response.status === 200) {
      setBanned(response.data);
    }
  };

  return (
    <div className={styles.list__item}>
      <span>{`${name} ${lastName}`}</span>
      <span>{email}t</span>
      <span>{`${registrationDate}`}</span>
      <Button onClick={() => approveToggle(email)}> {approved ? 'Atmesti' : 'Patvirtinti'}</Button>
      <Button>Peržiūrėti</Button>
      <Button onClick={() => banToggle(email)}>{banned ? 'Neblokuoti' : 'Blokuoti'}</Button>
    </div>
  );
}
