import { Checkbox } from '../checkbox/Checkbox';
import Input from '../input/Input';
import styles from './searchBar.module.scss';

type Props = {
  setSearch: (value: string) => void;
  setApproved: (value: boolean) => void;
  setBanned: (value: boolean) => void;
};

export function SearchBar({ setSearch, setApproved, setBanned }: Props) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleApprovedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApproved(e.target.checked);
  };

  const handleBannedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBanned(e.target.checked);
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.search__bar}
        placeholder="Paieška"
        onChange={handleSearchChange}
        id="search"
        type="text"
      />
      <span>
        <label htmlFor="approved">Patvirtintas:</label>
        <Checkbox className={styles.search__check} onChange={handleApprovedChange} id="approved" />
      </span>
      <span>
        <label htmlFor="banned">Blokuotas:</label>
        <Checkbox className={styles.search__check} onChange={handleBannedChange} id="banned" />
      </span>
    </div>
  );
}
