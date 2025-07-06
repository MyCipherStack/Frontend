"use client"

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Premium from '@/components/Premium';
import { useRouter } from 'next/navigation'; 
 
import { FaCode, FaUsers, FaDatabase, FaProjectDiagram, FaMicrochip, FaCheckCircle, FaHeart } from 'react-icons/fa';
export default function Home() {
  let router=useRouter()

  return (
    
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 f">
      
      <Header></Header>



      {/* Hero Section */}
      <section className="pt-32 pb-20 relative ">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 glitch-text">
                &lt;Code. Solve. <span className="text-[#0ef]">Conquer</span>.&gt;
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Master algorithms, ace technical interviews, and join a community of coders solving the world's toughest programming challenges.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={()=>router.push("/problems")} className="px-6 py-3 rounded bg-[#0ef] text-black font-bold hover:bg-[#0df] transition duration-300">
                  Start Coding
                </button>
                <button className="px-6 py-3 rounded border border-gray-600 text-gray-300 hover:border-[#0ef] hover:text-[#0ef] transition duration-300">
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-6">
                {[
                  { number: '2500+', label: 'Challenges' },
                  { number: '1.2M+', label: 'Coders' },
                  { number: '250+', label: 'Companies' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#0ef]">{stat.number}</span>
                    <span className="text-gray-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Galaxy Section */}
            <div className="md:w-1/2 pl-0 md:pl-10">
              <div className="bg-black rounded-lg border border-[#0ef] shadow-[0_0_10px_rgba(0,238,255,0.5)] overflow-hidden">
                <div className="bg-black px-6 py-3 border-b border-[#0ef] flex items-center">
                  <div className="flex space-x-2 mr-4 text-[#0ef]">
                    <span>● ● ●</span>
                  </div>
                  <span className="text-[#0ef] font-bold">Coding Universe</span>
                </div>
                <div className="p-6 bg-[#070707] h-80 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <div className="text-2xl text-[#0ef]">Interactive Galaxy</div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center text-xs bg-black bg-opacity-70 p-2 rounded border border-gray-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-400">8,472 users online</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {['Top 15%', '48/2500', 'Medium'].map((stat, idx) => (
                    <div key={idx} className="bg-black p-3 rounded text-center border border-gray-800 hover:border-[#0ef] transition-all cursor-pointer">
                      <div className="text-xs text-gray-500">{idx === 0 ? 'Your Rank' : idx === 1 ? 'Problems Solved' : 'Next Challenge'}</div>
                      <div className="text-[#0ef] font-bold">{stat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Featured Categories */}
      <section className="py-16 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Problem Categories</h2>
            <button onClick={()=>router.push("/problems")}  className="text-[#0ef] cursor-pointer hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaDatabase, title: 'Data Structures', problems: '320+', solved: '45K' },
              { icon: FaCode, title: 'Algorithms', problems: '410+', solved: '62K' },
              { icon: FaProjectDiagram, title: 'Dynamic Programming', problems: '180+', solved: '28K' },
              { icon: FaMicrochip, title: 'System Design', problems: '90+', solved: '15K' },
            ].map((category, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg p-6 border border-gray-800 hover:border-[#0ef] transition-all duration-300">
                <category.icon className="text-3xl mb-4 text-[#0ef]" />
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-400 mb-4">Master core concepts and advanced techniques</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{category.problems} problems</span>
                  <span className="text-[#0ef]">
                    <FaUsers className="inline mr-1" /> {category.solved} solved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Featured Problems</h2>
            <button  onClick={()=>router.push("/problems")}  className="text-[#0ef] cursor-pointer hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { difficulty: 'Easy', title: 'Two Sum', success: '89%', submissions: '2.4M' },
              { difficulty: 'Medium', title: 'Maximum Subarray', success: '74%', submissions: '1.8M' },
              { difficulty: 'Hard', title: 'Median of Two Arrays', success: '32%', submissions: '975K' },
            ].map((problem, idx) => (
              <div key={idx} className="bg-[#111] rounded-lg border border-gray-800 hover:border-[#0ef] transition-all duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded text-xs border ${
                      problem.difficulty === 'Easy' ? 'border-green-500 text-green-500' :
                      problem.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                      'border-red-500 text-red-500'
                    }`}>{problem.difficulty}</span>
                    <FaHeart className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                  <p className="text-gray-400 mb-4">Problem description placeholder text</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      <FaCheckCircle className="inline mr-1 text-green-500" /> {problem.success} Success
                    </span>
                    <span className="text-gray-500">
                      <FaCode className="inline mr-1 text-[#0ef]" /> {problem.submissions}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-3 bg-black border-t border-gray-800 flex justify-between">
                  <div className="flex space-x-2">
                    <span className="px-2 py-1 rounded-md bg-gray-800 text-xs text-gray-400">array</span>
                    <span className="px-2 py-1 rounded-md bg-gray-800 text-xs text-gray-400">hash-table</span>
                  </div>
                  <button className="text-[#0ef] hover:underline">Solve →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>  


           <Premium></Premium>
           <Footer></Footer>
           
    </div>
  );
}




