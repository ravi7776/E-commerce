import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from '../logo.svg'

function Bill(props) {
    const [mydate, setMyDate] = useState();
    
    const [custdata, setCustData] = useState();
    const [cname, setCName] = useState();
    const [caddress, setCAddress] = useState();
    const [ccontact, setCContact] = useState();
    const [sitems, setSItems] = useState([]);

    var total = 0;
    var nextbillid = "";

    useEffect(() => {
        // alert("props lenth="+props.data.selitems.length);
        for (var i = 0; i < props.data.selitems.length; i++) {
            sitems.push(props.data.selitems[i]);
        }
        // alert("Item Count in SITEM="+sitems.length);

        axios.get("http://localhost:7676/customer/getcustomerdetails/" + props.data.cid).then((res) => {
            console.log(res.data.CustomerName);
            setCName(res.data.CustomerName);
            setCAddress(res.data.CAddress);
            setCContact(res.data.CContact);
            mydatefun();
        }).catch((err) => {
            alert(err);
        })
    }, [])

    function mydatefun() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        console.log(currentDate);
        setMyDate(currentDate);
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        })
    }
    function SaveBill() {
        // alert(sitems.length);
        axios.get('http://localhost:7676/bill/getbillid').then((res) => {
            nextbillid = parseInt(res.data[0].billid) + 1;
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            sitems.map((item) => {
                // alert(item.pid);
                var billobj = {
                    billid: nextbillid,
                    billdate: currentDate,
                    cid: props.data.cid,
                    pid: item.pid
                }
                // alert("id="+props.data.cid)

                axios.post('http://localhost:7676/bill/billsave', billobj).then((res) => {
                    alert(res.data);
                })
                    .catch((err) => {
                        alert("inner" + err);
                    }).catch((err) => {
                        alert("outer" + err);
                    });
            })
        })
    }

    async function displayRazorPay() {
        SaveBill();
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("RazorPay SDK failed to load.Are you online");
            return;
        }
        var myamount = total * 100;
        //creating new order
        const result = await axios.post("http://localhost:7676/payment/orders/" + myamount);
        if (!result) {
            alert("Server error,Are you online?");
        }

        //getting order detail back
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: "rzp_test_8CxHBNuMQt1Qn8", //enter key id generated from dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Universal Informatics Pvt Ltd. Indore",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature
                };
                alert(data.razorpayPaymentId)
                const result = await axios.post("http://localhost:7676/payment/success", data);
                alert(result.data);

                //save payment details
                const paydetlobjdata = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    cid: props.data.cid,
                    billid: nextbillid,
                    amount: amount
                };

                axios.post("http://localhost:7676/paymentdetails/paymentdetailsave", paydetlobjdata).then((res) => {
                    alert(res.data);

                }).catch((err) => {
                    alert(err);
                })

            },
            prefill: {
                name: "Universal Informatics",
                email: "universal@gmail.com",
                contact: "9998878788"

            },
            notes: {
                address: "Universal Informatics Pvt Ltd Indore"
            },
            theme: {
                color: "#F5D3AD"
            },

        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
        <div>
            <table className="styled-table">

                <tr>
                    <td>Customer Id</td>
                    <td>
                        {props.data.cid}
                    </td>
                </tr>
                <tr>
                    <td>Customer Name</td>
                    <td>
                        {cname}
                    </td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>
                        {caddress}
                    </td>
                </tr>
                <tr>
                    <td>Contact</td>
                    <td>
                        {ccontact}
                    </td>
                </tr>
                <tr>
                    <td>Bill Date</td>
                    <td>
                        {mydate}
                    </td>
                </tr>

            </table>
            <center>
                <h4>Bill</h4>
                <table className="styled-table">
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                    </tr>
                    {
                        props.data.selitems.map((item) => (
                            <tr>
                                <td>{item.pid}</td>
                                <td>{item.pname}</td>
                                <td>{item.oprice}</td>
                                <img src={"http://localhost:7676/product/getproductimage/" + item.ppicname} />
                            </tr>
                        ))
                    }
                </table>
                {
                    props.data.selitems.map((item) => {
                        total = total + item.oprice;
                    })
                }
                <h4>Total Amount={total}</h4>
                <button type="submit" className="custom-button" onClick={displayRazorPay}>Pay Now</button>
            </center>
        </div>
    )
} export default Bill