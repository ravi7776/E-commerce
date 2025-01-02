import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../index.css'

function VendorReg() {
    const[vuserid,setVUserid]=useState();
    const[vuserpass,setVUserpass]=useState();
    const[vendorname,setVendorName]=useState();
    const[vaddress,setVAddress]=useState();
    const[vcontact,setVContact]=useState();
    const[vemail,setVEmail]=useState();
    const[vpicname,setVPicname]=useState();
    const[vid,setVId]=useState();
    const[image,setImage]=useState({preview:"",data:""});
    const[status,setStatus]=useState("");

    const handleVUserId=(e)=>{
        setVUserid(e.target.value);
    }
    const handleVUserPass=(e)=>{
        setVUserpass(e.target.value);
    }
    const handleVendorName=(e)=>{
        setVendorName(e.target.value);
    }
    const handleVAddress=(e)=>{
        setVAddress(e.target.value);
    }
    const handleVContact=(e)=>{
        setVContact(e.target.value);
    }
    const handleVEmail=(e)=>{
        setVEmail(e.target.value);
    }
    const handleVId=(e)=>{
        setVId(e.target.value);
    }

    useEffect(()=>{
        axios.get('http://localhost:7676/vendor/getvendorcount/').then((res)=>{
            setVId(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        })
    })

    const handleRegistrationButton=()=>{
        var obj={
            VUserId:vuserid,
            VUserPass:vuserpass,
            VenderName:vendorname,
            VAddress:vaddress,
            VContact:vcontact,
            VEmail:vemail,
            VPicName:vpicname,
            Vid:vid,
            Status:"Inactive"
        }
        axios.post('http://localhost:7676/vendor/register/',obj).then((res)=>{
            alert("Account Registered Succesfully");
        }).catch((err)=>{
            alert(err);
        })
    }

    //browse and save image 
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let formData=new FormData();
        formData.append('file',image.data);
        const response=await fetch("http://localhost:7676/vendor/savevendorimage",{
            method:"POST",
            body:formData,
        })
        if(response){
            if(response.statusText=='ok'){
                setStatus("File Uploaded Succesfully");
                alert("File Uploaded Succesfully")
            }
            else{
                setStatus("Failed to upload file");
                alert("Failed to upload file")
            }
        }
    }

    const handleFileChange=(e)=>{
        const img={
            preview:URL.createObjectURL(e.target.files[0]),
            data:e.target.files[0]
        }
        setImage(img);
        setVPicname(e.target.files[0].name);
    }
  return (
    <div>
      <center>
        <p className="pageHeading">Vendor Registration Form</p>
<table className="styled-table">
    <tr>
        <td>Vendor Id</td>
        <td>{vid}</td>
    </tr>
    <tr>
        <td>
            User Id
        </td>
        <td>
            <input type='text' onChange={handleVUserId} />
        </td>
    </tr>
    <tr>
        <td>Password</td>
        <td>
            <input type='password' onChange={handleVUserPass}/>
        </td>
    </tr>
   
    <tr>
        <td>Vendor Name</td>
        <td>
            <input type='text' onChange={handleVendorName}/>
        </td>
    </tr>
    <tr>
        <td>
            Address
        </td>
        <td>
            <input type='text' onChange={handleVAddress}/>
        </td>
    </tr>
    <tr>
        <td>Contact</td>
        <td>
            <input type='number' onChange={handleVContact} maxLength={10} minLength={10}/>
        </td>
    </tr>
    <tr>
<td>Email</td>
<td>
    <input type='email' onChange={handleVEmail}/>
</td>
    </tr>
    <tr>
        <td>Select Photo</td>
        <td>
            <input type='file' onChange={handleFileChange} name='file'/>
            <img src={image.preview} height="50" width="50"/>
        </td>
    </tr>
    <tr>
        <td>
            Click To Upload Vendor Photo
        </td>
        <td>
            <button type='submit' onClick={handleSubmit} className="custom-button">Upload</button>
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            <button type='submit' onClick={handleRegistrationButton} className="custom-button">Register</button>
        </td>
    </tr>
</table>
      </center>
    </div>
  )
}

export default VendorReg
