import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './authentication/LoginPage';
import UserInformations from './pages/UserInformations';
import UserDetailsDisplay from './pages/UserDetailsDisplay';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/userInformations' element={<UserInformations />} />
        <Route path='/userInformations/:id' element={<UserInformations />} />
        <Route path='/userDetailsDisplay' element={<UserDetailsDisplay />} />
      </Routes>
    </>
  )
}

export default App;
