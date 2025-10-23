import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Upload from './Components/Upload';
import FileList from './Components/Filelist';
import PrivateRoute from './Middleware/PrivateRoute';

function App() {
  return (
    <div className="App">
      {/* Public Routes */}
      <Routes>
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login />} />
      </Routes>

      {/* Protected Routes */}
      <Routes>
        <Route 
          path='/Upload' 
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          } 
        />
        <Route 
          path='/Filelist' 
          element={
            <PrivateRoute>
              <FileList />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
