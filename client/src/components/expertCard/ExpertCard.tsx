import { Link } from 'react-router-dom';

import { Expert } from '../../utils/Interfaces';
import { Card } from '../card/Card';
import styles from './expertCard.module.scss';

export function ExpertCard({ id, name, workDescription, profileSrc, rating }: Expert) {
  return (
    <Card className={styles.card}>
      <div className={styles.card__header}>
        <h2>{name} </h2>
        <span>
          {rating} / {5}
        </span>
      </div>
      <img src={profileSrc} className={styles.card__img} alt="profile" />
      <p className={styles.card__description}>{workDescription}</p>
      <Link to={id}>Sužinok daugiau</Link>
    </Card>
  );
}
