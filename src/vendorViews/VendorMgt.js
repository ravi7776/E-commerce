import React,{useState,useEffect} from "react";
import axios from "axios";

function VendorMgt(){
    const[vendorList,setVendorList]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:7676/vendor/getvendorcount').then((res)=>{
            setVendorList(res.data);
            // console.log(res.data.Vid);
            // console.log(res.data.Status)
            // console.log(res.data.VenderName);
            
        }).catch((err)=>{
            alert(err);
        })
    },[])

    const handleActiveButton=(vid)=>{
        var newstatus="Active";
        axios.put('http://localhost:7676/vendor/vendormanage/'+vid+'/'+newstatus).then((res)=>{
            alert("Vendor is Active");
        }).catch((err)=>{
            alert(err); 
        })
    }

    const handleInActiveButton=(vid)=>{
        var newstatus="Inactive";
        axios.put('http://localhost:7676/vendor/vendormanage/'+vid+'/'+newstatus).then((res)=>{
            alert("Vendor is In-Active");
        }).catch((err)=>{
            alert(err);
        })
    }

    return(
        <div>
            <center>
            <h4 className="pageHeading">Vendor Active / InActive Control Center</h4>
                <table className="styled-table">
                    
                    <tr>
                        <th>VID</th>
                        <th>Vendor Name</th>
                        <th>Status</th>
                        <th>Active</th>
                        <th>In-Active</th>
                        
                    </tr>
                    {
                        vendorList.map((item)=>(
                            <tr>
                                <td>{item.Vid}</td>
                                <td>{item.VenderName}</td>
                                <td>{item.Status}</td>
                                <td>
                                    <button type="submit" onClick={()=>handleActiveButton(item.Vid)} className="btn btn-success">Active</button>
                                </td>
                                <td>
                                    <button type="submit" onClick={()=>handleInActiveButton(item.Vid)} className="btn btn-danger">InActive</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )
}export default VendorMgt