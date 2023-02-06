import { ReactNode } from 'react';

import styles from './button.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

const Button = ({ type, onClick, className, children }: Props) => {
  return (
    <button type={type} className={`${className} ${styles.button ?? ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
