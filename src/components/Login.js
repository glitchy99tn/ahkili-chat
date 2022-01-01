import React from "react";
import {GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../firebase";

import firebase from "firebase/app";


const Login = () =>{
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Ahkili!</h2>
                <button onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                <div
                    className="login-button google"
                >
                    <GoogleOutlined /> Sign In with Google
                </div>
                </button>
                <br /> <br  />

                <button onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                <div
                    className="login-button facebook"
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>
                </button>   

                
            </div>

        </div>
    );
}

export default Login;