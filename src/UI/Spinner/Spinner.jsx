import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;