import React from 'react'
import '../Home.css'
import './Browsw.css'
import cart from '../../images/shopping-cart.png'
function Browse() {
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
                <div class="browse-content">
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                    <div class="content-item"></div>
                </div>
            </div>
        </div>
    </div>

    <footer class="app-footer">
        <div class="app-footer_container">
            <p><a href="" target="_blank">Link</a></p>
            <p><a href="" target="_blank">Link</a></p>
            <p><a href="" target="_blank">Link</a></p>
        </div>
    </footer>
        </div>
    )
}

export default Browse