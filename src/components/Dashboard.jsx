import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Logo from "../assets/logo.png";
import Pop from "../assets/pop.webp";
import style from "../css/style.css";
import Paypal from './Paypal';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
const Dashboard = () => {
const navigate = useNavigate();
const basicAuth = 'QVIxY0dmdkxPUzM4LTFYSWdhdENIRVhNcnlqYVQxdHZZMEwwWXdXT0dvMkhLT1JFQzRTWmE4NlUwaXdoNVBJc0QxSFFLTm41N1pQUGRpLUc6RVB5RGxlQzJvX3ZPQXNnUnVvMncwZ0c1dHplVEVOQmhIc3MwNWFxbVZMT0Z5OFJzN1JEM2xqTGRpd043WE1NX3hxcjVJNEdZN3FxVHU4Ul8';
const location = useLocation();
const [email, setEmail] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [checkout, setCheckout] = useState(false);
const [data, setData] = useState(null);
const [activeIndex, setActiveIndex] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [responseData, setResponseData] = useState([]);
const [amount, setAmount] = useState('');
const [api_key, setApiKey] = useState('');
const [subscription_id, setSubscriptionId] = useState('');
const handleCheckout = () => {
    if (!checkout) {
        setCheckout(true);
    }
};

//getting payerId..
// useEffect(() => {
//   const getQueryParam = (name) => {
//     const params = new URLSearchParams(window.location.search);
//     return params.get(name);
//   };
//   const tokens = getQueryParam('token');
//   if(tokens) {
//   const message = document.getElementById("success-paypal");
//   message.innerHTML = "<strong className='success'>Payment Successfully done</strong>";
//  // console.log('id:', payerId);
//   }
// }, []);



// useEffect(() => {
//   const searchParams = new URLSearchParams(location.search);
//   const token = searchParams.get('token');
//   const apiKey = '963b1ca860cc8942940651303d1477ba29b30e609d0406e42ccdb84cf2e48e2f';

  
//   if (token && apiKey) {
//       // Make a POST request to your backend with token and api_key
//       postDataToBackend(apiKey, token);
//   }
// }, [location.search]); 


 
  

      const handleClick = (event,index) => {
        setActiveIndex(index);
        const customattributes = event.target.getAttribute('price');
        //document.getElementById('amountpaypal').value = customattributes;
        document.getElementById('cancel').removeAttribute('disabled');
        setAmount(customattributes);
       //console.log("the values are", customattributes);
      }

      const generateRandomNumber = () => {
        return Math.floor(Math.random() * 100) + 1; 
      };
     // const apiKeys = '963b1ca860cc8942940651303d1477ba29b30e609d0406e42ccdb84cf2e48e2f';
    
     const apiKey = sessionStorage.getItem('email');
     const emails = sessionStorage.getItem('apiKey');
     //console.log("The api key",apiKey);
     //console.log("The email is", emails);






      //making post request to the backend to fetch subscription data..
      useEffect(() => {
        axios.post(`https://codexstream.com/ipn?user=${apiKey}`)
        .then(response=> {
           // console.log("The response from the server is", response);
           setResponseData(response.data);
           setIsLoading(false);
           console.log(response.data);
        })
        
        .catch(error=> {
            console.error("Error file fetching data", error);
            setIsLoading(false);
        });
       },[]);
      
  



       
       const handleSignOut = () => {
       
        const email = sessionStorage.getItem('email');
        const sessionKey = sessionStorage.getItem('apiKey');
      
       
        const credentials = btoa(`${email}:${sessionKey}`);
      
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${credentials}`);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };
      
        fetch("https://166.88.198.78/admin/logout", requestOptions)
          .then((response) => {
            sessionStorage.removeItem('email');
            navigate('/Login');
          })
          .catch((error) => console.error(error));
      };
      
      const Email = sessionStorage.getItem('email');
      //console.log("The email is ", Email);
      useEffect (() => {
        const Emails = sessionStorage.getItem('email');
        if(!Emails) {
            navigate("/Login");
            setEmail(Emails);
        }else {
            setIsLoggedIn(true);
            console.log("The email is ", Emails);
        }
      })


      const date = new Date();
      const currentDateUTC = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const formattedDate = currentDateUTC.toISOString().split('T')[0]; // Extracting only the 
      console.log(formattedDate); 

     
      
  return (
   <div>
       {isLoggedIn && (

    <section>
     
     <div className="container-fluid">
  
        <div className="row flex-nowrap">
            <div className="desh-main col-auto col-md-3 col-xl-2 px-sm-2 px-1">
                <div className="d-flex flex-column align-items-md-center align-items-sm-start pt-2 text-white min-vh-100">
                    <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline"><img src={Logo} className="" width="30px" alt=""/></span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li>
                            <a href="#submenu1" className="nav-link px-0 align-middle">
                                <i className="fa fa-home" aria-hidden="true"></i> <span className="d-none d-sm-inline">Dashboard</span> </a>
                        </li>
                        <li>
                            <Link to="/Invoices" className="nav-link px-0 align-middle">
                                <i className="fa fa-file-text" aria-hidden="true"></i><span className=" ms-2 d-none d-sm-inline">Invoices</span></Link>
                        </li>
                    </ul>
                    <hr/>
                    <div className="dropdown pb-4">
                        
                    <i className="fa fa-sign-out cursor-pointer" aria-hidden="true" onClick={handleSignOut}>Signout</i>

                       
                    </div>
                </div>
            </div>
            <div className="col py-3">
                <div id="submenu1" className=" dashboard">
                    <div className=" dashboard-main">
                        <div className="">
                            <h4 className=" fw-bold">Dashboard</h4>
                            <div id='success-paypal'></div>
                            <p>Here is your Email account. Let’s surf securely!</p>
                        </div>
                        <div className="">
                            <div className="header-card">
                                <div className="">
                                    <h2>0</h2>
                                </div>
                                <div className="Orders-btn">
                                    <h6>Unpaid Orders</h6>
                                    <Button variant='contained' type="button" className="dash-btn">
                                    <Link to="/Invoices" className='link'>View Detail</Link>   
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-main">
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                    <CircularProgress /> {/* Spinner */}
                    </div>
                ) : (
                    Array.isArray(responseData) && responseData.length > 0 ? (
                        <table className="">
                            <thead>
                              <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Plan</th>
                                <th scope="col">Price</th>
                                <th scope="col">Expired At</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                            {responseData.map((item, index) => (
                       <tr key={index}>
                        <td className='sub-price'>{item.email}</td>
                        <td className='sub-price'>Monthly</td>
                        <td className='sub-price'>
                            {`$${item.amount}`}
                        </td>
                        <td className='sub-price'>
                            {item.date && new Date(item.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                        </td>
                        <td>
                        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                     <input type="hidden" name="business" value="sb-e47uc430331287@business.example.com"/>
                    <input type="hidden" name="cmd" value="_xclick-subscriptions"/>
                    <input type="hidden" name="a3" id='amountpaypal' />
                    <input type="hidden" name="p3" value="1"/> 
                    <input type="hidden" name="t3" value="M"/> 
                    <input type="hidden" name="src" value="1"/> 
                    <input type="hidden" name="sra" value="0"/> 
                    <input type="hidden" name="item_name" value="Monthly Subscription"/>
                    <input type="hidden" name="item_number" value={apiKey}/>
                    <input type="hidden" name="no_note" value="1"></input>
                    <input type="hidden" name="currency_code" value="USD"/>           
                    <input type="hidden" name="return" value="http://localhost:3000/Dashboard"/>
                    <input type="hidden" name="cancel_return" value="http://localhost:8000/Email/ipn.php"/>
                    <input type="hidden" name="notify_url" value="https://codexstream.com/ipn/"></input>   
                  
                    {item.status === 'CANCELLED' ||  new Date(item.date) > new Date() ? (
                            <Button type="submit" variant='contained' id='renew'  disabled>Pay Now</Button>
                        ) : (
                            <Button type="submit" variant='contained' >Pay Now</Button>
                        )}

                    </form>
                    </td>
                        
                    </tr>
                ))}
                    </tbody>
                          </table>
                        ) : (
                            <div className='no-data'>You don't have a Email account. Please purchase a plan.</div>
                         )
                         )}
                        </div>
                    
                      <button type="button"
                    class="pop_up"
                    data-bs-toggle="modal"
                    data-bs-target="#GFG"> 
                    Buy Now
                    </button> 
                    <div className="dash-footer">
                     <p>© 2024. EMAIL. All Rights reserved.</p>
                    </div>
                    
                </div>

            </div>
        </div>
        
    </div>
    <div class="w-80 p-3"> 
    {/* Buy Now Pop up  */}
		<div class="modal fade" id="GFG"> 
			<div class="modal-dialog modal-lg"> 
				<div class="modal-content"> 
					<div class="modal-header"> 
						<img src={Logo} width="30px" />
						<button type="button"class="btn-close"data-bs-dismiss="modal"> 
						</button> 
					</div> 
					<div class="modal-body"> 
						<h5>Select Plan</h5> 
                            <div class="row">
                                <div class="col-md-4" >
                                <div className={`popup-card ${activeIndex === 0 ? 'active' : ''}`}>
                                        <img width="150px" src={Pop} alt=""/>
                                        <h4 price='13.77'>$13.77</h4>
                                        <h4>Shallow</h4>
                                        <p>30 Days</p>
                                        <button type="btn" class="btn popup-btn" price='14.00' onClick={(event) => handleClick(event,0)}>Select Plan</button>

                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div className={`popup-card ${activeIndex === 1 ? 'active' : ''}`}>
                                        <img width="150px" src={Pop} alt=""/>
                                        <h4 price="13.77">$13.77</h4>
                                        <h4>Shallow</h4>
                                        <p>30 Days</p>
                                        <button type="btn" class="btn popup-btn" price='13.77' onClick={(event) => handleClick(event,1)}>Select Plan</button>

                                    </div>
                                </div>
                                <div class="col-md-4" >
                                <div className={`popup-card ${activeIndex === 2 ? 'active' : ''}`}>
                                        <img width="150px"src={Pop} alt=""/>
                                        <h4 > $13.77</h4>
                                        <h4>Shallow</h4>
                                        <p>30 Days</p>
                                        <button type="button" class="btn popup-btn" price='13.77' onClick={(event) => handleClick(event,2)}>Select Plan</button>
                                    </div>
                                </div>
                            </div>
                            <div class=" float-end d-flex popup-footer">
                        <button type="button"  class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> 
                      <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                     <input type="hidden" name="business" value="sb-e47uc430331287@business.example.com"/>
                    <input type="hidden" name="cmd" value="_xclick-subscriptions"/>
                    <input type="hidden" name="a3" id='amountpaypal' value={amount}/>
                    <input type="hidden" name="p3" value="1"/> 
                    <input type="hidden" name="t3" value="M"/> 
                    <input type="hidden" name="src" value="1"/> 
                    <input type="hidden" name="sra" value="0"/> 
                    <input type="hidden" name="item_name" value="Monthly Subscription"/>
                    <input type="hidden" name="item_number" value={apiKey}/>
                    <input type="hidden" name="no_note" value="1"></input>
                    <input type="hidden" name="currency_code" value="USD"/>           
                    <input type="hidden" name="return" value="http://localhost:3000/Dashboard"/>
                    <input type="hidden" name="cancel_return" value="http://localhost:8000/Email/ipn.php"/>
                    <input type="hidden" name="notify_url" value="https://codexstream.com/ipn/"></input>   
                    <button type="submit" class="btn cancel-btn" id='cancel' disabled>Pay Now</button>
                    </form>
                              </div>
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                    
                </div> 
</section>
   )}
   </div>
 
  )
}

export default Dashboard;
