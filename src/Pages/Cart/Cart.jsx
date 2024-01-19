import React from 'react'

function Cart() {
    return (
        <div>
           <header class="app-header">
        <div class="app-header_container">
            <p class="logo"><a href="index.html">DATABASE PROJECT</a></p>
            <nav class="app-header_links">
                <li><a href="browse.html">Browse</a></li>
                <li><a href="login.html">Log in</a></li>
                <li><a href="cart.html"><img class="cart" src="images/shopping-cart.png"/></a></li>
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