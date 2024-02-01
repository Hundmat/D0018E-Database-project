import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import '../stylesheets/navbar.css';
import '../stylesheets/footer.css';

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();
    const onButtonClick = () => { 

    }

    const onSignupClick = () => {
        navigate("/signup")
    }


    return <div className={"mainContainer"}>

        <Navbar/>

        <div className={"titleContainer"}>

            <div>Login</div>

        </div>

        <br />

        <div className={"inputContainer"}>

            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>

        </div>

        <br />

        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>

        </div>

        <br />

        <div className={"inputContainer"}>

            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        <div className={"inputContainer"}>
        <input
            className={"inputButton"}
            type="button"
            onClick={onSignupClick}
            value={"Sign up"} /> 
        </div>
        <Footer/>
    </div>

}

export default Login;