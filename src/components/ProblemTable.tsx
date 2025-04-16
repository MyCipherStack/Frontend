"use client"

import { getDataService } from "@/service/getDataService";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {FaUserPlus, FaSearch, FaFilter, FaEdit, FaBan, FaKey, FaCheck, FaChevronLeft, FaEllipsisH, FaCircleNotch, FaCheckCircle } from "react-icons/fa";
import { actionServiceUpdate } from "@/service/actionServiceUpdate";
import Swal from 'sweetalert2';
import { Pagination } from "./Pagination";

const ProblemTable = () => {
const [search,setSearch]=useState("")
const [difficulty,setDifficulty]=useState("")
const [status,setStatus]=useState("")
const [category,setCategory]=useState("")
const [page,setPage]=useState("1")
const [limit,setLimit]=useState("10")
const [totalProblem,setTotalProblem]=useState(0)
const [totalPages,setTotalPages]=useState(0)
const [Problem,setProblem]=useState([{_id:"",title:"",tags:"",difficulty:"",status:"",category:""}])
const [trigger,setTrigger]=useState(false)



  useEffect(()=>{
    const params=new URLSearchParams({page,limit,difficulty,status,search,category})
    const fetchData = async () => {
    const response = await getDataService(`/api/user/problems?${params.toString()}`);
     setTotalPages(response.data.problemData.totalPages,)
     setTotalProblem(response.data.problemData.totalProblems)
     console.log(response.data.problemData.problems);
     
     setProblem(response.data.problemData.problems)
     
    };
  
  fetchData();
  },[page,difficulty,status,search,trigger,category])

  let pageChange=(page:number)=>{
    setPage(page+"")
  }
  
  const actionHandler=async(id:string,status:string)=>{  
    if(status=="active"){
      status="banned"
    }else status="active"
    console.log(status);
    
    
    
    const result = await Swal.fire({
  title: 'Are you sure?',
  text: `Are you sure you want to change the status to ${status}?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, change it!',
  cancelButtonText: 'No, keep it',
  background: '#000', // black background
  color: '#00f0ff',
  buttonsStyling: false,
  customClass: {
    popup: 'bg-black text-cyan-500', // Black background for the popup with cyan text
    title: 'text-white', // White title text
    confirmButton: ' hover:bg-neon-purple-dark text-white font-semibold px-5 py-2 rounded-lg', // Neon purple button
    cancelButton: 'bg-neon-red hover:bg-neon-red-dark text-white font-semibold px-5 py-2 rounded-lg' // Neon red cancel button
  }
  
});

if(result.isConfirmed){
  
  
  const data= await actionServiceUpdate(`/api/admin/Problem/${id}`,{status})
  console.log(data);
  setTrigger(!trigger)
  }
    
  }

  return (
    <div className="flex">

      {/* Main Content Area */}
      <div className="p-8 w-full">
      

        {/* Search and Filter Bar */}
        <div className="bg-card-bg rounded-lg neon-border p-4 mb-8 text-xs">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search Problem..."
                className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
            <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select  value={status} onChange={(e)=>setStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">Any Status</option>
              <option value="active">Solved</option>
              <option value="inactive">Attempted</option>
              <option value="banned">Unsolved</option>
            </select>
            <select  value={category} onChange={(e)=>setCategory(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Categories</option>
              <option value="arrray">Array</option>
              <option value="dynamic">Dynamic Programming</option>
              <option value="tree">Trees</option>
              <option value="graph">Graph</option>
            </select>
       
          </div>
        </div>

        

        {/* Problem Table */}
        <div className="bg-card-bg rounded-lg neon-border overflow-hidden mb-8">
          <div className="bg-black px-6 py-3 relative border-b border-neon-blue">
            <div className="flex items-center">
              <span className="text-neon-blue mr-2">● ● ●</span>
              <div className="text-neon-blue font-bold">Problems ({totalProblem})</div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th>status</th>
                  <th>No</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Title</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Difficaulty</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Acceptance</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Tags</th>
                  {/* <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Joined Date</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {Problem.map((problem) => (
                  <tr key={problem._id} className="hover:bg-opacity-5 hover:bg-neon-blue border-b border-opacity-10 border-neon-blue">
                    <td className="py-3 px-4 ">
                      <FaCheckCircle />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {/* <img src={problem.image} className="w-8 h-8 rounded-full" alt="problem" /> */}
                        <div>
                          <div className="text-xs text-gray-400">#{1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{problem.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 ${problem.difficulty=="easy" ? "text-yellow-500" :"text-red-500"} text-xs rounded`}>{problem.difficulty}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1  text-xs rounded`}>{problem.status}</span>
                    </td>
                    <td className="py-3 px-4">{problem.tags}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                       
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}

          <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalProblem} totalPages={totalPages}></Pagination>

        </div>
      </div>
    </div>
  );
};

export default ProblemTable;