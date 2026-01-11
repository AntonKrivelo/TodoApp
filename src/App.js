import TodoLists from './components/TodoLists/TodoLists';
import AuthPage from './pages/AuthPage/AuthPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Todo App</h2>
        <hr className="hr" />
        <Menu />
        <Routes>
          <Route path="/tasks" element={<TodoLists />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
