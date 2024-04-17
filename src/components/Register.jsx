import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from '@mui/material'; // Import Alert from MUI
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
  privileges: Yup.string().required('Required'),
});



const Register = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (error) {
      setShowError(true);
  
      const errorTimeout = setTimeout(() => {
        setShowError(false);
        setError(null); 
      }, 2000);
  
      return () => clearTimeout(errorTimeout);
    }
  }, [error]);

  // const addUser = async (values) => {
  //   try {
  //   //  const accessToken = "bWVAZGVyc3RhY2xvdXQubW9uc3RlcjpqMW1mT2R2ZUVmTWNUOEkxSGJuMQ==";
  //     const formData = new URLSearchParams();
  //     formData.append('email', values.email);
  //     formData.append('password', values.password);
  
  //     const response = await fetch(`https://166.88.198.78/admin/mail/users/add`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Basic ${accessToken}`,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: formData.toString(),
  //     });
  
  //     if (!response.ok) {
  //       if (response.status === 400) {
  //         const errorText = await response.text();
  //         console.error('Failed to add user:', errorText);
  //         throw new Error('User already exists');
  //       }
  //       const errorText = await response.text();
  //       console.error('Failed to add user:', errorText);
  //       throw new Error('Failed to add user');
  //     }
  
  //     const responseData = await response.text(); 
  //     console.log('Response from first API:', responseData);
  //     const data = { message: responseData.trim() }; 
  //     console.log('User added successfully', data);  
  //     setSuccessMessage('User added successfully');
  
     
  //     if (data.message === 'mail user added') {
  //       console.log('Making second API call...');
        
  //       const ipnResponse = await fetch(`https://codexstream.com/ipn_register`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',

  //         },
  //         body: JSON.stringify({ email: values.email, password: values.password }),
  //       });
  
  //       if (!ipnResponse.ok) {
  //         console.error('Failed to save data in ipnregister table');
          
  //       } else {
  //         console.log('Data saved in ipnregister table successfully');
  //       }
  //     } else {
  //       console.log('User was not added, skipping second API call');
  //     }
  
  //     setTimeout(() => {
  //       navigate('/Login');
  //     }, 2000);
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //     setError(error.message || 'Failed to add user');
  //   }
  // };
  

  const addUser = async (values) => {
    try {
      // Commented out first API call
      // const accessToken = "bWVAZGVyc3RhY2xvdXQubW9uc3RlcjpqMW1mT2R2ZUVmTWNUOEkxSGJuMQ==";
      // const formData = new URLSearchParams();
      // formData.append('email', values.email);
      // formData.append('password', values.password);
      //
      // const response = await fetch(`https://166.88.198.78/admin/mail/users/add`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Basic ${accessToken}`,
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: formData.toString(),
      // });
  


      // Second API call..
      console.log('Making second API call...');
      const ipnResponse = await fetch(`https://codexstream.com/ipn_register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
  
      if (!ipnResponse.ok) {
        console.error('Failed to save data in ipnregister table');
      } else {
        console.log('Data saved in ipnregister table successfully');
      }
  
      // Navigate after second API call
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      console.error('Error adding user:', error);
      setError(error.message || 'Failed to add user');
    }
  };
  


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      await addUser(values);
      console.log(values.email);
      setSubmitting(false);
    } catch (error) {
      if (error.message === 'User already exists') {
        setError('User already exists. Please choose a different email.');
      } else {
        setError('Failed to add user');
      }
    }
  };

  return (
    <div>
     
      <div className="login-main py-3 py-md-5">
        <div className="container">
       
          <div className="row justify-content-md-center">
         
            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
              <div className="log-in p-4 p-md-5 rounded shadow-sm">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                    {showError && ( 
                    <Alert severity="error">Email is Already Exist</Alert>
                  )}
                      <h3>Register Now</h3>
                    </div>
                  </div>
                </div>
              
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    remember_me: false,
                    privileges: 'user',
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                        <Field type="email" className="form-control" name="email" id="email" placeholder="name@example.com" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="col-12">
                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                        <Field type="password" className="form-control" name="password" id="password" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                    
                      <div className="col-12">
                        <label htmlFor="privileges" className="form-label">Privileges <span className="text-danger">*</span></label>
                        <Field as="select" className="form-select" name="privileges" id="privileges">
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </Field>
                        <ErrorMessage name="privileges" component="div" className="text-danger" />
                      </div>
                     
                      <div className="col-12">
                        <div className="d-grid">
                          <Button variant='contained' type="submit">Register</Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4" />
                    <div className="login-link d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <p className="mt-5 mb-4">Already registered? <Link to="/Login" style={{ color: '#fff' }}>Login</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
