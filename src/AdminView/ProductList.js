import React,{useState,useEffect} from "react";
import axios from "axios";
import cart from '../cart.png'
import ReactDOM from 'react-dom/client'
import Bill from '../customerviews/Bill'

function PorductList(props){
    const[itemcount,setItemCount]=useState(0);
    const[selitems,setSelItems]=useState([]);

    const[pcatglist,setPcatgList]=useState([]);
    const[plist,setplist]=useState([]);

    var cname="";

    useEffect(()=>{
        axios.get("http://localhost:7676/product/showproduct").then((res)=>{
            setplist(res.data);
        }).catch((err)=>{
            alert(err);
        })
        axios.get("http://localhost:7676/productcatg/showproductcatg").then((res)=>{
            setPcatgList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[])

    const handleBuyButton=(evt)=>{
        setItemCount(itemcount+1);
        plist.map((item)=>{
            if(item.pid==evt)
            {
                selitems.push(item);
            }
        })
    }

    const handleCheckOutButton=()=>{
        const root=ReactDOM.createRoot(document.getElementById("root"));
        var ccid=props.data;
        var obj={
            selitems:selitems,
            cid:ccid
        };
        root.render(<Bill data={obj}></Bill>)
    }

    const handleSearch=(evt)=>{
        if(evt.target.value>0){
            axios.get("http://localhost:7676/product/showproductbycategory/"+evt.target.value).then((res)=>{
                setplist(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }
        else{
            axios.get("http://localhost:7676/product/showproduct").then((res)=>{
                setplist(res.data);

            }).catch((err)=>{
                alert(err);
            })
        }
    }
    return(
        <div className="Prdct-List-Container">
            <h6 className="Prdct-List-Heading">Customer Id {props.data}</h6>


            <div className="PrdctList-header-Container">
            <label>{itemcount}</label>
                <img className="checkoutLogo" src={cart} />
                
                <button type="submit" onClick={handleCheckOutButton} >CheckOut</button>
            </div>
            <center>
                <p className="search-category">Search By Category</p><select onClick={handleSearch} className="my-select">
                    <option value="0" >All</option>
                    {
                        pcatglist.map((pcatgitem)=>(
                            <option value={pcatgitem.pcatgid}>{pcatgitem.pcatgname}</option>
                        ))
                    }
                </select>
                <p style={{backgroundColor:"green",color:"white"}}>Product List</p>
                <table className="styled-table">
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Category Name</th>
                        <th>Photo</th>
                        <th>Add To Cart</th>
                    </tr>
                    {
                        plist.map((item)=>(
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <th>{item.pprice}</th>
                                <th>{item.oprice}</th>
                                <td>
                                    {
                                        pcatglist.map((citem)=>{
                                            if(item.pcatgid==citem.pcatgid){
                                                cname=(citem.pcatgname)
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:7676/product/getproductimage/"+item.ppicname} style={{mixBlendMode:"hard-light",}}/>
                                </td>
                                <td>
                                    <button type="submit" onClick={()=>handleBuyButton(item.pid)}>Buy</button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )
   
}export default PorductList;