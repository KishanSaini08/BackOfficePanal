import { onValue, ref } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import firebase from "../firebase.js"
import "../styles/user.css"

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dbRef = ref(firebase.database(), "userDataRecord");
    onValue(dbRef, (snapshot) => {
      const records = [];
      snapshot.forEach((childSnapshot) => {
        const keyName = childSnapshot.key;
        const data = childSnapshot.val();

        const sanitizedData = {
          email: data.email,
          name: data.name,
          password: data.password,
          signupTime: Date.now()
        };
       
        records.push({ key: keyName, data: sanitizedData });
      });
      setUsers(records);
    });
  }, []);

  return (
    <div className="container">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Email id</th>
            <th>Password</th>
            <th>name</th>
            <th>Signup Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.key}>
              <td>{index + 1}</td>
              <td>{user.data.email}</td>
              <td>{user.data.password}</td>
              <td>{user.data.name}</td>
              <td>{user.data.signupTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Users;


// import React, { useEffect, useState } from 'react'
// import firebase from '../firebase.js'
// import axios from 'axios'

// function User(user) {
//     const [userData , setUserData] = useState([])
//     const [currentUser , setCurrentUser] = useState("")
    
//     useEffect(()=>{
//         firebase.auth().onAuthStateChanged((user)=>{
//             if(user){
//                 setCurrentUser(firebase.auth().currentUser) 
//             }
//         })
//         axios.get("http://localhost:8000/api/users").then((res)=>{
//             setUserData(res.data)
//         }).catch((err) => {
//             console.log(err)
//         }) 
//     },[])



//   return (
//     <div className='userData'>
//         <table>
//             <tr>
//                 <th>User Id</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>SignUp Time</th>
//             </tr>
//             {
//                 userData.map((user , index)=>{
//                     if(currentUser.uid !== undefined){
//                         if(user.uid === currentUser.uid) return
//                     }
//                     return(
//                         <tr key={index}>
//                             <td>{user.uid}</td>
//                             <td>{user.email}</td>
//                             <td>{user.passwordHash}</td>
//                             <td>{user.metadata.creationTime}</td>
//                         </tr>
//                     )
//                 })
//             }
//         </table>
//     </div>
//   )
// }

// export default User