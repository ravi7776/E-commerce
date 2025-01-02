import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import VendorPic from './Vendorpic.jpg'
import '../index.css'

function VendorMain() {
  return (
    <div>
      
      <div>
            <center>
                <img src={VendorPic} className="CustomerMain-Photo"/>
                <nav className="CustomerMain-navbar">
                    <ul>
                        <li>
                            <Link to="/vendormain/vendorlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/vendormain/vendorreg">Registration</Link>
                        </li>
                    </ul>
                   <Outlet/> 
                </nav>
            </center>
        </div>
    </div>
  )
}

export default VendorMain
