import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <header className={styles.container}>
    <h1 className={styles.heading1}>{title}</h1>
  </header>
);

export default Header;
