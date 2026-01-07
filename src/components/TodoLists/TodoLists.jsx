import { useState, useEffect } from 'react';
import styles from './TodoLists.module.scss';
import Loading from '../../UI/Loading/Loading';
import FormInput from '../FormInput/FormInput';
import MyButton from '../../UI/MyButton/MyButton';

const TodoLists = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValueTask, setSearchValueTask] = useState('');
  const [message, setMessage] = useState('');

  console.log(tasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
          const json = await res.json();
          const normalized = json.map((item) => ({
            id: item.id,
            body: item.title,
          }));
          setTasks(normalized);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const clearMessage = () => {
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const filteredLists = tasks.filter((todos) =>
    todos.body.toLowerCase().includes(searchValueTask.toLowerCase()),
  );

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setMessage('❌ Task for delete!');
    clearMessage();
  };

  return (
    <div>
      <FormInput
        tasks={tasks}
        setTasks={setTasks}
        searchValueTask={searchValueTask}
        setSearchValueTask={setSearchValueTask}
        setMessage={setMessage}
        clearMessage={clearMessage}
      />
      {message && <p className={styles.message}>{message}</p>}
      <h2 className={styles.header}>My Tasks: {tasks.length}</h2>

      {loading ? (
        <Loading />
      ) : filteredLists.length === 0 ? (
        <p className={styles.message}>There are no tasks...</p>
      ) : (
        <ul className={styles.listTodo}>
          {filteredLists.map((item, index) => (
            <li className={styles.listItem} key={item.id}>
              <span className={styles.index}>{index + 1}:</span>
              <span className={styles.body}>{item.body}</span>
              <MyButton onClick={() => handleDeleteTask(item.id)} variant="danger">
                Delete
              </MyButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoLists;
