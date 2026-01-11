import { useState, useEffect } from 'react';
import styles from './TodoLists.module.scss';
import Loading from '../../UI/Loading/Loading';
import FormInput from '../FormInput/FormInput';
import MyButton from '../../UI/MyButton/MyButton';
import ModalWarning from '../../UI/ModalWarning/ModalWarning';

const TodoLists = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValueTask, setSearchValueTask] = useState('');
  const [message, setMessage] = useState('');
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

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
    setShowModalConfirm(false);
  };

  const handleConfirmModalDelete = (id) => {
    setTaskToDelete(id);
    setShowModalConfirm(true);
  };

  const handleConfirmModalCancel = () => {
    setShowModalConfirm(false);
  };

  const handleSortTasksData = () => {};

  const sortedTasks = [...filteredLists].sort((a, b) =>
    sortOrder === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt,
  );
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
              <span>
                <b>Created:</b> {new Date(item.createdAt).toLocaleString()}
              </span>
              <MyButton onClick={() => handleConfirmModalDelete(item.id)} variant="danger">
                Delete
              </MyButton>
            </li>
          ))}
        </ul>
      )}
      {showModalConfirm && (
        <ModalWarning
          actions={
            <>
              <MyButton onClick={() => handleDeleteTask(taskToDelete)} variant="danger">
                Yes
              </MyButton>
              <MyButton onClick={handleConfirmModalCancel} variant="success">
                No
              </MyButton>
            </>
          }
        >
          <p>Are you sure you want to delete the task?</p>
        </ModalWarning>
      )}
    </div>
  );
};

export default TodoLists;
