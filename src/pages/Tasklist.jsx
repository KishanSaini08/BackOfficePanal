// import React from 'react';
// import firebase from "../firebase.js"
// import { useEffect } from 'react';


// const TaskList = () => {
//   // Sample data for task lists
//   const taskLists = [
//     {
//       title: "Task List 1",
//       createdBy: "user1@example.com",
//       numOfTasks: 5,
//       creationTime: "2024-04-15T10:30:00Z",
//       lastUpdated: "2024-04-15T11:45:00Z"
//     },
//     {
//       title: "Task List 2",
//       createdBy: "user2@example.com",
//       numOfTasks: 3,
//       creationTime: "2024-04-14T09:00:00Z",
//       lastUpdated: "2024-04-14T11:20:00Z"
//     },
//     // Add more task lists as needed
//   ];




  
//   // Function to insert task lists into Firebase
//   const insertTaskListsIntoFirebase = async () => {
    
//     const taskListsRef = firebase.database().ref('taskLists'); 

 
//     for (const taskList of taskLists) {
//       await taskListsRef.push(taskList); 
//     }
//   };

//   // useEffect hook to insert data into Firebase on component mount
//   useEffect(() => {
//     insertTaskListsIntoFirebase();
//   }, []);

//   return (
//     <div className="container">
//       <h1>Task Lists</h1>
//       <div className="task-list-grid">
//         <table>
//           <thead>
//             <tr>
//               <th>Task List Title</th>
//               <th>Create By (email id)</th>
//               <th>No of tasks</th>
//               <th>Creation Time</th>
//               <th>Last updated</th>
//             </tr>
//           </thead>
//           <tbody>
            // {taskLists.map((taskList, index) => (
            //   <tr key={index}>
            //     <td>{taskList.title}</td>
            //     <td>{taskList.createdBy}</td>
            //     <td>{taskList.numOfTasks}</td>
            //     <td>{taskList.creationTime}</td>
            //     <td>{taskList.lastUpdated}</td>
            //   </tr>
            // ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TaskList;







// import { onValue, ref } from 'firebase/database';
// import React, { useState, useEffect } from 'react';
// import firebase from "../firebase.js"

// const TaskList = () => {
//   const [taskLists, settaskLists] = useState([]);

//   useEffect(() => {
//     const dbRef = ref(firebase.database(), "userDataRecord");
//     onValue(dbRef, (snapshot) => {
//       const red = [];
//       snapshot.forEach((childSnapshot) => {
//         const keyName = childSnapshot.key;
//         const data = childSnapshot.val();

//         const sanitizedData = {
//           task: data.taskListTitle,
//           created: data.createdby,
//           SrNo: data.NoOfTasks,
//           CreationTime:data.creationTime,
//           LastUpdated:data.lastUpdated
//           // signupTime: data.signupTime
//           // signupTime: Date.now()
        
         
        
//         };
       
//         red.push({ key: keyName, data: sanitizedData });
//       });
//       // console.log(red)
//       // console.log(taskLists)
//       settaskLists(red);
//     });
//   }, []);

//   return (
//     <div className="container">
//       <h1>TaskList </h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Sr.No</th>
//             <th>Task List Title</th>
//             <th>Create By (email id)</th>
//                <th>No of tasks</th>
//                <th>Creation Time</th>
//                <th>Last updated</th>
//           </tr>
//         </thead>
//         <tbody>
//         {taskLists.map((taskList, index) => (
//               <tr key={index}>
//                 <td>{taskList.title}</td>
//                 <td>{taskList.createdBy}</td>
//                 <td>{taskList.numOfTasks}</td>
//                 <td>{taskList.creationTime}</td>
//                 <td>{taskList.lastUpdated}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   )
// };

// export default TaskList;



import { onValue, ref } from 'firebase/database';
import firebase from '../firebase.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [userData, setUserData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(firebase.database()), (snapshot) => {
          const data = [];
          snapshot.forEach((child) => {
            let shot = child.val();
            data.push({
              id: child.key,
              data: shot,
            });
          });
          setTaskList(data);
        });
      } else {
        Navigate('/login');
      }
    });

    axios
      .get('http://localhost:8000/api/users')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='userData'>
      <table>
        <tbody> {/* Add tbody here */}
          <tr>
            <th>ID</th>
            <th>Task List Title</th>
            <th>Created By</th>
            <th>No Of Tasks</th>
            <th>createdAt</th>
          </tr>
          {taskList.map((item, index) => {
            let data = [];
            for (let i in item.data) {
              data.push(item.data[i]);
            }
            let filterData = {
              length: data.length,
              id: item.id,
              status: data[0].status,
            };
            userData.map((user) => {
              if (user.uid === item.id) {
                if (filterData.hasOwnProperty('email')) return;
                else filterData.email = user.email;
                if (filterData.hasOwnProperty('createdAt')) return;
                else filterData.createdAt = user.metadata.creationTime;
              }
            });
            return (
              <tr key={index}>
                <td>{filterData.id}</td>
                <td>{filterData.status}</td>
                <td>{filterData.email}</td>
                <td>{filterData.length}</td>
                <td>{filterData.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;






