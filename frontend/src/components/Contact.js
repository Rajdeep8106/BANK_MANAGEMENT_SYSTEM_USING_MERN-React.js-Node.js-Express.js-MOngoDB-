import React from 'react';
import { FaUniversity, FaBars, FaMapMarkerAlt, FaCreditCard, FaHandHoldingUsd, FaChartLine, FaShieldAlt, FaPhoneAlt, FaExclamationTriangle } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-50">
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">PremierBank</h4>
              <p className="text-gray-400">Trusted banking services since 1985. Your financial security is our top priority.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Online Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Mobile App</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Rates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Disclosures</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-blue-400 p-2 rounded-full transition">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition">
                  <FaInstagram />
                </a>
                <a href="#" className="bg-gray-700 hover:bg-blue-700 p-2 rounded-full transition">
                  <FaLinkedinIn />
                </a>
              </div>
              <p className="text-gray-400">Contact Us</p>
              <p className="text-gray-400">jujarurajdeep@gmail.com</p>
              <p>91+9701908744</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 PremierBank. All rights reserved. Member FDIC. Equal Housing Lender.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;