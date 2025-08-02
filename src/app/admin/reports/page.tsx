
"use client"

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { confirmationAlert } from "@/utils/confirmationAlert";
import { getAllReports, updateReports } from "@/service/reportServices";
import { Pagination } from "@/components/Pagination";
import AdminNavbar from "@/components/Admin/NavBar";


const UserManagement = () => {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("")
  const [page, setPage] = useState("1")
  const [totalReports, setTotalReports] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [reports, setReports] = useState([{
    status: "",
    descriptions: "", pageInfo: "", reportType: "", submittedUser:{name:"",role:""}, role: "", id: "",
    createdAt: "", reportedUserDetails:{name:"",id:""}, description: "",
    updatedAt: ""
  }])
  const [trigger, setTrigger] = useState(false)

  const limit = "10"

  useEffect(() => {

    const timeOut = setTimeout(() => {  //Debounce

      const params = new URLSearchParams({ page, role, status, search })
      const fetchData = async () => {
        const response = await getAllReports(params.toString());
        setTotalPages(response.data.reportsData.totalPages,)
        setTotalReports(response.data.reportsData.totalReports)
        console.log(response.data.reportsData.reports);

        setReports(response.data.reportsData.reports)

      };

      fetchData();

    }, 500)

    return () => clearTimeout(timeOut)

  }, [page, role, status, search, trigger])

  const pageChange = (page: number) => {
    setPage(page + "")
  }

  const actionHandler = async (id: string, status: string) => {


    const alert = await confirmationAlert(`change the status to ${status}`)

    if (alert) {

      const data = await updateReports({ id, status })
      console.log(data);
      setTrigger(!trigger)
    }

  }

  return (
    <div className="flex  ">
      <AdminNavbar status={"reports"} />
      {/* Main Content Area */}
      <div className="content-area ml-64 p-8 w-full">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold neon-text">Reports</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card-bg rounded-lg neon-border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pageinfo or description"
                className="search-input w-full px-4 py-2 pl-10 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Roles</option>
              <option value="regular">Regular User</option>
              <option value="premium">Premium User</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Status</option>
              <option value="pending">pending</option>
              <option value="in_progress">in_progress</option>
              <option value="solved">solved</option>
              <option value="rejected">rejected</option>
            </select>

          </div>
        </div>



        {/* reports Table */}
        <div className="bg-card-bg rounded-lg neon-border overflow-hidden mb-8">
          <div className="bg-black px-6 py-3 relative border-b border-neon-blue">
            <div className="flex items-center">
              <span className="text-neon-blue mr-2">● ● ●</span>
              <div className="text-neon-blue font-bold">reports ({totalReports})</div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">submitted User</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">type</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black"> reported user </th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Description</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Page info</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Issued Date</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">updatedDate</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.
                  filter((report) => {
                    return role == "" ? report :
                      role !== "" && role === report.submittedUser.role
                  })
                  .map((report, index) => (

                    <tr key={index} className="hover:bg-opacity-5 hover:bg-neon-blue border-b border-opacity-10 border-neon-blue">

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div>{report.submittedUser.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{report.reportType}
                      </td>
                      <td className="py-3 px-4">
                        {report.reportType === "user" ? `${report.reportedUserDetails.name}` : ""}
                      </td>
                      <td className="py-3 px-4">{report.description}</td>
                      <td className="py-3 px-4">
                        <span className={'px-2 py-1 text-red-500 text-xs rounded'}>{report.pageInfo}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1  text-xs rounded`}>{new Date(report.updatedAt).toDateString()}</span>
                      </td>
                      <td className="py-3 px-4">{new Date(report.createdAt).toDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {/* <button className="p-1 text-gray-400 hover:text-neon-blue" title="Edit">
                          <FaEdit />
                        </button> */}

                          <select value={report.status} onChange={(e) => actionHandler(report.id, e.target.value)} className="search-input px- py-1 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">

                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="solved">solved</option>
                            <option value="rejected">rejected</option>
                          </select>


                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}

          <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalReports} totalPages={totalPages}></Pagination>

        </div>
      </div>
    </div>
  );
};

export default UserManagement;