import { Link } from 'react-router-dom';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuListItem}>
            <Link to="/tasks">
              <MyButton>My Tasks</MyButton>
            </Link>
          </li>
          <li className={styles.menuListItem}>
            <Link to="/auth">
              <MyButton>Auth</MyButton>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
