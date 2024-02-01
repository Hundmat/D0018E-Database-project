import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';

import '../stylesheets/Navbar.css';
import '../stylesheets/Footer.css';

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();
    const validatePasswords = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return false;
        } else {
            setConfirmPasswordError("");
            return true;
        }
    };

    const fetchEmail = async () => {
        try {
            const emailexist = await axios.get(`http://localhost:8800/email=${email}`);
            if (emailexist.data) {
                throw new Error("Email already exists");
            }
        } catch (error) {
            throw error; // Rethrow the error for handling in onButtonClick
        }
    };

    const onButtonClick = async () => {
        try {
            await fetchEmail(email);
            // Validate pwd before navigating
            const passwordsMatch = validatePasswords();
            if (passwordsMatch) {
                // Add connection to DB to store hashed passwords
                navigate("/login");
            }
        } catch (error) {
            console.error(error.message);
            // Handle the error (display an error message, prevent registration, etc.)
        }
    };

    return (
        <div className={"mainContainer"}>
            <Navbar />
            <div className={"titleContainer"}>
                <div>Signup</div>
            </div>

            <br />

            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>

            <br />

            <div className={"inputContainer"}>
                <input
                    value={password}
                    type="password"
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>

            <br />

            <div className={"inputContainer"}>
                <input
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{confirmPasswordError}</label>
            </div>

            <br />

            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Sign up"}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Signup;