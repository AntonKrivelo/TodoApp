import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../UI/AuthContext/AuthContext';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './Menu.module.scss';

const Menu = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
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
        {token && (
          <li className={styles.menuListItem}>
            <MyButton onClick={handleLogout}>Logout</MyButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
