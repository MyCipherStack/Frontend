"use client"

import { getAllProblems } from "@/service/getDataService";
import React, { useEffect, useState } from "react";
import { FaSearch, FaCheckCircle, FaCircle } from "react-icons/fa";
import { Pagination } from "../Pagination";




const ProblemTable = ({ openProblem }:{ openProblem: (title:string,id:string) => void }) => {






  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState("1")
  const [limit, setLimit] = useState("10")
  const [totalProblem, setTotalProblem] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [Problem, setProblem] = useState([{ _id: "", title: "", tags: "", difficulty: "", status: "", category: "",userStatus:"",
   acceptance:{submitted:1,accepted:1}
   }])




useEffect(() => {

  const params = new URLSearchParams({ page, limit, difficulty, status, search, category });

  const fetchData = async () => {
    const response = await getAllProblems(params.toString());
    const { totalPages, totalProblems, problems } = response.data.problemData;

    setTotalPages(totalPages);
    setTotalProblem(totalProblems);
    setProblem(problems);
  };


  if (page === "1" && !search && !difficulty && !status && !category) {
    fetchData();
    return; // skip debounce
  }

  
  const timeout = setTimeout(fetchData, 500);
  return () => clearTimeout(timeout);

}, [page, difficulty, status, search, category]);

  const pageChange = (page: number) => {
    setPage(page + "")
  }

  // const openProblem=async(name:string)=>{  

  //   router.push(`/problemDetails/${name}`)

  // // const problemData=await getDataService("/p")



  // }





  return (
    <div className="flex">

      {/* Main Content Area */}
      <div className="p-8 w-full">


        {/* Search and Filter Bar */}
        <div className="bg-card-bg rounded-lg neon-border p-4 mb-8 text-xs">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Problem..."
                className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">Any Status</option>
              <option value="solved">Solved</option>
              <option value="attempted">Attempted</option>
              <option value="unsolved">Unsolved</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Categories</option>

              <optgroup label="📦 Data Structures">
                <option value="Array">Array</option>
                <option value="String">String</option>
                <option value="Hash Table">Hash Table</option>
                <option value="Linked List">Linked List</option>
                <option value="Stack">Stack</option>
                <option value="Queue">Queue</option>
                <option value="Heap (Priority Queue)">Heap (Priority Queue)</option>
                <option value="Tree">Tree</option>
                <option value="Binary Tree">Binary Tree</option>
                <option value="Binary Search Tree">Binary Search Tree</option>
                <option value="Trie">Trie</option>
                <option value="Graph">Graph</option>
                <option value="Matrix">Matrix</option>
                <option value="Set">Set</option>
              </optgroup>

              <optgroup label="⚙️ Algorithms">
                <option value="Two Pointers">Two Pointers</option>
                <option value="Sliding Window">Sliding Window</option>
                <option value="Binary Search">Binary Search</option>
                <option value="Depth-First Search (DFS)">Depth-First Search (DFS)</option>
                <option value="Breadth-First Search (BFS)">Breadth-First Search (BFS)</option>
                <option value="Backtracking">Backtracking</option>
                <option value="Recursion">Recursion</option>
                <option value="Greedy">Greedy</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Divide and Conquer">Divide and Conquer</option>
                <option value="Topological Sort">Topological Sort</option>
                <option value="Bit Manipulation">Bit Manipulation</option>
                <option value="Union Find">Union Find</option>
                <option value="Counting">Counting</option>
                <option value="Brute Force">Brute Force</option>
              </optgroup>

              <optgroup label="🧩 Problem Patterns">
                <option value="Sorting">Sorting</option>
                <option value="Searching">Searching</option>
                <option value="Memoization">Memoization</option>
                <option value="Math">Math</option>
                <option value="Simulation">Simulation</option>
                <option value="String Matching">String Matching</option>
                <option value="Geometry">Geometry</option>
                <option value="Prefix Sum">Prefix Sum</option>
                <option value="Suffix Array">Suffix Array</option>
                <option value="Monotonic Stack">Monotonic Stack</option>
              </optgroup>

              <optgroup label="🛠️ Advanced / Design">
                <option value="Design">Design</option>
                <option value="LRU Cache">LRU Cache</option>
                <option value="Segment Tree">Segment Tree</option>
                <option value="Fenwick Tree (Binary Indexed Tree)">Fenwick Tree (Binary Indexed Tree)</option>
                <option value="Top K">Top K</option>
                <option value="Randomized">Randomized</option>
                <option value="Concurrency">Concurrency</option>
                <option value="Iterator">Iterator</option>
              </optgroup>
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
              <thead >
                <tr>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">status</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">No</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Title</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Difficulty</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Acceptance</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Tags</th>
                
                </tr>
              </thead>
              <tbody>
                {Problem.map((problem,index) => (
                  <tr key={problem._id} onClick={() => openProblem(problem.title, problem._id)} className="hover:bg-opacity-5 hover:bg-neon-blue border-b border-opacity-10 border-neon-blue text-sm cursor-pointer">
                    <td className="py-3 px-4 ">
                      {problem.userStatus=="solved" ?  <FaCheckCircle className="text-green-500 w-7 h-4"  /> :<FaCircle className="text-gray-500 w-7 h-3" />}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {/* <img src={problem.image} className="w-8 h-8 rounded-full" alt="problem" /> */}
                        <div>
                          <div className="text-xs text-gray-400">{index+1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{problem.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 ${problem.difficulty == "easy" ? "text-yellow-500" : "text-red-500"} text-xs rounded`}>{problem.difficulty}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1  text-xs rounded`}>{Math.round((problem.acceptance.accepted/problem.acceptance.submitted)*100)}%</span>
                    </td>
                    <td className="py-3 px-4">{problem.tags}</td>
      
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

export default React.memo(ProblemTable)