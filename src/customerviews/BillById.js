import React,{useState,useEffect} from 'react'
import axios from 'axios'

function BillById(props) {
  const[billidlist,setBillIdList]=useState([]);
  const[billdetailslist,setBillDetailsList]=useState([]);
  const[plist,setPlist]=useState([]);
  var pname="";
  var oprice="";
  var total=0;
  var picname=""

  useEffect(()=>{
    //get bill id from db
    axios.get("http://localhost:7676/bill/showbillids/"+props.data).then((res)=>{
      setBillIdList(res.data);

    }).catch((err)=>{
      alert(err);
    })

    //get product detail from db
    axios.get("http://localhost:7676/product/showproduct").then((res)=>{
      setPlist(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[]);

  const handleBillSelect=(e)=>{
    axios.get("http://localhost:7676/bill/showbillbyid/"+e.target.value).then((res)=>{
      // alert(res.data)
      setBillDetailsList(res.data);

    }).catch(err=>{
      alert(err);
    })
  }
  return (
    <div>
      <center>
        <p>Customer Id={props.data}</p>
        <table>
          <tr>
            <td>Bill Id</td>
            <td>
              <select onClick={handleBillSelect}>
                {
                  billidlist.map((item)=>(
                     <option value={item}>{item}</option>
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
            <th>Product Id</th>
          </tr>
          {
            billdetailslist.map((bitem)=>(
              <tr>
                <td>{bitem.billid}</td>
                <td>{bitem.cid}</td>
                <td>{bitem.billdate}</td>
                {
                  plist.map((pitem)=>{
                    if(bitem.pid==pitem.pid)
                    {
                      pname=pitem.pname;
                      oprice=pitem.oprice;
                      total=total+parseInt(pitem.oprice);
                      picname=pitem.ppicname
                    }
                  })
                }
                <td>{pname}</td>
                <td>{oprice}</td>
                <td>
                  <img src={"http://localhost:7676/product/getproductimage/"+picname}/>
                </td>
              </tr>
            ))
          }
        </table>
        <p>Total={total}</p>
      </center>
    </div>
  )
}export default BillById
