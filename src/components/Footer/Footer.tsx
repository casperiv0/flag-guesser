import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Powered by the{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://restcountries.eu">
          restcountries
        </a>{" "}
        API • Created by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://casperiv.dev">
          CasperTheGhost
        </a>
      </p>
    </footer>
  );
};
