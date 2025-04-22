"use client"

import { useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaCode, FaHistory, FaBook } from 'react-icons/fa';
  // Sample submission data
  const submissions = [
    {
      id: 1,
      date: '2023-05-15',
      language: 'Python',
      runtime: '45 ms',
      memory: '14.2 MB',
      status: 'Accepted',
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return []`
    },
    {
      id: 2,
      date: '2023-05-14',
      language: 'Python',
      runtime: '52 ms',
      memory: '14.3 MB',
      status: 'Time Limit Exceeded',
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []`
    }
  ];

const Submissions = () => {
  // Sample solutions data
  

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative">
      <div className="container   pb-8 flex-grow text-sm">
        {/* Tab Navigation */}
 

        {/* Submissions Tab */}
          <div className="bg-card-bg rounded-lg neon-border p-4">
            <h2 className="text-xl font-bold mb-4 neon-text">Your Submissions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Language</th>
                    <th className="px-4 py-2 text-left">Runtime</th>
                    <th className="px-4 py-2 text-left">Memory</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-4 py-2">{submission.date}</td>
                      <td className="px-4 py-2">{submission.language}</td>
                      <td className="px-4 py-2">{submission.runtime}</td>
                      <td className="px-4 py-2">{submission.memory}</td>
                      <td className="px-4 py-2">
                        {submission.status === 'Accepted' ? (
                          <span className="text-green-400 flex items-center">
                            <FaCheckCircle className="mr-1" /> {submission.status}
                          </span>
                        ) : (
                          <span className="text-red-400 flex items-center">
                            <FaExclamationCircle className="mr-1" /> {submission.status}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-neon-blue hover:underline">
                          <FaCode /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>



      </div>
    </div>
  );
};

export default Submissions;