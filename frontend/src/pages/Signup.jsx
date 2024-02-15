import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BsPersonSquare } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/navbar.css';
import '../stylesheets/footer.css';
import '../stylesheets/signUp.css';


const Signup = () => {

    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post(`http://localhost:8800/${action}`, {
                name,
                email,
                password,
            });
        } catch (error) {
            console.log("problem med servern atm sorry", error.response.data)
        }
    }
    return (
        <div><Navbar></Navbar>
            <div className="signup-container">
                <div className="signup-header">
                    <div className="signup-text">{action}</div>
                    <div className="signup-underline"></div>
                </div>
                <div className="signup-inputs">
                    {action === "Login" ? <div></div> : <div className="signup-input">
                        <BsPersonSquare className="userimage" size={25} />
                        <input type="text" placeholder="Name" />
                    </div>}

                    <div className="signup-input">
                        <MdAlternateEmail className="emailimage" size={25} />
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="signup-input">
                        <RiLockPasswordLine className="passwordimage" size={25} />
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Too bad kiddo</span></div>}
                <div className="signup-submit-container">
                    {/* For dynamically change the site, if login or sign up part */}
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Signup
