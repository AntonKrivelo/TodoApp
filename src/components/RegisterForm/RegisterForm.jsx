import { useForm } from 'react-hook-form';
import MyInput from '../../UI/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Register user</h2>
        <MyInput
          {...register('username', {
            required: 'Username is required!',
            minLength: {
              value: 2,
              message: 'The name must contain at least 2 characters.',
            },
          })}
          type="text"
          placeholder="Username"
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />
        <MyInput
          {...register('email', {
            required: 'Email is required!',
          })}
          type="email"
          placeholder="Email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <MyInput
          {...register('password', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'The password must contain at least 8 characters.',
            },
          })}
          type="password"
          placeholder="Password"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <MyButton type="submit">Submit</MyButton>
      </form>
    </div>
  );
};

export default RegisterForm;
