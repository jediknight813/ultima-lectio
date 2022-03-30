import React, { useState } from "react";
import '../styles/SignInStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUserForDb, Loginuser } from '../actions/users.js'
import {useNavigate} from 'react-router-dom';


const SignIn = () => {
    const [userSignIn, setUserSignIn] = useState({ email: '', password: ''});
    const [CreateUser, setCreateUserData] = useState({ email: '', password: '', username: '', posts: [], friend_requests: [], friends: [], profile_image: ""});
    const dispatch = useDispatch();  
    const navigate = useNavigate();


    const [making_new_account, make_new_account] = useState(false)

    const SignIn = async (e) => {
        e.preventDefault();
        dispatch(Loginuser(userSignIn));
      };
    
    const CreateNewUser = async (e) => {
        e.preventDefault();
        dispatch(createNewUserForDb(CreateUser));
    };

    const UseDemoAccount = async () => {
        //e.preventDefault();
        let x = dispatch(Loginuser({password: "demo", email: "account"}));
        if (x !== undefined) {
            navigate("/mainPage")
        }
    };
    

    if ( making_new_account === false) {
        return (
            <div className="signInContainerParent">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="signInContainer">
                    <h1> ultima lectio </h1>
                    <h2> ultima lectio helps you connect and share with the people in your life.</h2>
    
                    <form className="login_container" autoComplete="off" noValidate onSubmit={SignIn}>
                        <input placeholder="  Email address" name="email" variant="outlined" label="email" value={userSignIn.email} onChange={(e) => setUserSignIn({ ...userSignIn, email: e.target.value })} />
                        <input placeholder="  Password" name="password" variant="outlined" label="password" value={userSignIn.password} onChange={(e) => setUserSignIn({ ...userSignIn, password: e.target.value })} />
                        <button type="submit"> Log in </button>
                    </form>
    
                    <div className="altSignInParentContainer">
                        <button style={{"backgroundColor": "rgb(63, 225, 63)"}}> Google sign in </button>
                        <button onClick={() => make_new_account(true)} style={{"backgroundColor": "rgb(237, 108, 237)" }}> Create new account </button>
                        <button onClick={() => UseDemoAccount()} style={{"backgroundColor": "rgb(228, 87, 87)"}}> Use demo account </button>
                    </div>
    
                    <div className="line"> </div>
    
                    <h2> This is a recreation of Facebook, created as an assignment for The Odin Project. </h2>
                    <a href="https://github.com/jediknight813">
                        <i className="fa fa-github" style={{"fontSize": "36px", color: "black"}}></i>
                    </a>
    
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="signInContainerParent">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="signInContainer">
                    <h1> ultima lectio </h1>
                    <h2> create account </h2>
    
                    <form className="login_container" autoComplete="off" noValidate onSubmit={CreateNewUser}>
                        <input placeholder="  username" name="username" variant="outlined" label="username" value={CreateUser.username} onChange={(e) => setCreateUserData({ ...CreateUser, username: e.target.value })} />
                        <input placeholder="  Email address" name="email" variant="outlined" label="email" value={CreateUser.email} onChange={(e) => setCreateUserData({ ...CreateUser, email: e.target.value })} />
                        <input placeholder="  Password" name="password" variant="outlined" label="password" value={CreateUser.password} onChange={(e) => setCreateUserData({ ...CreateUser, password: e.target.value })} />
                        <button type="submit"> Create Account </button>
                        <button onClick={() => make_new_account(false)} style={{"backgroundColor": 'red'}} type="submit"> Go Back </button>
                    </form>
    
    
                    <div className="line"> </div>
    
                    <h2> This is a recreation of Facebook, created as an assignment for The Odin Project. </h2>
                    <a href="https://github.com/jediknight813">
                        <i className="fa fa-github" style={{"fontSize": "36px", color: "black"}}></i>
                    </a>
    
                </div>
            </div>
        )
    }
}


export default SignIn

