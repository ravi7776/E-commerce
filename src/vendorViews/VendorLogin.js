import React,{useState,useEffect} from 'react';
import axios from 'axios';
import ReactDom from 'react-dom/client'
import VendorHome from './VendorHome'
import Cookies from 'js-cookie'
import '../index.css'
import VendorReg from './vendorReg'

function VendorLogin(){
    const[uid,setUid]=useState();
    const[upass,setUpass]=useState();
    const[ischecked,setIsChecked]=useState(false);

    const handleUIdtext=(e)=>{
        setUid(e.target.value);
    }
    const handleUpassText=(e)=>{
        setUpass(e.target.value);
    }
    useEffect(()=>{
        var mycookies=Cookies.get('vauth');
        if(mycookies!=undefined){
            var obj=JSON.parse(mycookies);
            setUid(obj.username);
            setUpass(obj.password);
        }
    },[])

    const SellProduct=()=>{
        const root=ReactDom.createRoot(document.getElementById("root"));
        root.render(<VendorReg/>)
    }
 

 

    const handleLoginButton=()=>{
        axios.get("http://localhost:7676/vendor/login/"+uid+"/"+upass).then((res)=>{
           
            if(res.data.VUserId!=undefined){
                if(ischecked==true){
                    const userData={
                        username:uid,
                        password:upass
                    };
                    const expirationTime=new Date(new Date().getTime()+6000000);
                    //store data in cookies
                    Cookies.set('vauth',JSON.stringify(userData),{expires:expirationTime})
                }
                // alert(res.data.VenderName)

                //session handling code
                const userSessionData={
                    vuserfullname:res.data.VenderName
                };
                const sessionExpirationTime= new Date(new Date().getTime()+60000);
                //store data in session
                sessionStorage.setItem('vsessionauth',JSON.stringify(userSessionData),sessionExpirationTime);

                const root=ReactDom.createRoot(document.getElementById('root'));
                var obj={
                    vfname:res.data.VenderName,
                    vpicname:res.data.VPicName,
                    vid:res.data.Vid
                };
                root.render(<VendorHome data={obj}></VendorHome>)
            }else{
                alert("Invalid username or password");
            }
        })
    }

    const handleIsRemember=()=>{
        setIsChecked(true)
    }
    return(
        <div>
            <center>
                
                <table className="loginBox">
                <h1 className="headingTag">Vendor Login Form</h1>
                    <tr>
                        <td>User Id</td>
                        <td>
                            <input type='text' onChange={handleUIdtext} value={uid} placeholder="abc@xyz.com"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type='password' onChange={handleUpassText} value={upass} placeholder="password"/>
                        </td>
                    </tr>
                  
                    <tr>
                        <td>Remember Me</td>
                        <td>
                            <input type='checkbox' onClick={handleIsRemember} className="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type='submit' onClick={handleLoginButton} className="LoginButton">Login</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Want To Sell Your Product? Register Now!</td>
                        <td>
                            <button type='submit' onClick={SellProduct} class="btn btn-primary">Register</button>
                        </td>
                    </tr>
                   
                </table>
            </center>
        </div>
    )

}export default VendorLogin

