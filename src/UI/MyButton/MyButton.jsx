import styles from './MyButton.module.scss';
import clsx from 'clsx';

const MyButton = ({ children, variant = 'primary', ...props }) => {
  return (
    <button {...props} className={clsx(styles.myBtn, styles[variant])}>
      {children}
    </button>
  );
};

export default MyButton;
