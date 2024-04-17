import React from 'react';
import Logo from "../assets/logo.png";
import style from "../css/style.css";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Invoices = () => {
const [searchQuery, setSearchQuery] = useState('');
const navigate = useNavigate();
const [subscriptionData, setSubscriptionData] = useState(null);
const [responseData, setResponseData] = useState([]);
const [email, setEmail] = useState();
const [isLoading, setIsLoading] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);

    //   useEffect(() => {
    //    const email = sessionStorage.getItem('email');
    //      if (!email) {
    //       navigate('/Login');
    //       }
    //         }, [navigate]);


            const handleSearchChange = (event) => {
            const query = event.target.value;
             console.log('Search Query:', query);
             setSearchQuery(query.toLowerCase());
            };
            

            const filteredData = responseData.filter((item) =>
            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `$${item.amount}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.status.toLowerCase().includes(searchQuery.toLowerCase()) 
            );


            
            const apiKey = sessionStorage.getItem('email');
            const emails = sessionStorage.getItem('apiKey');
      //const apiKeys = '963b1ca860cc8942940651303d1477ba29b30e609d0406e42ccdb84cf2e48e2f';



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



       const HandleSignOut = () => {

   
        const email = sessionStorage.getItem('email');
        const sessionKey = sessionStorage.getItem('apiKey');
            
              if (!email ) {
                console.error("Email or session key not found in session storage");
                navigate("/Login");
                return;
              }
            
              
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
                  sessionStorage.removeItem('apiKey');
                  navigate('/Login');
                })
                .catch((error) => console.error(error));
            };


           
              
         const date = new Date();
         const currentDateUTC = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const formattedDate = currentDateUTC.toISOString().split('T')[0]; // Extracting only the date part
       console.log(formattedDate); // Output: "2024-04-12"
              
       //const Emails = sessionStorage.getItem('email');
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
                            <Link to="/Dashboard" className="nav-link px-0 align-middle">
                                <i className="fa fa-home" aria-hidden="true"></i> <span className="d-none d-sm-inline">Dashboard</span> </Link>
                        </li>
                        <li>
                            <Link to="/Invoices" className="nav-link px-0 align-middle">
                                <i className="fa fa-file-text" aria-hidden="true"></i><span className=" ms-2 d-none d-sm-inline">Invoices</span></Link>
                        </li>
                    </ul>
                    <hr/>
                    <div className="dropdown pb-4">
                        
                    <i className="fa fa-sign-out cursor-pointer" aria-hidden="true" onClick={HandleSignOut}></i>
                    
                    </div>
                </div>
            </div>
            <div className="col py-3">
        
        <div className="dashboard">
            <div className="dashboard-main">
                <div className="">
                    <h4 className=" fw-bold">Invoices</h4>
                    <p>Download available invoice and Let’s finish your unpaid orders.</p>
                </div>
                <div className="">
                <input
                className="server-search"
                type="search"
                placeholder="Search Order Number"
                value={searchQuery}
                onChange={handleSearchChange}
                />
            </div>
            </div>
            <div className="table-main">
            {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
               <CircularProgress /> 
             </div>
             ) : (
                Array.isArray(filteredData) && filteredData.length > 0 ? (
                <table className="">
                    <thead>
                  
                      <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Price</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((item, index) => (
                         <tr key={index}>
                        <td className='sub-price'>{item.id}</td>
                        <td className='sub-price'>Monthly</td>
                        <td className='sub-price'>
                            {`$${item.amount}`}
                        </td>
                        <td className='sub-price'>
                            {item.date && new Date(item.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                        </td>
                        <td className='sub-price'>{item.status}</td>
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
                  
                    {item.status === 'CANCELLED' || new Date(item.date) > new Date() ? (
                            <Button type="submit" variant='contained' id='cancel' disabled>Pay Now</Button>
                        ) : (
                            <Button type="submit" variant='contained' id='cancel'>Pay Now</Button>
                        )}

                    </form>
                    </td>
                        </tr>
                    ))}
                    
                   
                    </tbody>
                  </table>
                ) : (
           <div className='no-data'>
            No invoices found. It seems you haven't made any purchases yet. 
            <br /> 
            Please consider purchasing a plan to access your invoices.
            </div>

                )
                )}
            </div>
            <div className="dash-footer">
                <p>© 2023. EMAIL. All Rights reserved.</p>
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

export default Invoices;
