import { ReactNode } from 'react';

import styles from './card.module.scss';

type Prop = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: Prop) {
  return <div className={`${styles.card} ${className ?? ''}`}>{children}</div>;
}
