import React,{useState} from "react";
import {Link,Outlet} from "react-router-dom";
import ReactDom from 'react-dom/client';
import AdminHome from './AdminHome'

function AdminLogin()
{
    const[uid,setUId]=useState();
    const[upass,setUPass]=useState();
    

    const handleUIdText=(e)=>{
        setUId(e.target.value);
    }

    const handleUPassText=(e)=>{
        setUPass(e.target.value);
    }

    const handleLoginButton=()=>{
        if(uid=="admin123" && upass=="abc@123")
        {
const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<AdminHome/>)
        }
        else{
            alert("Invalid Id/Password");
        }
    }

    const handleLoginNewButton=()=>{
        // if(uid=="admin" && upass=="abc@123")
        // {
        //     alert("Hello welcome admin");
        // }
        // else{
        //     alert("Invalid Idd/Password")
        // }
    }


    return(
        <div>
            <center>
                <table className="loginBox">
                <h4 className="headingTag">Administrator Login</h4>

                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type="text" onChange={handleUIdText} placeholder="abc@xyz.com"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={handleUPassText} placeholder="password"/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" onClick={handleLoginButton} className="LoginButton">Login</button>
                        </td>
                    </tr>
                </table>
                <nav>
                    <ul>
                        <li>
                            {
                                (uid=="admin" && upass=="abc@123") && <Link to="/Adminmain/adminLogin/adminhome" onClick={handleLoginNewButton}></Link>
                            }
                           
                        </li>
                    </ul>
                </nav>
                <Outlet/>
            </center>
        </div>
    )
}export default AdminLogin