import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx";
import Home from './components/home.jsx';
// import Users from "./pages/Users.jsx";
// import TaskList from "./pages/Tasklist.jsx"
// import Tasks from './pages/tasks.jsx';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
         
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/users" Component={Users} />
        <Route path="/task-list" Component={TaskList} />
        <Route path="/tasks" Component={Tasks} /> */}
          
        </Routes>
      </Router>
    </>
  )
}
export default App