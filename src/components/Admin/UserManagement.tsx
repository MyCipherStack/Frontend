"use client"

import { getAllUsers } from "@/service/getDataService";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {FaUserPlus, FaSearch, FaFilter, FaEdit, FaBan, FaKey, FaCheck, FaChevronLeft, FaEllipsisH } from "react-icons/fa";
import { Pagination } from "../Pagination";
import { usersDataUpdate } from "@/service/postUpdateService";
import Swal from 'sweetalert2';
import { confirmationAlert } from "@/utils/confirmationAlert";

const UserManagement = () => {
const [search,setSearch]=useState("")
const [role,setRole]=useState("")
const [status,setStatus]=useState("")
const [page,setPage]=useState("1")
const [limit,setLimit]=useState("10")
const [totalUsers,setTotalUsers]=useState(0)
const [totalPages,setTotalPages]=useState(0)
const [users,setUsers]=useState([{_id:"",image:"",name:"",email:"",role:"",status:"",createdAt:""}])
const [trigger,setTrigger]=useState(false)



  useEffect(()=>{
    const params=new URLSearchParams({page, role,status,search})
    const fetchData = async () => {
    const response = await getAllUsers(params.toString());
     setTotalPages(response.data.usersData.totalPages,)
     setTotalUsers(response.data.usersData.totalUsers)
     setUsers(response.data.usersData.users)
     
    };
  
  fetchData();
  },[page,role,status,search,trigger])

  let pageChange=(page:number)=>{
    setPage(page+"")
  }
  
  const actionHandler=async(email:string,status:string)=>{  
    if(status=="active"){
      status="banned"
    }else status="active"
    console.log(status);
    
    const alert=await confirmationAlert(`change the status to Active${status}`)
   

if(alert){
  
  const data= await usersDataUpdate(`/api/admin/users/${email}`,{status})
  console.log(data);
  setTrigger(!trigger)
  }
    
  }

  return (
    <div className="flex  ">

      {/* Main Content Area */}
      <div className="content-area ml-64 p-8 w-full">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold neon-text">User Management</h1>
          {/* <button className="px-4 py-2 bg-neon-blue text-black rounded  bg-[#0df] transition duration-300 flex items-center">
            <FaUserPlus className="mr-2" /> Add New User
          </button> */}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card-bg rounded-lg neon-border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search users..."
                className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Roles</option>
              <option value="regular">Regular User</option>
              <option value="premium">Premium User</option>
            </select>
            <select  value={status} onChange={(e)=>setStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>
       
          </div>
        </div>

        

        {/* Users Table */}
        <div className="bg-card-bg rounded-lg neon-border overflow-hidden mb-8">
          <div className="bg-black px-6 py-3 relative border-b border-neon-blue">
            <div className="flex items-center">
              <span className="text-neon-blue mr-2">● ● ●</span>
              <div className="text-neon-blue font-bold">Users ({totalUsers})</div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" className="rounded bg-black border-gray-700 text-neon-blue focus:ring-neon-blue" />
                  </th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">User</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Email</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Role</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Status</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Joined Date</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-opacity-5 hover:bg-neon-blue border-b border-opacity-10 border-neon-blue">
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded bg-black border-gray-700 text-neon-blue focus:ring-neon-blue" />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img src={user.image} className="w-8 h-8 rounded-full" alt="User" />
                        <div>
                          <div>{user?.name}</div>
                          <div className="text-xs text-gray-400">#{user._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 ${user.role=="regular" ? "text-yellow-500" :"text-red-500"} text-xs rounded`}>{user.role}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1  text-xs rounded`}>{user.status}</span>
                    </td>
                    <td className="py-3 px-4">{new Date(user.createdAt).toDateString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {/* <button className="p-1 text-gray-400 hover:text-neon-blue" title="Edit">
                          <FaEdit />
                        </button> */}
                        <button>  {user.status === "banned" ? "Unban" : "ban"}</button>
                        <button className="p-1 text-gray-400 hover:text-red-500" onClick={()=>actionHandler(user.email,user.status)} title={user.status === "Banned" ? "Unban" : "Ban"}>
                          {user.status === "banned" ? <FaCheck /> : <FaBan />}
                        </button>
                        {/* <button className="p-1 text-gray-400 hover:text-yellow-500"  title="Reset Password">
                          <FaKey />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}

          <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalUsers} totalPages={totalPages}></Pagination>

        </div>
      </div>
    </div>
  );
};

export default UserManagement;