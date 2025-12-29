import styles from './Loading.module.scss';
const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <span className={styles.text}>Loading...</span>
    </div>
  );
};

export default Loading;
