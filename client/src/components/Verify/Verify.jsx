// import React from 'react'

import { Link } from "react-router-dom";
import AuthImage from "../AuthImage/AuthImage";
import { ArrowLeft } from "lucide-react";

export default function Verify() {
  return (
  
        <div className="flex flex-col md:flex-row h-screen bg-blue-50">
      {/* <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <img
          src={signupimage}
          alt="Shopping concept"
          className="max-w-full h-auto"
        />
      </div> */}
      <AuthImage />
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link className="flex items-center gap-2 py-3 text-red-500" to="/">
            <ArrowLeft />
            Back to home
          </Link>
      
          <h2 className="text-2xl font-bold mb-6">Verify Account</h2>
          <p className="mb-2 text-gray-600">Enter email or mobile</p>

          <form>
            <div className="mb-4 relative">
              <input
                type="email"
                name="email"
                placeholder="Email or mobile"
                className="w-full px-3 py-2 border rounded-md" 
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    
  )
}
