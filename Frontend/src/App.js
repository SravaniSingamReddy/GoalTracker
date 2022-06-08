import logo from './logo.svg';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Admin from './components/admin';
import Employee from './components/employee';
import SuperAdmin from './components/superadmin';
import {  Routes, Route } from 'react-router-dom';
import AddGoal from './components/addgoal';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Register />}/>        
          <Route path="/employee" element={<Employee />}/>                
          <Route path="/admin" element={<Admin />}/>                
          <Route path="/superadmin" element={<SuperAdmin />}/>                
          <Route path="/addgoal" element={<AddGoal />}/>                        
        </Routes>
      </div>
  );
}

export default App;
