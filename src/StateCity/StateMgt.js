import React,{useEffect,useState} from "react";
import axios from "axios";



function StateMgt() {
    const [stid, setStId] = useState();
    const [stname, setStName] = useState();
    const [stlist, setStList] = useState([]);

    const handleStId = (evt) => {
        setStId(evt.target.value);
    }
    const handleStName = (evt) => {
        setStName(evt.target.value);
    }
    useEffect(() => {
        axios.get("http://localhost:7676/state/show").then((res) => {
            setStId(res.data.length + 1);
            setStList(res.data);
        });
    }, []);

    const handleSaveBtn = () => {
        var obj = {
            stid: stid,
            stname: stname
        }
        axios.post("http://localhost:7676/state/save", obj).then((res) => {
            alert("State Saved");
        }).catch((err) => {
            alert(err);
        })
    }
    const handleSearchBtn = () => {
        axios.get('http://localhost:7676/state/searchstate/' + stid).then((res) => {
            setStName(res.data.stname);
        }).catch((err) => {
            alert(err);
        })
    }
    const handleUpdateBtn = () => {
        var obj = {
            stid: stid,
            stname: stname
        }
        axios.put('http://localhost:7676/state/editstate/', obj).then((res) => {
            alert(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const handleDeleteBtn = () => {
        axios.delete('http://localhost:7676/state/deletestate/' + stid).then((res) => {
            setStName("");
            setStId("");
            alert(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div>
                            <h4 className="pageHeading">State Management</h4>

            <table className="styled-table">
                <tr>
                    <td>State Id</td>
                    <td>
                        <input type="text" onChange={handleStId} value={stid} placeholder="enter state id"/>
                    </td>
                </tr>
                <tr>
                    <td>State Name</td>
                    <td>
                        <input type="text" onChange={handleStName} value={stname} placeholder="enter state name"/>
                    </td>
                </tr>
            </table>
          
            <button type="submit" onClick={handleSaveBtn} className="btn btn-success">Save</button>
            <button type="submit" onClick={handleSearchBtn} className="btn btn-primary">Search</button>
            <button type="submit" onClick={handleUpdateBtn} className="btn btn-info">Update</button>
            <button type="submit" onClick={handleDeleteBtn} className="btn btn-danger">Delete</button>
            <h2 className="pageHeading">State List</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>State ID</th>
                        <th>State Name</th>
                    </tr>
                </thead>
                <tbody>
                    {stlist.map((item) => (
                        <tr>
                            <td>{item.stid}</td>
                            <td>{item.stname}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )

}
export default StateMgt;