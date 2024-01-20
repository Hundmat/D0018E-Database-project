import React from 'react'
import '../Home.css'
import './Login.css'
import { Link } from 'react-router-dom'
import cart from '../../images/shopping-cart.png'
function Login() {
    return (
        <div>
           <header class="app-header">
            <div class="app-header_container">
            <p class="logo"><a href="index.html">DATABASE PROJECT</a></p>
            <nav class="app-header_links">
                <Link to='/browse'>Browse</Link>
                <Link to='/login'>Login</Link>
                <Link to='/cart'>
                <img class="cart" src={cart}/>
                </Link>
            </nav>
            </div>
            </header>
    
            <div id="home" class="home">
                <div class="home-wrapper">
                 <div class="home-intro">
                <div class="home-intro-content">
                        <div class="login_container">
                            <label for="email"><b>E-mail</b></label>
                            <input type="text" placeholder="E-mail" name="email" required/>

                            <label for="pword"><b>Password</b></label>
                            <input type="password" placeholder="Password" name="pword" required/>

                            <button type="submit">Log in</button>
                            <a href="" class="forgotPword loginLink">Forgot your password?</a>
                            <a href="" class="signUp loginLink">Sign up</a>
                        </div>
                </div>
                 </div>
                 </div>
                 </div>
        </div>
    )
}

export default Login