import { useState } from 'react';
import MyButton from '../../UI/MyButton/MyButton';
import MyInput from '../../UI/MyInput/MyInput';
import styles from './FormInput.module.scss';

const FormInput = ({ setTasks, searchValueTask, setSearchValueTask, setMessage, clearMessage }) => {
  const [valueTask, setValueTask] = useState('');
  const [error, setError] = useState('');

  const clearMessageError = () => {
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!valueTask.trim())
      return setError('Fill in the field "Value to Enter Task..."') || clearMessageError();
    setTasks((prev) => [{ id: crypto.randomUUID(), body: valueTask }, ...prev]);
    setValueTask('');
    setMessage('✅ Task added!');
    clearMessage();
  };

  return (
    <div>
      <form className={styles.form}>
        <MyInput
          value={valueTask}
          onChange={(e) => setValueTask(e.target.value)}
          type="text"
          placeholder="Enter task..."
        />
        <MyInput
          onChange={(e) => setSearchValueTask(e.target.value)}
          value={searchValueTask}
          type="text"
          placeholder="Search by task..."
        />
        <MyButton onClick={handleAddTask}>Create Task</MyButton>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default FormInput;
