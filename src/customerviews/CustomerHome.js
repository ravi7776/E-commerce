import React,{useState,useEffect} from "react";
import PorductList from "../AdminView/ProductList";
import BillById from "./BillById";
import CustomerLogin from "./CustomerLogin";
import ReactDOM from "react-dom/client";
import CustomerReg from "./CustomerReg";
import MainLogo from '../AdminView/ecommerce-logo.jpg'

function CustomerHome(props){
    const[custname,setCustName]=useState();

    useEffect(()=>{
        var obj=JSON.parse(sessionStorage.getItem('sessionauth'));
        if(obj!=undefined && obj!=null)
        {
            alert(obj.username);
        }
        else{
            alert("Session expired");
        }
    })
    const handleShoppinButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById('root'));
        var cid=props.data.cid;
        root.render(<PorductList data={cid}></PorductList>);
    }

    const handleShowBills=()=>{
        const root=ReactDOM.createRoot(document.getElementById('root'));
        var cid=props.data.cid;
        root.render(<BillById data={cid}></BillById>);


    }

    const handleLogOut=()=>{
        sessionStorage.removeItem('sessionauth');
        alert("Customer session Closed");
        const root=ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerLogin/>)
    }
return(
    <div className>
        <div className="CustomerHomeNavbar-Container">
         <nav>

            <ul className="navbar">
                <li>
                    <img src={MainLogo} className="Company-Logo"/>
                </li>
                <li>
                <button type="submit" onClick={handleShoppinButton}>Shopping</button>
                </li>
                <li>
               <button type="submit" onClick={handleShowBills}>Show Bills</button>
                </li>
              
                <li>
                <button type="submit" onClick={handleLogOut}>Logout</button> 
                </li>
            </ul>
         </nav>
        </div>

           <p className="customerId-display">CUSTOMER ID: {props.data.cid}</p>
        <h5 className="Prdct-List-Heading">Welcome {props.data.cfname}</h5>
        <img className="profile-DP"src={"http://localhost:7676/customer/getimage/"+props.data.cpicname}/>
       
    </div>
)
}export default CustomerHome