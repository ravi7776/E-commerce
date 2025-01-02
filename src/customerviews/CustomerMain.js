import React from "react";
import { Link,Outlet } from "react-router-dom";
import CustomerPic from './customerpic.png'
import '../index.css'

function CustomerMain()
{
    return(
        
        <div>
            <center>
                <img src={CustomerPic} className="CustomerMain-Photo"/>
                <nav className="CustomerMain-navbar">
                    <ul>
                        <li>
                            <Link to="/customermain/customerlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/customermain/customerreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    )
}export default CustomerMain