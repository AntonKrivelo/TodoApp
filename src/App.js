import TodoLists from './components/TodoLists/TodoLists';
import AuthPage from './pages/AuthPage/AuthPage';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import { AuthProvider } from './UI/AuthContext/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="container">
          <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>Todo App</h2>
          <hr className="hr" />
          <Menu />
          <Routes>
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TodoLists />
                </PrivateRoute>
              }
            />
            <Route path="/*" element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
