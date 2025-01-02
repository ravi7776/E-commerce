import React from "react";
import { Link,Outlet } from "react-router-dom";
import adminpic from '../admin.jpg'


function AdminMain()
{

    return(
        <div>
            <center>
                <img src={adminpic} className="CustomerMain-Photo"/>
                <nav className="CustomerMain-navbar">
                    <ul>
                        <li>
                            <Link to="/adminmain/adminlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="/adminmain/adminreg">Registration</Link>
                        </li>
                    </ul>
                    <Outlet/>
                </nav>
            </center>
        </div>
    )
}export default AdminMain;