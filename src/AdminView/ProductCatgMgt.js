import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../AdminView/index.css'


function ProductCatgMgt() {
    const [pcatgid, setPcatgid] = useState();
    const [pcatgname, setPcatgname] = useState();
    const [pcatglist, setPcatglist] = useState([]);

    const handleTextChange = (evt) => {
        if (evt.target.name == 'pcatgid') {
            setPcatgid(evt.target.value);
        }
        if (evt.target.name == 'pcatgname') {
            setPcatgname(evt.target.value);
        }
    }

    const handleSearchButton = () => {

        axios.get('http://localhost:7676/productcatg/searchproductcatg/' + pcatgid).then((res) => {
            setPcatgname(res.data.pcatgname);
            alert(res.data.pcatgname);
        }).catch((err) => {
            alert(err);
        })
    }

    const handleSubmitButton = () => {
        var obj = {
            pcatgid: pcatgid,
            pcatgname: pcatgname
        }
        axios.post("http://localhost:7676/productcatg/addprodductcatg/" + obj.pcatgid + '/' + obj.pcatgname).then((res) => {
            alert(res.data);

        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:7676/productcatg/showproductcatg").then((res) => {
            setPcatglist(res.data);
            setPcatgid(res.data.length + 1);

        }).catch((err) => {
            alert(err);
        })
    }, []);

    const handleDeleteButton = () => {

        axios.delete("http://localhost:7676/productcatg/deleteproductcatg/" + pcatgid).then((res) => {
            setPcatgid("");
            setPcatgname("");
            alert(res.data);

        }).catch((err) => {
            alert(err);
        })
    }

    const handleUpdateButton = () => {
        var obj = {
            pcatgid: pcatgid,
            pcatgname: pcatgname
        }
        axios.put('http://localhost:7676/productcatg/editproductcatg/', obj).then((res) => {
            alert(res.data);
        }).catch((err) => {
           alert(err)
        })
    }


    return (
        <div>
            <center>
                <h4 className='pageHeading'>Product Category</h4>
                <table className='styled-table'>
                    <tr>
                        <td>Product category ID</td>
                        <td>
                            <input type="number" value={pcatgid} name='pcatgid' onChange={handleTextChange} className='form-control' />
                        </td>
                    </tr>
                    <tr>
                        <td>Product category Name</td>
                        <td>
                            <input type="text" name='pcatgname' value={pcatgname} onChange={handleTextChange} className='form-control' />
                        </td>

                    </tr>
                    {/* <tr >


                        <td>
                        </td>

                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                    </tr> */}
                </table>
                <button type="submit" onClick={handleSubmitButton} className="btn btn-success">Save</button>
                <button type="submit" onClick={handleSearchButton} className="btn btn-primary">Search</button>
                <button type="submit" onClick={handleDeleteButton} className="btn btn-danger">Delete</button>
                <button type='submit' onClick={handleUpdateButton} className="btn btn-info">Update</button>

                <table className="styled-table" >
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                    {
                        pcatglist.map((item) => (
                            <tr>
                                <td>{item.pcatgid}</td>
                                <td>{item.pcatgname}</td>
                            </tr>
                        ))  
                    }
                    


                </table>
            </center>
        </div>
    )
} export default ProductCatgMgt;



