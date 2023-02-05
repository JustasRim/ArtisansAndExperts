import styles from './switch.module.scss';

type prop = {
  checked: boolean;
  className?: string;
  setChecked: (checked?: boolean) => void;
};

const Switch = ({ checked, setChecked, className }: prop) => {
  return (
    <div className={`${styles.toggle} ${className ?? ''}`}>
      <input className={styles.toggle__input} type="checkbox" checked={checked} readOnly />
      <button
        className={`${styles.toggle__btn} ${checked ? styles.checked : ''}`}
        onClick={() => setChecked(!checked)}
      />
    </div>
  );
};

export default Switch;
