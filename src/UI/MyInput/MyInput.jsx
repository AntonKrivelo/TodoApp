import styles from './MyInput.module.scss';

const MyInput = ({ children, ...props }) => {
  return (
    <div>
      <input className={styles.MyInput} {...props}>
        {children}
      </input>
    </div>
  );
};

export default MyInput;
