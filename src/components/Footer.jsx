// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='mt-10'>
      <nav>
        <div className='flex flex-col md:flex-row flex-wrap justify-around items-center p-4'>
          <h1 className='text-lg md:text-2xl font-bold text-center md:w-[400px]'>For better experience, download the app now</h1>
          <span className='flex flex-wrap justify-center md:justify-between items-center gap-5 mt-4 md:mt-0'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADMTEo4YEurEn-gXFBOfumKYAJMviq-T9ww&s" className='w-24 md:w-32' alt="Google Play" />
            <img src="https://static.vecteezy.com/system/resources/previews/024/170/865/original/badge-google-play-and-app-store-button-download-free-png.png" className='w-24 md:w-32' alt="App Store" />
          </span>
        </div>

        <div className='flex flex-col md:flex-row flex-wrap justify-around items-start mt-10 bg-[#02060C] text-white p-6 md:p-20'>
          <ul className='mb-6 md:mb-0'>
            <li>
              <h1 className='text-lg md:text-xl'>Food Delivery</h1>
              <p>© 2024 Naman Technologies Pvt. Ltd</p>
            </li>
          </ul>
          <ul className='mb-6 md:mb-0'>
            <li><h1 className='text-lg md:text-xl font-bold'>Company</h1></li>
            <li>About</li>
            <li>Team</li>
          </ul>
          <ul className='mb-6 md:mb-0'>
            <li><h1 className='text-lg md:text-xl font-bold'>Contact us</h1></li>
            <li>Help & Support</li>
          </ul>
          <ul className='mb-6 md:mb-0'>
            <li><h1 className='text-lg md:text-xl font-bold'>Legal</h1></li>
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
          <ul>
            <li><h1 className='text-lg md:text-xl font-bold'>We deliver to:</h1></li>
            <li>Yet Not Decided</li>
            <select name="option" className='text-black mt-2'>
              <option value="other">Other</option>
              <option value="uttarkashi">Uttarkashi</option>
            </select>
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
