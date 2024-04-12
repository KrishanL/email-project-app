import React from 'react';
import { useEffect } from 'react';
import Logo from "../assets/logo.png";
import style from "../css/style.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const smoothScroll = (targetId) => {
          const target = document.getElementById(targetId);
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
            });
          }
        };
    
        const handleNavLinkClick = (event, targetId) => {
          event.preventDefault();
          smoothScroll(targetId);
        };
    
        
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
          const targetId = link.getAttribute('href').substring(1);
          link.addEventListener('click', (event) => handleNavLinkClick(event, targetId));
        });
      }, []);
   
      // const handleAccountClick = () => {
      //   navigate('/Register');
      // };



  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#"> <img src={Logo} className="logo-img" alt=""/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#feature">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#about">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#whychoose">Choose Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#how">How To Use</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#pricing">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-semibold" href="#testimonial">Testimonials</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold"  to='/Register'>Account</Link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </div>
  )
}

export default Header;
