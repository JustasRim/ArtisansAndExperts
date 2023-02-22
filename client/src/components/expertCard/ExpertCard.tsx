import { Link } from 'react-router-dom';

import { Expert } from '../../utils/Interfaces';
import { Card } from '../card/Card';
import styles from './expertCard.module.scss';

export function ExpertCard({ id, name, workDescription, profileSrc, activities }: Expert) {
  return (
    <Card className={styles.card}>
      <h2>{name}</h2>
      <img src={profileSrc} className={styles.card__img} alt="profile" />
      {activities?.map((activity) => (
        <span key={activity}>{activity}</span>
      ))}
      <p className={styles.card__description}>{workDescription}</p>
      <Link to={id}>Sužinok daugiau</Link>
    </Card>
  );
}
