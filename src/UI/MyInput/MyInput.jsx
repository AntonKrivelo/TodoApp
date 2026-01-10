import styles from './MyInput.module.scss';

const MyInput = ({ error, helperText, ...props }) => {
  return (
    <div>
      <input className={styles.MyInput} {...props} />
      {error && <span className={styles.errorMessage}>{helperText}</span>}
    </div>
  );
};

export default MyInput;
