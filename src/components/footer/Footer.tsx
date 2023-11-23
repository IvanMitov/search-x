import styles from "./Footer.module.css";

interface FooterProps {
  copyText: string;
  author?: string;
}

const Footer = ({ copyText, author }: FooterProps) => (
  <footer className={styles.container}>
    <p>{copyText}</p>
    {author && <span>created by {author}</span>}
  </footer>
);

export default Footer;
