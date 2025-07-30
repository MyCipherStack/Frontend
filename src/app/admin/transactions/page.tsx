


"use client"

import { getAllTransactions } from "@/service/getDataService";
import React, { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import AdminNavbar from "@/components/Admin/NavBar";





const Transactions = () => {



  const [status, setStatus] = useState("")
  const [page, setPage] = useState("1")
  const [limit] = useState("10")
  const [totalTransaction, setTotalTransaction] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [transactions, setTransaction] = useState<{ userId: string, amount: string, paymentMethord: string, orderId: string, status: string }[]>([])
  const [trigger] = useState(false)



  useEffect(() => {

    const timeOut = setTimeout(() => {  //Debounce

      const params = new URLSearchParams({ page, status })
      const fetchData = async () => {
        const response = await getAllTransactions(params.toString());
        setTotalPages(response.data.transactions.totalPages,)
        setTotalTransaction(response.data.transactions.totalTransaction)
        setTransaction(response.data.transactions.transaction)

      };

      fetchData();

    }, 500)

    return () => clearTimeout(timeOut)

  }, [page, status, trigger])

  const pageChange = (page: number) => {
    setPage(page + "")
  }



  return (
    <div className="flex  "
    >

      <AdminNavbar status={"transactions"}></AdminNavbar>

      {/* Main Content Area */}
      <div className="content-area ml-64 p-8 w-full">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold neon-text">Transactions</h1>

        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card-bg rounded-lg neon-border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="search-input px-4 py-2 rounded-md bg-opacity-50 bg-black border border-opacity-20 border-neon-blue text-text-primary focus:border-neon-blue focus:shadow-neon-blue focus:outline-none">
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">failed</option>
              <option value="pending">pending</option>
            </select>

          </div>
        </div>



        {/* Transaction Table */}
        <div className="bg-card-bg rounded-lg neon-border overflow-hidden mb-8">
          <div className="bg-black px-6 py-3 relative border-b border-neon-blue">
            <div className="flex items-center">
              <span className="text-neon-blue mr-2">● ● ●</span>
              <div className="text-neon-blue font-bold">Transaction ({totalTransaction})</div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">userId</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Amount</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">PaymentMethord</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">OrderId</th>
                  <th className="text-left py-3 px-4 text-neon-blue bg-opacity-50 bg-black">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-opacity-5 hover:bg-neon-blue border-b border-opacity-10 border-neon-blue">

                    <td className="py-3 px-4">{transaction.userId}</td>
                    <td className="py-3 px-4">{transaction.amount}</td>
                    <td className="py-3 px-4">{transaction.paymentMethord}</td>
                    <td className="py-3 px-4">{transaction.orderId}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 ${transaction.status == "success" ? "text-green-500" : "text-red-500"} text-xs rounded`}>{transaction.status}</span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}

          <Pagination currentPage={+page} limit={+limit} onPageChange={pageChange} totalData={totalTransaction} totalPages={totalPages}></Pagination>

        </div>
      </div>
    </div>
  );
};

export default Transactions;