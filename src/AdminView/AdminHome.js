import React from 'react'
import StateMgt from '../StateCity/StateMgt'
import CityManagement from '../StateCity/CityManagement'
import ProductCatgMgt from './ProductCatgMgt'
import Product from './Product'
import VendorMgt from '../vendorViews/VendorMgt'
import {Outlet,Link,Route,Routes} from 'react-router-dom'
import AdminPic from '../admin.jpg'

function AdminHome() {
  return (
    <div>
      <center>
        <h4>Admin Home Page</h4>
      <StateMgt></StateMgt>
      <CityManagement></CityManagement>
      <ProductCatgMgt></ProductCatgMgt>
      <VendorMgt></VendorMgt>
      <Product></Product>
        <Outlet/>
      </center>
    </div>
  )
}

export default AdminHome


//vendor management
