import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BsPersonSquare } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


import '../stylesheets/signUp.css';


const Signup = () => {

    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8800/signup`, {
                name,
                email,
                password,
            });
            setAction("Login")
        } catch (error) {
            console.log("problem med servern atm sorry", error.response.data)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8800/login`, {
                email,
                password
            });
            navigate("/");
        } catch (error) {
            console.log("Fel lösenord bre", error.response.data)
        }
    }
    return (
        <div>
            <div className="signup-container">
                <div className="signup-header">
                    <div className="signup-text">{action}</div>
                    <div className="signup-underline"></div>
                </div>
                <div className="signup-inputs">
                    {action === "Login" ? <div></div> : <div className="signup-input">
                        <BsPersonSquare className="userimage" size={25} />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>}

                    <div className="signup-input">
                        <MdAlternateEmail className="emailimage" size={25} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-input">
                        <RiLockPasswordLine className="passwordimage" size={25} />
                        <input type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Too bad kiddo</span></div>}
                <div className="signup-submit-container">
                    {/* For dynamically change the site, if login or sign up part */}
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up"); handleSignup() }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleLogin() }}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Signup
