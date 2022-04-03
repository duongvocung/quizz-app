
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Admin/Dashboard';
import EditQuesAdmin from './components/Admin/EditQuesAdmin';
import Login from './components/Login';
import Register from './components/Register';
import Doquiz from './components/User/Doquiz';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>        
        <Route path='/doquiz' element={<Doquiz/>}/>        
        <Route path='/admin' element={<Dashboard/>}/>        
        <Route path='/edit/:id' element={<EditQuesAdmin/>}/>        
    </Routes>
  
  );
}

export default App;
