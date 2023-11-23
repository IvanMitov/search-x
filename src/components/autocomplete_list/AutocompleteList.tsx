import { PropsWithChildren, MouseEvent } from "react";
import Icon, { IconProps } from "../common/icon/Icon";
import styles from "./AutocompleteList.module.css";

export type ResultItem<T> = T & { [key: string]: any };

interface AutocompleteListProps<T> {
  results: ResultItem<T>[];
  displayKeyName: keyof T;
  onResultClick: (item: ResultItem<T>) => void;
  onHistoryRemove?: (item: ResultItem<T>) => void;
}

const AutocompleteList = <T, >({
  results,
  displayKeyName,
  onResultClick,
  onHistoryRemove,
}: AutocompleteListProps<T>) => {
  if (!results?.length) return null;

  const getIconName = (item: ResultItem<T>): IconProps["name"] =>
    item.isInHistory ? "history" : "search";

  const handleClearClick = (result: ResultItem<T>) => (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onHistoryRemove?.(result);
  };

  return (
    <ListWrapper>
      {results.map(result => (
        <li key={result.id} onMouseDown={() => onResultClick(result)} className={styles.listItem}>
          <Icon name={getIconName(result)} className={styles.icon} />
          <div className={styles.textContainer}>{result[displayKeyName] as string}</div>
          {result.isInHistory && (
            <Icon name="clear" onMouseDown={handleClearClick(result)} className={styles.icon} />
          )}
        </li>
      ))}
    </ListWrapper>
  );
};

const ListWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>
    <ul className={styles.list}>{children}</ul>
  </div>
);

export default AutocompleteList;
