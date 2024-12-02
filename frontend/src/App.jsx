import { Navigate, Route, Routes } from 'react-router-dom';
import Cars from './Pages/Cars';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;
