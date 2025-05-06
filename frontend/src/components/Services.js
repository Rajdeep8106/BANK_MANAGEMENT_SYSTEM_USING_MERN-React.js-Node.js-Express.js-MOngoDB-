import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Services = () => {
  const [services, setServices] = useState([
    { 
      id: 1, 
      name: 'Open an Account', 
      description: 'Start your financial journey with our premium banking solutions', 
      path: '/register',
      icon: '🏦',
      gradient: 'from-blue-600 to-blue-800'
    },
    { 
      id: 2, 
      name: 'Check Balance', 
      description: 'Real-time access to your account balances anytime, anywhere', 
      path: '/signin',
      icon: '💰',
      gradient: 'from-emerald-600 to-emerald-800'
    },
    { 
      id: 3, 
      name: 'Statement History', 
      description: 'Download or view your monthly statements with detailed breakdowns', 
      path: '/signin',
      icon: '📊',
      gradient: 'from-violet-600 to-violet-800'
    },
    { 
      id: 4, 
      name: 'Transaction History', 
      description: 'Comprehensive view of all your transactions with smart filters', 
      path: '/signin',
      icon: '📝',
      gradient: 'from-indigo-600 to-indigo-800'
    },
    { 
      id: 5, 
      name: 'Fund Transfer', 
      description: 'Instant transfers between accounts or to other beneficiaries', 
      path: '/signin',
      icon: '↔️',
      gradient: 'from-teal-600 to-teal-800'
    },
    { 
      id: 6, 
      name: 'Bill Payments', 
      description: 'Pay utilities, credit cards, and other bills seamlessly', 
      path: '/signin',
      icon: '🧾',
      gradient: 'from-amber-600 to-amber-800'
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchServices = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-100">Loading banking services...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Banking</span> Services
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
            Secure, convenient, and designed for your financial needs
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link
                to={service.path}
                className="block h-full"
              >
                <div className="h-full bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl border border-gray-700">
                  <div className={`h-3 bg-gradient-to-r ${service.gradient}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{service.icon}</span>
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span>Access Service</span>
                      <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default Services;