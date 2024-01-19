import React from 'react'
import '../Home.css'
import './Login.css'
import cart from '../../images/shopping-cart.png'
function Login() {
    return (
        <div>
           <header class="app-header">
            <div class="app-header_container">
            <p class="logo"><a href="index.html">DATABASE PROJECT</a></p>
            <nav class="app-header_links">
                <li><a href="browse.html">Browse</a></li>
                <li><a href="login.html">Log in</a></li>
                <li><a href="cart.html"><img class="cart" src={cart}/></a></li>
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