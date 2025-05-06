import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom";
const Profile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate=useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    accountNumber: "",
    phone: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        accountNumber: user.accountNumber,
        phone: user.phone,
        email: user.email,
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUser({
        name: profile.name,
        phone: profile.phone,
        email: profile.email
      });
      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="fixed bg-white rounded-2xl shadow-xl overflow-hidden mt-[-10px]">
          <div className="w-[1000px] bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-blue-100 mt-1">{profile.accountNumber}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-8">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="accountNumber"
                        value={profile.accountNumber}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                        readOnly
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit mobile number"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-lg font-medium text-white transition duration-200 flex items-center ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Personal Information</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-blue-100">
                        <dt className="text-sm font-medium text-blue-600">Full Name</dt>
                        <dd className="text-sm font-medium text-gray-900">{profile.name}</dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-blue-100">
                        <dt className="text-sm font-medium text-blue-600">Account Number</dt>
                        <dd className="text-sm font-medium text-gray-900">{profile.accountNumber}</dd>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-blue-100">
                        <dt className="text-sm font-medium text-blue-600">Mobile Number</dt>
                        <dd className="text-sm font-medium text-gray-900">{profile.phone}</dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm font-medium text-blue-600">Email</dt>
                        <dd className="text-sm font-medium text-gray-900">{profile.email}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center justify-center">
                        <div className="bg-indigo-100 p-3 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span onClick={()=>navigate('/deposit')}className="text-sm font-medium text-gray-700">Transfer</span>
                      </button>
                      <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center justify-center">
                        <div className="bg-indigo-100 p-3 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Payments</span>
                      </button>
                      <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center justify-center">
                        <div className="bg-indigo-100 p-3 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Statements</span>
                      </button>
                      <button className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center justify-center">
                        <div className="bg-indigo-100 p-3 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Settings</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-200 flex items-center shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;