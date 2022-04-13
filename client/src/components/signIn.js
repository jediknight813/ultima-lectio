import React, { useState, useEffect } from "react";
import '../styles/SignInStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import { signup, signin, LoginGoogleUser } from '../actions/auth.js'
import {useNavigate} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'


const SignIn = () => {
    const [userSignIn, setUserSignIn] = useState({ email: '', password: ''});
    const [CreateUser, setCreateUserData] = useState({ email: '', password: '', username: '', posts: [], friend_requests: [], friends: [], profile_image: " "});
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))


    useEffect(() => {
        if (user !== null) {
            navigate("/mainPage")
        }
    })


    const [making_new_account, make_new_account] = useState(false)

    const SignIn = async (e) => {
        e.preventDefault();
        dispatch(signin(userSignIn, navigate));
      };
    
    const CreateNewUser = async (e) => {
        e.preventDefault();
        dispatch(signup(CreateUser, navigate));
    };

    const UseDemoAccount = async () => {
        //e.preventDefault();
        let x = dispatch(signin({password: "DemoAccount", email: "DemoAccount@gmail.com"}, navigate));
        if (x !== undefined) {
            navigate("/mainPage")
        }
    };

    const googleSuccess = async (res) => {
        
        //const result = res?.profileObj;
        //const token = res?.tokenId;
        //navigate("/mainPage")

        try { 
            if (res?.profileObj?.googleId) {
                dispatch(LoginGoogleUser(res?.profileObj, navigate))
        }} catch (error) {
             console.log(error)
        }
        

        //try {
        //    dispatch({type: 'AUTH', data: { result, token }});
        //} catch (error) {
        //    console.log(error)
        //}
    }

    const googleFailure = () => {
        console.log("google sign in failed")
    }
    

    if ( making_new_account === false) {
        return (
            <div className="signInContainerParent">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div className="signInContainer">
                    <h1> ultima lectio </h1>
                    <h2> ultima lectio helps you connect and share with the people in your life.</h2>
    
                    <form className="login_container" onSubmit={SignIn}>
                        <input required minLength={4} type="email" title="Please Provide A Valid Email Address !" placeholder="  Email address" value={userSignIn.email} onChange={(e) => setUserSignIn({ ...userSignIn, email: e.target.value })} />
                        <input required minLength={2} type="password" placeholder="  Password" name="password" variant="outlined" label="password" value={userSignIn.password} onChange={(e) => setUserSignIn({ ...userSignIn, password: e.target.value })} />
                        <button type="submit"> Log in </button>
                    </form>
    
                    <div className="altSignInParentContainer">

                        <GoogleLogin 
                        clientId="837338787861-bslbcsirnrb9t8io4go9c8vu3o5g5g85.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{"backgroundColor": "rgb(63, 225, 63)"}}> Google sign in </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />

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
    
                    <form className="login_container" onSubmit={CreateNewUser}>
                        <input required minLength={3} type="text" placeholder="  username" value={CreateUser.username} onChange={(e) => setCreateUserData({ ...CreateUser, username: e.target.value })} />
                        <input required minLength={4} type="email" title="Please Provide A Valid Email Address !" id="email_create_account" placeholder="  Email address" name="email" value={CreateUser.email} onChange={(e) => setCreateUserData({ ...CreateUser, email: e.target.value })} />
                        <input required minLength={2} type="password" placeholder="  Password"  value={CreateUser.password} onChange={(e) => setCreateUserData({ ...CreateUser, password: e.target.value })} />
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

