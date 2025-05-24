

import React from 'react'


const solutions = [
    {
      id: 1,
      title: 'Hash Map Solution',
      approach: 'Uses a hash map to store seen numbers and their indices',
      complexity: 'Time: O(n), Space: O(n)',
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return []`,
      upvotes: 1245,
      isOfficial: true
    },
    {
      id: 2,
      title: 'Two Pointer Solution',
      approach: 'Sorts the array first and uses two pointers',
      complexity: 'Time: O(n log n), Space: O(n)',
      code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        sorted_nums = sorted(zip(nums, range(len(nums))))
        left, right = 0, len(nums) - 1
        while left < right:
            current_sum = sorted_nums[left][0] + sorted_nums[right][0]
            if current_sum == target:
                return [sorted_nums[left][1], sorted_nums[right][1]]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        return []`,
      upvotes: 876,
      isOfficial: false
    }
  ];
const Solutions = () => {
  return (
    <div className=" w-full bg-card-bg rounded-lg neon-border p-4">
            <h2 className="text-xl font-bold mb-4 neon-text">Solutions</h2>
            <div className="space-y-4">
              {solutions.map((solution) => (
                <div key={solution.id} className="border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {solution.title} {solution.isOfficial && (
                          <span className="ml-2 text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                            Official Solution
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-300 mt-1">{solution.approach}</p>
                      <p className="text-gray-400 text-sm mt-1">{solution.complexity}</p>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <span className="mr-1">{solution.upvotes}</span>
                      <span>★</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-black p-3 rounded overflow-x-auto">
                    <pre className="text-green-400 text-sm">{solution.code}</pre>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="text-neon-blue hover:underline mr-3">
                      Copy Code
                    </button>
                    <button className="text-neon-blue hover:underline">
                      Show Explanation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        
  )
}

export default Solutions