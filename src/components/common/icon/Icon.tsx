import { MouseEvent } from "react";
import { ReactComponent as ClearIcon } from "./icons/icon_clear.svg";
import { ReactComponent as HistoryIcon } from "./icons/icon_history.svg";
import { ReactComponent as SearchIcon } from "./icons/icon_search.svg";
import styles from "./Icon.module.css";

export interface IconProps {
  name: "clear" | "history" | "search";
  size?: "small" | "medium" | "large";
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
  onMouseDown?: (e: MouseEvent<HTMLSpanElement>) => void;
  className?: string;
}

const Icon = ({
  name,
  size = "small",
  onClick,
  onMouseDown,
  className = "",
  ...svgProps
}: IconProps) => {
  const iconSize = {
    small: styles["icon-sm"],
    medium: styles["icon-m"],
    large: styles["icon-lg"],
  };

  const Icons: Record<IconProps["name"], JSX.Element> = {
    clear: <ClearIcon {...svgProps} />,
    history: <HistoryIcon {...svgProps} />,
    search: <SearchIcon {...svgProps} />,
  };

  return (
    <span
      className={`${styles.icon} ${iconSize[size]} ${className}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {Icons[name]}
    </span>
  );
};

export default Icon;
