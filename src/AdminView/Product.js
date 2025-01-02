import React, { useState, useEffect } from "react";
import axios from "axios";

function Product(props) {
    const [pid, setpid] = useState();
    const [pname, setPname] = useState();
    const [pprice, setPprice] = useState();
    const [oprice, setOpPrice] = useState();
    const [ppicname, setPpicName] = useState();
    const [pcatgid, setPcatgId] = useState();
    const [pcatglist, setPcatglist] = useState([]);
    const [image, setimage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [plist, setPlist] = useState([]);

    var cname = '';
    var catgname = '';

    const handlePidText = (e) => {
        setpid(e.target.value);
    }
    const handlePnametext = (e) => {
        setPname(e.target.value);
    }

    const handlePprice = (e) => {
        setPprice(e.target.value);
    }

    const handleOpPrice = (e) => {
        setOpPrice(e.target.value);
    }

    const handlePcatgSelect = (e) => {
        //alert(e.target.value)
        setPcatgId(e.target.value);
    }

    useEffect(() => {
        axios.get('http://localhost:7676/product/getmaxpid').then((res) => {
            setpid(res.data.length + 1);

        }).catch((err) => {
            alert(err);
        });
        axios.get('http://localhost:7676/productcatg/showproductcatg').then(res => {
            setPcatglist(res.data);
        }).catch(err => {
            alert(err);
        })
    }, [])

    const handleSaveButton = () => {
        var obj = {
            pid: pid,
            pname: pname,
            pprice: pprice,
            oprice: oprice,
            ppicname: ppicname,
            pcatgid: pcatgid,
            vid: props.data
        };
        axios.post('http://localhost:7676/product/saveproduct/', obj).then((res) => {
            alert("Product Saved");
        }).catch((err) => {
            alert(err);
        })
    }

    const handleShowButton = () => {
        axios.get('http://localhost:7676/product/showproduct/').then((res) => {
            setPlist(res.data);

        }).catch((err) => {
            alert(err);
        })
    }

    //browse and save image
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('file', image.data);

        const response = await fetch('http://localhost:7676/product/saveproductimage', {
            method: 'POST',
            body: formData,
        })
        if(response)
        {
            if (response.statusText == 'ok') {
                setStatus("File Uploaded Succesfully");
            }
            else
            {
                setStatus("Failed to upload file");
    
            }
            }
        }
        

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setimage(img);
        setPpicName(e.target.files[0].name);
    }

    const handleNewButton = () => {
        axios.get('http://localhost:7676/product/getmaxpid').then((res) => {
            setpid(res.data.length + 1);
            setPname("");
            setPcatgId("");
            setPprice("");
            setOpPrice("");
            setPpicName("");
            setimage("");

        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div>
            <center>
                <p className="pageHeading">NEW PRODUCT FORM|| Vendor Id {props.data}</p>
                {/* <p style={{ color: "blue" }}>Product Form</p> */}
                <table className="styled-table-Product">
                    <tr>
                        <td>Product Id</td>
                        <td>{pid}</td>
                    </tr>
                    <tr>
                        <td>Product Name</td>
                        <td>
                            <input type="text" onChange={handlePnametext} value={pname} />
                        </td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>
                            <input type="number" onChange={handlePprice} value={pprice} />
                        </td>
                    </tr>
                    <tr>
                        <td>Offer Price</td>
                        <td>
                            <input type="number" onChange={handleOpPrice} value={oprice} />
                        </td>
                    </tr>
                    <tr>
                        <td>Select Photo</td>
                        <td>
                            <input type="file" onChange={handleFileChange} name="file" />
                            <img src={image.preview} width="100" height='100' />
                        </td>
                    </tr>
                    <tr>
                        <td>Click to Upload Product</td>
                        <td>
                            <button type="submit" onClick={handleSubmit}  className="custom-button">Upload</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>
                            <select onClick={handlePcatgSelect} className="styled-select">
                                {

                                    pcatglist.map((item) => (
                                        <option value={item.pcatgid}>{item.pcatgname}</option>


                                    ))
                                     }
                            </select>
                        </td>
                    </tr>
                   
                </table>
                <table>
                <tr>
                        <td>
                            <button type="submit" onClick={handleNewButton} className="btn btn-info">New</button>
                        </td>
                        <td>
                            <button type="submit" onClick={handleSaveButton} className="btn btn-success">Save</button>
                        </td>
                        <td>
                            <button type="submit" onClick={handleShowButton} className="btn btn-primary">Show</button>
                        </td>
                    </tr>
                </table>
                <p className="pageHeading">CURRENT LIST</p>
                <table className="styled-table-Product">
                    <tr>
                        <th>SNO</th>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer Price</th>
                        <th>Category Name</th>
                        <th>Photo</th>

                    </tr>
                    {
                        plist.map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.pprice}</td>
                                <td>{item.oprice}</td>

                                <td>
                                    {
                                        pcatglist.map((citem) => {
                                            if (item.pcatgid == citem.pcatgid) {
                                                cname = (citem.pcatgname)
                                            }
                                        })
                                    }
                                    {cname}
                                </td>
                                <td>
                                    <img src={"http://localhost:7676/product/getproductimage/" + item.ppicname} height='100' width='100' />
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )

} export default Product