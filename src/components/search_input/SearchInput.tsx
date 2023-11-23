import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./SearchInput.module.css";
import Icon from "../common/icon/Icon";

interface SearchInputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type" | "value"
  > {
  value: string;
  onClearSearch?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const SearchInput = ({ value, onClearSearch, ...rest }: SearchInputProps) => (
  <div className={styles.searchContainer}>
    <Icon name="search" size="medium" className={styles.searchIcon} />
    <input type="text" value={value} {...rest} className={styles.searchInput} />
    {value.length > 0 && (
      <Icon name="clear" size="medium" onClick={onClearSearch} className={styles.clearIcon} />
    )}
  </div>
);

export default SearchInput;
