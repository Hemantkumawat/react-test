import '../../App.css';
import React from 'react';
import ResponsiveAppBar from '../../Components/AppBar';
import UsersDataTable from '../../Components/UsersList';
import { projectId, auth } from "../../Services/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    const [loginUser, setLoginUser] = React.useState(null)

    React.useEffect(() => {
        onAuthStateChanged(auth, userAuthHandler);
    }, [])

    const userAuthHandler = (user) => {
        if (user) {
            // Login
            setLoginUser(user)
        } else {
            // Logout
            setLoginUser(null)
            navigate("/");
        }
    }

    return (
        <div className="App">
            <ResponsiveAppBar></ResponsiveAppBar>
            <UsersDataTable></UsersDataTable>
        </div>
    );
}
export default Home;
