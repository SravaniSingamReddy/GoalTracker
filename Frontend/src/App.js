import logo from './logo.svg';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Admin from './components/admin';
import Employee from './components/employee';
import SuperAdmin from './components/superadmin';
import {  Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>        
          <Route path="/employee" element={<Employee />}/>                
          <Route path="/users/employee/:gdo" element={<Admin />}/>                
          <Route path="/superadmin" element={<SuperAdmin />}/>                
        </Routes>
      </div>
  );
}

export default App;
