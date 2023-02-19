import { ReactNode } from 'react';

import styles from './card.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return <div className={`${styles.card} ${className ?? ''}`}>{children}</div>;
}
