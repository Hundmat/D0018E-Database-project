import React from 'react'
import '../Home.css'
import './Cart.css'
import { Link } from 'react-router-dom'
import cart from '../../images/shopping-cart.png'
function Cart() {
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
                <div class="cart-wrapper">
                    <div class="cart-content">
                        <div class="cart-item">item 1</div>
                        <div class="cart-item">item 2</div>
                        <div class="cart-item">item 3</div>
                        <div class="cart-item">item 4</div>
                        <div class="cart-item">item 5</div>
                        <div class="cart-item">item 6</div>
                    </div>
                    <div class="cart-info">
                        Total price:
                    </div>
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

export default Cart