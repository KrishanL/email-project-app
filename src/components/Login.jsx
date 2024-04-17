import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { Button } from '@mui/material';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
  privileges: Yup.string().required('Required'), 
});

const Login = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const login = "Login";
  const navigate = useNavigate();
  
  const loginUser = async (values) => {
    try {
      const credentials = `${values.email}:${values.password}`;
      const base64Credentials = btoa(credentials);
  
      const formData = new URLSearchParams();
      formData.append('email', values.email);
      formData.append('password', values.password);
  
      const response = await fetch(`https://codexstream.com/ipn_register?Type=${login}`, {
        method: 'POST',
        headers: {
         // 'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
  
     
      const responseData = await response.json();
      
      if (responseData.status === "ok") {
         sessionStorage.setItem('email', responseData.email);
         navigate('/Dashboard');
         console.log("successfully Login");
      } else {
        setError("Invalid Email or Password");
        setOpen(true);

        console.error('Login failed:', responseData.error); 
      }
     
    } catch (error) {
      setError('Failed to login');
      console.error('Error logging in:', error);
     // alert("Failed to login");
      setError('Failed to login');
    }
  };
  
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    await loginUser(values);
    //console.log(values.email);
    //resetForm();
   // navigate('/Login');
    setSubmitting(false);
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
                  
                  <h3>Welcome back</h3>
                    </div>
                  </div>
                </div>

                {/* showing alert error */}
                <Snackbar 
                open={open} 
               autoHideDuration={4000} 
               onClose={() => setOpen(false)}
             anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
             
              >
              <Alert severity="error" onClose={() => setOpen(false)}>
              {error}
              </Alert>
              </Snackbar>

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
                        <div className="form-check">
                          <Field type="checkbox" className="form-check-input" name="remember_me" id="remember_me" />
                          <label className="form-check-label" htmlFor="remember_me">Keep me logged in</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <Button variant='contained' type="submit">Login</Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4" />
                    <div className="login-link d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <Link to="/Register" className="text-decoration-none">Create new account</Link>
                      {/* <a href="#!" className="text-decoration-none">Forgot password</a> */}
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-12">
                    <p className="mt-5 mb-4">Or sign in with</p>
                    <div className="d-flex gap-3 flex-column flex-md-row">
                      <a href="#!" className="btn bsb-btn-xl btn-outline-light">
                        <span className="ms-2 fs-6">Google</span>
                      </a>
                      <a href="#!" className="btn bsb-btn-xl btn-outline-light">
                        <span className="ms-2 fs-6">Facebook</span>
                      </a>
                      <a href="#!" className="btn bsb-btn-xl btn-outline-light">
                        <span className="ms-2 fs-6">Twitter</span>
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
