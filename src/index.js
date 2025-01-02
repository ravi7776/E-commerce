import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VendorReg from './vendorViews/vendorReg';
import VendorLogin from './vendorViews/VendorLogin';
import StateMgt from './StateCity/StateMgt';
import CustomerLogin from './customerviews/CustomerLogin';
import PorductList from './AdminView/ProductList';
import Product from './AdminView/Product';
import CustomerReg from './customerviews/CustomerReg';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import AdminHome from './AdminView/AdminHome';
import ProductCatgMgt from './AdminView/ProductCatgMgt';
import CustomerMain from './customerviews/CustomerMain';
import CustomerHome from './customerviews/CustomerHome';
import VendorMgt from './vendorViews/VendorMgt';
import AdminLogin from './AdminView/AdminLogin';
import CityMgt from './StateCity/CityManagement';
// import VendorReg from './vendorViews/vendorReg';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<MainPage/>
</React.StrictMode>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
