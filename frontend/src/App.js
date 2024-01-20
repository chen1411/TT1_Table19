import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import UserContext from './context/UserContext';
import DestinationCreate from './destination/create';
import DestinationEdit from './destination/edit';
import { NavBar, Login, Signup, Home } from './components'

function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        // user: undefined,
    });

<<<<<<< Updated upstream
    // useEffect(() => {
    //     const checkLoggedIn = async () => {
    //         let token = localStorage.getItem("auth-token");
    //         if (token === null) {
    //             localStorage.setItem("auth-token", "");
    //             token = "";
    //         }
    //         const tokenResponse = await axios.post(
    //             "http://localhost:8080/validate",
    //             null,
    //             { headers: { "x-auth-token": token } }
    //         );
    //         if (tokenResponse.data) {
    //             const userRes = await axios.get("http://localhost:8080/getUser", {
    //                 headers: { "x-auth-token": token },
    //             });
    //             setUserData({
    //                 token,
    //                 user: userRes.data,
    //             });
    //         }
    //     };
    //     checkLoggedIn();
    // }, []);
=======
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            // const tokenResponse = await axios.post(
            //     "http://localhost:5000/validate",
            //     null,
            //     { headers: { "x-auth-token": token } }
            // );
            // if (tokenResponse.data) {
            //     const userRes = await axios.get("http://localhost:5000/getUser", {
            //         headers: { "x-auth-token": token },
            //     });
            //     setUserData({
            //         token,
            //         user: userRes.data,
            //     });
            // }
            else {
                setUserData({
                    token, 
                    // user: userRes.data,
                })
            }
        };
        checkLoggedIn();
    }, []);
>>>>>>> Stashed changes

    return (
        <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="destination/create" element={<DestinationCreate />} />
                    <Route exact path="destination/:destinationId" element={<DestinationEdit />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    )
}

export default App;
