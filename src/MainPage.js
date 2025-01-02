import React from 'react'
import {
   BrowserRouter as Router,
   Link,
   Routes,
   Route,
} from 'react-router-dom';
import CustomerMain from './customerviews/CustomerMain';
import VendorMain from './vendorViews/VendorMain';
import AdminMain from './AdminView/AdminMain';
import AdminLogin from './AdminView/AdminLogin';
import AdminReg from './AdminView/AdminReg';
import CustomerLogin from './customerviews/CustomerLogin';
import CustomerReg from './customerviews/CustomerReg';
import VendorLogin from './vendorViews/VendorLogin';
import VendorReg from './vendorViews/vendorReg';
import AdminHome from './AdminView/AdminHome'
import './index.css'
import MainPic from './AdminView/NewMainLogo.jpg'
import Diwali from './diwali-festival-offers.jpg'
function MainPage() {
   return (
      <div>
         <Router>
            <nav className="navbar">
               <img src={MainPic} className="Company-Logo-MainPage" />
               <Link to="adminmain">Admin</Link><span></span>
               <Link to="customermain">Customer</Link><span></span>
               <Link to="vendormain">Vendor</Link>
            </nav>
            <Routes>
               <Route path="/adminmain" element={<AdminMain />}>
                  <Route path='adminlogin' element={<AdminLogin />}>
                     <Route path='adminhome' element={<AdminHome />}></Route>
                  </Route>
                  <Route path='adminreg' element={<AdminReg />} />
               </Route>
               <Route path="/customermain" element={<CustomerMain />}>
                  <Route path='customerlogin' element={<CustomerLogin />} />
                  <Route path='customerreg' element={<CustomerReg />} />
               </Route>
               <Route path='/vendormain' element={<VendorMain />}>
                  <Route path='vendorlogin' element={<VendorLogin />} />
                  <Route path='vendorreg' element={<VendorReg />} />
               </Route>
            </Routes>
         </Router>

         <img className="Coverphoto" src={Diwali} />
      </div>
   )
}
export default MainPage
