import { useState } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      <div className={styles.formPage}>
        {!isRegister ? <RegisterForm /> : <LoginForm />}
        <MyButton onClick={() => setIsRegister(!isRegister)} variant="secondary">
          Already registered? Then click on this button
        </MyButton>
      </div>
    </div>
  );
};

export default AuthPage;
