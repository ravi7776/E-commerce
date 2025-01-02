import React,{useState,useEffect} from 'react';
import ReactDom from 'react-dom/client'
import Product from '../AdminView/Product'
import VendorLogin from './VendorLogin';
import MainLogo from '../AdminView/ecommerce-logo.jpg'

function VendorHome(props){
    const[vendname,setVendName]=useState();
    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('vsessionauth'));
        if(obj!=undefined && obj!=null)
        {
            // alert(obj.vuserfullname);
            setVendName(obj.vuserfullname);

        }else{
            alert("Vendor session expired");
        }
    })

    const handleAddProductButton=()=>{
        const root=ReactDom.createRoot(document.getElementById('root'));
        root.render(<Product/>);
    }

    const handleLogOutButton=()=>{
        sessionStorage.removeItem('vsessionauth');
        alert("Vendor Sesion CLosed");
        const root=ReactDom.createRoot(document.getElementById('root'));
        root.render(<VendorLogin/>)
    }
    return(
        <div>
            <div className="CustomerHomeNavbar-Container">
                <nav >
                    <ul className="navbar">
                        <li>
                            <img src={MainLogo} className="Company-Logo"/>
                        </li>
                        <li>
                        <button type='submit' onClick={handleAddProductButton}>Manage Product</button>
                        </li>
                        <li>
                        <button type='submit' onClick={handleLogOutButton}>Logout</button>

                        </li>
                    </ul>
                </nav>
            </div>
            <p className="customerId-display">Current Session running for: {vendname} ||  Vendor Id: {props.data.vid}</p>
            <h5 className="Prdct-List-Heading">Welcome {props.data.vfname}</h5>
            <img src={'http://localhost:7676/vendor/getimage/'+props.data.vpicname} className="profile-DP"/>
          
        </div>
    );
}export default VendorHome