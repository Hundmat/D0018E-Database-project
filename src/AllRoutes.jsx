import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home'
import Cart from './Pages/Cart/Cart'
import Browse from './Pages/ Browse/Browse'

function AllRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/browse' element={<Browse/>}/>
        </Routes>
        )
}

export default AllRoutes