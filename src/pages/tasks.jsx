import { onValue, ref } from 'firebase/database'
import firebase from '../firebase.js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/user.css"

function Tasks() {
    const [taskList, setTaskList] = useState([])
    const [userData, setUserData] = useState([])
    const Navigate = useNavigate()
    const API = "https://backofficebackend.onrender.com"
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(firebase.database()), snapshot => {
                    const data = []
                    snapshot.forEach((child) => {
                        let shot = child.val()
                        data.push({
                            id: child.key,
                            data: shot
                        })
                    })
                    setTaskList(data)
                })
            }
            else {
                Navigate('/login')
            }
        })

        axios.get(API+"/api/users").then((res) => {
            setUserData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className='userData'>
            <table>
                <tr>
                    <th>Task Title</th>
                    <th>Task Discription</th>
                    <th>Task List Title</th>
                    <th>Created By</th>
                </tr>

                {
                    taskList.map((item, index) => {
                        let data = []
                        for (let i in item.data) {
                            data.push(item.data[i])
                        }

                        let filterData = {
                            length: data.length,
                            id: item.id,
                        }
                        userData.map((user) => {
                            if (user.uid === item.id) {
                                if (filterData.hasOwnProperty("email")) return
                                else filterData.email = user.email
                                if (filterData.hasOwnProperty("createdAt")) return
                                else filterData.createdAt = user.metadata.creationTime
                                
                            }
                        })
                        return (
                            data.map((todo , index) => {
                                return <tr key={index}>
                                    <td>{todo.title}</td>
                                    <td>{todo.discription}</td>
                                    <td>{todo.status}</td>
                                    <td>{filterData.email}</td>
                                </tr>
                            })

                        )


                    })
                }
            </table>
        </div>
    )
}

export default Tasks