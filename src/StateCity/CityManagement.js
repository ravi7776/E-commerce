import React,{useState,useEffect} from "react";
import axios from "axios";
import 'C:/Users/Dp218/Desktop/Main Project/Frontend/client-app/src/index.css'

function CityMgt() {
    const [ctid, setCtId] = useState();
    const [ctname, setCtName] = useState();
    const [stid, setStId] = useState();
    const [ctlist, setCtList] = useState([]);
    const [stlist, setStList] = useState([]);
    var stname = "";

    useEffect(() => {
        //get state from DB
        axios.get("http://localhost:7676/state/show").then((res) => {
            setStList(res.data);
        })

        //get city from DB
        axios.get("http://localhost:7676/city/show").then((res) => {
            setCtList(res.data);
        })
    },[]);
    const handleCtName = (evt) => {
        setCtName(evt.target.value);
    }
    const handleStIdSelect = (evt) => {
        setStId(evt.target.value);
    }
    const handleCtId = (evt) => {
        setCtId(evt.target.value);
    }
    const handleSaveBtn = () => {
        var obj = {
            ctid: ctid,
            ctname: ctname,
            stid: stid
        }
        axios.post("http://localhost:7676/city/save", obj).then((res) => {
            alert("DATA SAVED");
        }).catch((err) => {
            alert(err);
        });
    }
    const handleSearchBtn = () => { 
        axios.get('http://localhost:7676/city/searchcity/'+ctid).then((res) => {
            setCtName(res.data.ctname);
        }).catch((err) => {
            alert(err);
        })
    }
    const handleUpdateBtn = () => { 
        var obj = {
            ctid: ctid,
            ctname: ctname
        }
        axios.put('http://localhost:7676/city/editcity/',obj).then((res) => {
            alert("DATA UPDATED");
        }).catch((err) => {
            alert(err);
        })
    }

    const handleDeleteBtn = () => { 
        axios.delete('http://localhost:7676/city/deletecity/'+ctid).then((res) => {
            setCtName("");
            setCtId("");
            alert("DATA DELETED");
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div>
            <h1 className="pageHeading">City Management</h1>
            <table className="styled-table">
             <tr>
                <td>City Id</td>
                <td>
                    <input type="text" onChange={handleCtId}/>
                </td>
             </tr>
             <tr>
                <td>City Name</td>
                <td>
                   <input type="text" onChange={handleCtName}/> 
                </td>
             </tr>
             <tr>
                <td>
             <p>State Id <select onClick={handleStIdSelect}>
                {stlist.map((item) => (
                    <option value={item.stid}>{item.stname}</option>
                ))}
            </select></p>
            </td>
            <td></td>
             </tr>
            
            </table>
            <button type="submit" onClick={handleSaveBtn} className="btn btn-success">Save</button>
            <button type="submit" onClick={handleSearchBtn} className="btn btn-primary">Search</button>
            <button type="submit" onClick={handleUpdateBtn} className="btn btn-info">Update</button>
            <button type="submit" onClick={handleDeleteBtn} className="btn btn-danger">Delete</button>
        
            <h2 className="pageHeading">
                City List
            </h2>
            <table className="styled-table">
    
                    <tr>
                        <th>City Id</th>
                        <th>City Name</th>
                        <th>State Name</th>
                    </tr>
            {
                    ctlist.map((citem) => (
                        <tr>
                            <td>{citem.ctid}</td>
                            <td>{citem.ctname}</td>
                           
                            {
                                stlist.map((sitem) => {
                                    if (citem.stid==sitem.stid) {
                                        stname = sitem.stname;
                                    }
                                })
                            }
                            <td>{stname}</td>
                        </tr>
                        ))
                }
            </table>
        </div>
    )
} export default CityMgt;