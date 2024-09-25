import React from 'react';
import { FaBell } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
    
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-10 ">
      {/* Left side: Logo and Home */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-white bg-red-500 rounded-full px-1">P</div>
        <div className="hidden md:flex space-x-4">
          <Link to={'/'} className="text-white rounded-full px-2 font-bold bg-black">Home</Link>
          <Link to={'/'} className="text-gray-600 hover:text-black font-bold">Explore</Link>
          <Link to={'/'} className="text-gray-600 hover:text-black font-bold">Create</Link>
        </div>
      </div>
      
      {/* Middle: Search Bar */}
      <div className="flex-grow max-w-xs mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-full focus:outline-none"
        />
      </div>
      
      {/* Right side: Icons */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 hover:text-black">
          <FaBell size={20}/>
        </span>
        <span className="text-gray-600 hover:text-black">
    <FaRegCommentDots size={20}/>
        </span>
        <span className="text-gray-600 hover:text-black">
         <FaRegUserCircle size={20}/>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
