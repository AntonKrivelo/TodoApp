import TodoLists from './components/TodoLists/TodoLists';
import RegisterForm from './components/RegisterForm/RegisterForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Todo App</h2>
        <TodoLists />
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
