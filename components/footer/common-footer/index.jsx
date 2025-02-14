import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import Link from "next/link";
import React from "react";
import BottomNavigation from "./BottomNavigation"; // Adjust the import path

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import WhatsApp icon from Brands icons




const index = ({ footerStyle = "" }) => {

  return (
    <footer className={`main-footer ${footerStyle}`} style={{ backgroundColor: '#f8f8f8' }}>
  <div className="auto-container">
    {/* <!--Widgets Section--> */}
    <div className="widgets-section" data-aos="fade-up">
      <div className="row">
        {/* Column 1: Programs */}
        <div className="big-column col-xl-2 col-lg-2 col-md-4 col-sm-12">
          <div className="footer-column">
            <h4 style={{ fontWeight: 'bold' }}>Programs</h4>
            <ul className="footer-list">
              <li>
                <a href="/services">Pay after placement</a>
              </li>
              <li>
                <a href="/services">Career Bootcamp</a>
              </li>
              <li>
                <a href="/services">Classroom courses</a>
              </li>
              <li>
                <a href="/services">Online training</a>
              </li>
              <li>
                <a href="/services">Job assistance</a>
              </li>
              <li>
                <a href="/services">Off Campus placements</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Training */}
        <div className="big-column col-xl-2 col-lg-2 col-md-4 col-sm-12">
          <div className="footer-column">
            <h4 style={{ fontWeight: 'bold' }}>Training</h4>
            <ul className="footer-list">
              <li>
                <a href="/courses">Java training</a>
              </li>
              <li>
                <a href="/courses">MERN training</a>
              </li>
              <li>
                <a href="/courses">Python training</a>
              </li>
              <li>
                <a href="/courses">DSA training</a>
              </li>
              <li>
                <a href="/courses">Interview preparation</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Services & About */}
        <div className="big-column col-xl-2 col-lg-2 col-md-4 col-sm-12">
          <div className="footer-column">
            <h4 style={{ fontWeight: 'bold' }}>Company</h4>
            <ul className="footer-list">
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">About us</a>
              </li>
              <li>
                <a href="/home#testimonials">Success stories</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4: Important Links */}
        <div className="big-column col-xl-2 col-lg-2 col-md-4 col-sm-12">
          <div className="footer-column">
            <h4 style={{ fontWeight: 'bold' }}>Important Links</h4>
            <ul className="footer-list">
              <li>
                <a href="/jobs">Jobs</a>
              </li>
              <li>
                <a href="/internships">Internships</a>
              </li>
              <li>
                <a href="/tutorials">Tutorials</a>
              </li>
              <li>
                <a href="/courses">Courses</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 5: Contact */}
        <div className="big-column col-xl-4 col-lg-4 col-md-6 col-sm-12">
          <div className="footer-column">
            <h4 style={{ fontWeight: 'bold' }}>Contact Us</h4>
            <p className="address">
              C-94, Sector 8, Noida. <br />
              <a href="mailto:hr@code91.co" className="email">
                hr@code91.co
              </a>
            </p>
            <p className="phone-num">
              <span>
                <FontAwesomeIcon icon={faPhone} /> Call Us:
              </span>
              <a href="tel:9717713724">971-771-3724</a>
            </p>
            <p className="whatsapp">
              <span>
                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp:
              </span>
              <a href="https://api.whatsapp.com/send?phone=919717713724">9717713724</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End auto-container */}
  <br />
  <br />
  <br />
  <BottomNavigation />
  {/* <!--Bottom--> */}
</footer>

   //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
