
import React,{useState,useEffect} from 'react'
import axios from 'axios'

function ShowBills() {
       const[custlist,setCustList]=useState([]);
       const[billdetailslist,setBillDetailsList]=useState([]);
       const[plist,setPList]=useState([]);

       var pname="";
       var oprice=0;
       var total=0;
       var picname="";
       const[prevbillid,setprevbillid]=useState(0);
       var prbid=0;
       var k=true;
       var count=0;

       useEffect(()=>{

        //get customer from db
        axios.get("http://localhost:7676/customer/getcustomerlist").then((res)=>{
            setCustList(res.data);
        }).catch(err=>{
            alert(err);
        })
         //get product details from db
         axios.get("http://localhost:7676/product/showproduct").then((res)=>{
            setPList(res.data);
       }).catch(err=>{
        alert(err);
       })
       },[]);

       const handlecustomerSelect=(e)=>{
        axios.get("http://localhost:7676/bill/billshow/"+e.target.value).then((res)=>{
            setBillDetailsList(res.data);
            setprevbillid(res.data[0].billid);
            prbid=res.data[0].billid;
            alert("First Bill Id "+res.data[0].billid +"k="+k);
        }).catch((err)=>{
            alert(err);
        })
       }
  return (
    <div>
      <center>
        <p>Bill List Admin View</p>
        <table>
            <tr>
                <td>Customer</td>
                <td>
                    <select onClick={handlecustomerSelect}>
                        {
                            custlist.map((item)=>(
                                <option value={item.Cid}>{item.CustomerName+" "+item.Cid}</option>
                            ))
                        }
                    </select>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <th>Bill Id</th>
                <th>Customer Id</th>
                <th>Bill Date</th>
                <th>Product Name</th>
                <th>Product Image</th>
            </tr>
            {
                billdetailslist.map((bitem)=>(
                    <tr>
                        <td>{bitem.billid}</td>
                        <td>{bitem.Cid}</td>
                        <td>{bitem.billdate}</td>
                        <td>
                            {
                                plist.filter((pitem)=>{
                                    if(bitem.pid==pitem.pid)
                                    {
                                        if(bitem.billid!=prbid)
                                        {
                                            prbid=bitem.billid;
                                            total=0;
                                            k=true;
                                        }
                                        if(bitem.billid==prbid)
                                        {
                                            k=false;
                                        }
                                        pname=pitem.pname;
                                        oprice=pitem.oprice;
                                        total=total+parseInt(pitem.oprice);
                                        picname=pitem.ppicname;
                                    }
                                })
                            }
                            <td>{pname}</td>
                            <td>{oprice}</td>
                            <td>
                                <img src={"http://localhost:7676/product/getproductimage/"+picname}/>
                                <p>{k==true?"":total}</p>
                            </td>
                        </td>
                    </tr>
                ))
            }
        </table>
      </center>
    </div>
  )
}

export default ShowBills
