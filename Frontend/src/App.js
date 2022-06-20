import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Admin from './components/admin';
import SuperAdmin from './components/superadmin';
import {  Routes, Route } from 'react-router-dom';
import AddGoal from './components/addgoal';
import DisplayGoals from './components/displaygoals';
import Profile from './components/profile';
import Goals from './components/goals';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>          
          <Route path="/register" element={<Register />}/>        
          <Route path="/employee" element={<DisplayGoals />}/>    
          <Route path="/displaygoals" element={<DisplayGoals />}/>                
          <Route path="/goals" element={<Goals />}/>                    
          <Route path="/admin" element={<Admin />}/>                
          <Route path="/superadmin" element={<SuperAdmin />}/>                
          <Route path="*" element={<Home />}/>                    
         </Routes>
      </div>
  );
}

export default App;
