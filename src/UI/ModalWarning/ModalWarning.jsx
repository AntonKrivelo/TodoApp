import styles from './ModalWarning.module.scss';

const ModalWarning = ({ children, actions, ...props }) => {
  return (
    <div className={styles.modalContainer} {...props}>
      <div className={styles.modalContent}>
        <div className={styles.message}>{children}</div>
        <div className={styles.btns}>{actions}</div>
      </div>
    </div>
  );
};

export default ModalWarning;
