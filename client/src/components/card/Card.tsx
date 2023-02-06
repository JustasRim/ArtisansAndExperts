import { ReactNode } from 'react';

import styles from './card.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return <div className={`${styles.card} ${className ?? ''}`}>{children}</div>;
};

export default Card;
