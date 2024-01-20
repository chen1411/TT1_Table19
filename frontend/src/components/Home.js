import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Home() {
    const { userData } = useContext(UserContext);

    return (
        <div>
            {userData.user 
            ? (
                <>
                    <h1>Hello World</h1>
                    {/* <Feed /> */}
                </>
            ) 
            : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}

export default Home;