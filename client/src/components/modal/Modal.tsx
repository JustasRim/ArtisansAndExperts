import { ReactNode, useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { useInteractions } from '../../hooks/useInteract';
import { Card } from '../card/Card';
import styles from './modal.module.scss';

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, children, onClose }: Props) {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (!localTheme) return;
    setTheme(localTheme);
  });

  const { registerInteraction } = useInteractions();

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={`theme-${theme}`}>
        <div className={styles.modal}>
          <Card className={styles.modal__card}>
            <div
              className={styles.modal__close}
              role="button"
              aria-label="close"
              tabIndex={0}
              {...registerInteraction(onClose)}
            >
              x
            </div>
            {children}
          </Card>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}
