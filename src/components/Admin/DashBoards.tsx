
  "use client"
import Link from 'next/link';
import LineChartComponet from './LineChart';
import { useEffect, useState } from 'react';
import { getAdminDashBoardData } from '@/service/getDataService';
import { toastError } from '@/utils/toast';



export default function DashBoard() {

  const [range,setRange]=useState("")
  const [chartData,setChartData]=useState()


  const params=new  URLSearchParams({range:range})
  useEffect(()=>{
    try{
     const get=async()=>{

        const response=await getAdminDashBoardData(params.toString())
        // console.log(response.data.userData);
        setChartData(response.data.userData)
      }
      get()
      }catch(error){
      toastError("Error fetching dahboard Data")
    }
  
  },[range])

  return (
    <>


      <div className="flex">

        {/* Main Content Area */}
        <div className="content-area">
          {/* Header */}
          <div className="flex justify-between iteuuuuuuuuums-center mb-8">
            <h1 className="text-2xl font-bold neon-text">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
              <select onClick={(e)=>setRange(e.target.value)} className="bg-black border border-gray-800 text-gray-300 px-4 py-2 rounded">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="1y">This Year</option>
              </select>
              <button className="px-4 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300">
                <i className="fas fa-download mr-2"></i>Export Report
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="stat-card neon-border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 mb-2">Total Users</div>
                  <div className="text-3xl font-bold text-white">5,427</div>
                  <div className="text-sm mt-2">
                    <span className="text-green-400"><i className="fas fa-arrow-up mr-1"></i>12.5%</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                <div className="text-[#0ef] text-2xl">
                  <i className="fas fa-users"></i>
                </div>
              </div>
            </div>

            {/* Premium Subscribers */}
            <div className="stat-card neon-border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 mb-2">Premium Users</div>
                  <div className="text-3xl font-bold text-white">1,248</div>
                  <div className="text-sm mt-2">
                    <span className="text-green-400"><i className="fas fa-arrow-up mr-1"></i>8.3%</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                <div className="text-amber-400 text-2xl">
                  <i className="fas fa-crown"></i>
                </div>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="stat-card neon-border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 mb-2">Monthly Revenue</div>
                  <div className="text-3xl font-bold text-white">$24,892</div>
                  <div className="text-sm mt-2">
                    <span className="text-green-400"><i className="fas fa-arrow-up mr-1"></i>15.2%</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                <div className="text-green-400 text-2xl">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>

            {/* Active Problems */}
            <div className="stat-card neon-border p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-400 mb-2">Total Problems</div>
                  <div className="text-3xl font-bold text-white">325</div>
                  <div className="text-sm mt-2">
                    <span className="text-green-400"><i className="fas fa-arrow-up mr-1"></i>5.2%</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                <div className="text-blue-400 text-2xl">
                  <i className="fas fa-code"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
              <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">Revenue Overview</div>
              </div>
              <div className="p-4 h-[300px] flex items-center justify-center">


                <div className="text-gray-500">Chart </div>
              </div>
            </div>

            {/* User Growth Chart */}
            <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
              <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">User Growth</div>
              </div>
              <div className="p-4 h-[300px] flex items-center justify-center">
                <LineChartComponet chartData={chartData}/>
                <div className="text-gray-500">Chart </div>
              </div>
            </div>
          </div>

          {/* Premium Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Premium Problems */}
            <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
              <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">Premium Problems</div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-gray-400">Total Premium Problems</div>
                  </div>
                  <div className="text-amber-400 text-xl">
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Easy</span>
                      <span className="text-green-400">32</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded">
                      <div className="h-full bg-green-500 rounded" style={{width: '37%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium</span>
                      <span className="text-yellow-400">41</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded">
                      <div className="h-full bg-yellow-500 rounded" style={{width: '47%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hard</span>
                      <span className="text-red-400">14</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded">
                      <div className="h-full bg-red-500 rounded" style={{width: '16%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plans */}
            <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
              <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">Active Subscriptions</div>
              </div>
              <div className="p-4">
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-gray-500">Chart will be rendered here</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-2 bg-black rounded border border-gray-800">
                    <div className="text-lg font-bold">842</div>
                    <div className="text-sm text-gray-400">Monthly Plan</div>
                  </div>
                  <div className="text-center p-2 bg-black rounded border border-gray-800">
                    <div className="text-lg font-bold">406</div>
                    <div className="text-sm text-gray-400">Annual Plan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
              <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">Recent Transactions</div>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 bg-black rounded border border-gray-800">
                    <div className="flex items-center">
                      <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full mr-3" alt="User" />
                      <div>
                        <div className="font-medium">Annual Plan</div>
                        <div className="text-xs text-gray-400">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="text-green-400">+$199.99</div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black rounded border border-gray-800">
                    <div className="flex items-center">
                      <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full mr-3" alt="User" />
                      <div>
                        <div className="font-medium">Monthly Plan</div>
                        <div className="text-xs text-gray-400">15 minutes ago</div>
                      </div>
                    </div>
                    <div className="text-green-400">+$19.99</div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-black rounded border border-gray-800">
                    <div className="flex items-center">
                      <img src="https://via.placeholder.com/32" className="w-8 h-8 rounded-full mr-3" alt="User" />
                      <div>
                        <div className="font-medium">Monthly Plan</div>
                        <div className="text-xs text-gray-400">32 minutes ago</div>
                      </div>
                    </div>
                    <div className="text-green-400">+$19.99</div>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link href="/admin/transactions" className="text-[#0ef] hover:underline text-sm">
                    View all transactions <i className="fas fa-arrow-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#111111] rounded-lg neon-border overflow-hidden">
            <div className="bg-black px-6 py-3 relative terminal-dots border-b border-[#0ef]">
              <div className="text-[#0ef] font-bold ml-20">Recent Activity</div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-black rounded border border-gray-800">
                  <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-green-400">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New Premium User</div>
                    <div className="text-sm text-gray-400">CyberNinja upgraded to premium membership</div>
                  </div>
                  <div className="text-sm text-gray-400">2 mins ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-black rounded border border-gray-800">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-blue-400">
                    <i className="fas fa-code"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New Problem Added</div>
                    <div className="text-sm text-gray-400">Admin added "Dynamic Programming Challenge"</div>
                  </div>
                  <div className="text-sm text-gray-400">15 mins ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-black rounded border border-gray-800">
                  <div className="w-8 h-8 bg-yellow-900 rounded-full flex items-center justify-center text-yellow-400">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Contest Completed</div>
                    <div className="text-sm text-gray-400">Weekly Challenge #42 ended with 86 participants</div>
                  </div>
                  <div className="text-sm text-gray-400">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}