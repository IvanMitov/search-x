import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./SearchBar.module.css";
import AutocompleteList, { ResultItem } from "../autocomplete_list/AutocompleteList";
import { getResults } from "../../utils/utils";
import SearchInput from "../search_input/SearchInput";

interface SearchBarProps<T> {
  items: T[];
  displayKeyName: keyof T;
  maxResults?: number;
  autofocus?: boolean;
  placeholder?: string;
  defaultSearchValue?: string;
  onSearch?: (keyword: string, results: T[]) => void;
}

const SearchBar = <T, >({
  items,
  displayKeyName,
  maxResults,
  autofocus,
  placeholder,
  defaultSearchValue = "",
  onSearch,
}: SearchBarProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);
  const [results, setResults] = useState<ResultItem<T>[]>([]);
  const [historyResults, setHistoryResults] = useState<number[]>([]);
  const [hasFocus, setHasFocus] = useState<boolean>(!!autofocus);

  const showResults = hasFocus && searchValue.length > 0;

  useEffect(() => {
    if (!searchValue) return;
    const newResults = getResults(items, displayKeyName, searchValue, maxResults);
    const resultsWithHistory = newResults.map((res: any) => ({
      ...res,
      isInHistory: historyResults.includes(res.id),
    }));
    setResults(resultsWithHistory);
  }, [searchValue, historyResults]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.trim());
  };

  const handleOnFocus = () => {
    setHasFocus(true);
  };

  const handleOnBlur = () => {
    setHasFocus(false);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !!searchValue) {
      // We could trigger the first autocomplete result
      // handleResultClick(results?.[0]);
      event.currentTarget.blur();
      onSearch?.(searchValue, results);
    }
  };

  const handleResultClick = (item: ResultItem<T>) => {
    if (!historyResults.includes(item.id)) {
      setHistoryResults(prevData => [...prevData, item.id]);
    }
    setSearchValue(item[displayKeyName]);
    onSearch?.(item[displayKeyName], results);
  };

  const handleRemoveFromHistory = (item: ResultItem<T>) => {
    setHistoryResults(prevData => prevData.filter(id => id !== item.id));
  };

  return (
    <div className={styles.container}>
      <SearchInput
        name="search"
        value={searchValue}
        autoFocus={autofocus}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        onKeyDown={handleKeyDown}
      />
      {showResults && (
        <AutocompleteList
          results={results}
          displayKeyName={displayKeyName}
          onResultClick={handleResultClick}
          onHistoryRemove={handleRemoveFromHistory}
        />
      )}
    </div>
  );
};

export default SearchBar;
