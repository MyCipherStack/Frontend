
"use client"


import { useState } from 'react';
import Header from '@/components/Header';

const InterviewPortal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    interviewType: '',
    date: '',
    time: '',
    duration: '30',
    notes: '',
    isInvite:true,
  });



  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [sessionType, setSessionType] = useState<'invite' | 'sharecode'>('invite');
  



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  const schedule = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await scheduleInterview({formData,sessionType,invitedUsers})
      if(response?.status){
        toastSuccess("Interview Scheduled")
        setIsModalOpen(false)
      }
      console.log(response);

    } catch (error) {
      console.log(error);

    }

  }

 

  return (
    <>
      <Header />

      <div className="min-h-screen " style={{
        backgroundColor: '#000000',
        backgroundImage: `
          linear-gradient(45deg, rgba(0, 243, 255, 0.1) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(0, 243, 255, 0.1) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(0, 243, 255, 0.1) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(0, 243, 255, 0.1) 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}>

        
        {/* Create Interview Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="rounded-xl p-8 max-w-2xl w-full relative mx-4 max-h-[90vh] overflow-auto "
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 243, 255, 0.1)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" >
                  Schedule New Interview
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-[#00f3ff]"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Position</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff]"
                    >
                      <option value="">Select Position</option>
                      <option value="senior-dev">Senior Developer</option>
                      <option value="frontend-dev">Frontend Developer</option>
                      <option value="backend-dev">Backend Developer</option>
                      <option value="fullstack-dev">Full Stack Developer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Interview Type</label>
                    <select
                      name="interviewType"
                      value={formData.interviewType}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff]"
                    >
                      <option value="">Select Type</option>
                      <option value="technical">Technical Interview</option>
                      <option value="coding">Coding Challenge</option>
                      <option value="system-design">System Design</option>
                      <option value="behavioral">Behavioral Interview</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Duration (minutes)</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff]"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <InvitedUsers allowedUser={1} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} sessionType={sessionType} setSessionType={setSessionType} />
                <div>
                  <label className="block text-gray-300 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-[#00f3ff] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-[#00f3ff] h-24"
                    placeholder="Add any specific requirements or notes..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 rounded-lg text-[#00f3ff] hover:bg-[#00f3ff] hover:text-gray-900 transition-all"
                    style={{ border: '1px solid #00f3ff', boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={schedule}
                    className="px-6 py-2 bg-[#00f3ff] text-gray-900 rounded-lg font-bold hover:bg-[#00d4e0] transition-all"
                  >
                    Schedule Interview
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#00f3ff] text-gray-900 rounded-lg font-bold hover:bg-[#00d4e0] transition-all"
            >
              <i className="fas fa-plus mr-2"></i> Create Interview
            </button>

          </div>
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" >
              Welcome to Your Interview
            </h1>
            <p className="text-gray-400 text-lg">Get ready to showcase your skills in a secure, professional environment</p>
          </div>
          <ScheduledInterviews/>
          {/* Interview Details Card
          <div className="max-w-4xl mx-auto rounded-xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6" >
                  Interview Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <i className="fas fa-calendar-alt w-8"></i>
                    <span>Date: March 15, 2024</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <i className="fas fa-clock w-8"></i>
                    <span>Time: 2:00 PM EST</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <i className="fas fa-user-tie w-8"></i>
                    <span>Interviewer: John Smith</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <i className="fas fa-code w-8"></i>
                    <span>Position: Senior Developer</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4" >
                    Preparation Checklist
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>Test your camera and microphone</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>Ensure stable internet connection</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>Review your resume and portfolio</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>Prepare your coding environment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          {/* <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="/interview"
              className="px-8 py-4 bg-[#00f3ff] text-gray-900 rounded-lg font-bold text-lg flex items-center justify-center hover:shadow-lg hover:shadow-[#00f3ff]/30 transition-all hover:-translate-y-1"
            >
              <i className="fas fa-video mr-2"></i>
              Enter Interview Room
            </a>
            <button
              className="px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center hover:shadow-lg hover:shadow-[#00f3ff]/30 transition-all hover:-translate-y-1"
              style={{ border: '1px solid #00f3ff', color: '#00f3ff', boxShadow: '0 0 10px rgba(0, 243, 255, 0.3)' }}
            >
              <i className="fas fa-book mr-2"></i>
              View Guidelines
            </button>
          </div> */}

          {/* System Requirements */}
          <div className="max-w-4xl mx-auto mt-16 rounded-xl p-8" style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 243, 255, 0.1)'
          }}>
            <h2 className="text-2xl font-bold mb-6" >
              System Requirements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <i className="fas fa-desktop text-4xl mb-3"></i>
                <h3 className="font-bold text-gray-300 mb-2">Browser</h3>
                <p className="text-gray-400">Chrome 80+ or Firefox 75+</p>
              </div>
              <div className="text-center p-4">
                <i className="fas fa-wifi text-4xl mb-3"></i>
                <h3 className="font-bold text-gray-300 mb-2">Internet</h3>
                <p className="text-gray-400">Minimum 5 Mbps</p>
              </div>
              <div className="text-center p-4">
                <i className="fas fa-microphone text-4xl mb-3"></i>
                <h3 className="font-bold text-gray-300 mb-2">Hardware</h3>
                <p className="text-gray-400">Camera & Microphone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-[#00f3ff] py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 CipherStack. All rights reserved.</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="hover:text-[#00f3ff]">Privacy Policy</a>
              <a href="#" className="hover:text-[#00f3ff]">Terms of Service</a>
              <a href="#" className="hover:text-[#00f3ff]">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InterviewPortal;








import socket from '@/utils/socket';
import { useEffect, useRef } from 'react';
import { FaMicrophone, FaVideo, FaDesktop, FaRecordVinyl, FaCode, FaPaperPlane, FaComments } from 'react-icons/fa';
import {  getUserInteview, getUserInteviews, scheduleInterview } from '@/service/interviewService';
import React from 'react';
import InvitedUsers from '@/components/UsersInvite';













import { FaCalendarAlt, FaClock, FaUserTie, FaUsers, FaStickyNote, } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { toastSuccess } from '@/utils/toast';
import InterviewViewPage from '@/components/Interivew/interviewViewPage';
import { useRouter } from 'next/navigation';

interface Interview {
  position: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  notes: string;
  hostId: string;
  participantId: string;
  code: string;
}



const ScheduledInterviews =() => {
  const [tab,SetTab]=useState<"userCreatedInterview"|"usersInterview">("userCreatedInterview")
  const [userCreatedInterview,SetUserCreatedInterview]=useState<Interview>([])
  const [userInterview,SetUserInterview]=useState<Interview>([])
  const [interviews,setInterview]=useState<Interview>([])
  const router=useRouter()

  useEffect(()=>{
   const getData=async()=>{
      const respones=await getUserInteviews()
      console.log(respones?.data.interviews.userCreatedInterview);
      SetUserInterview(respones?.data.interviews.userInterviews)
      SetUserCreatedInterview(respones?.data.interviews.userCreatedInterview)
      setInterview(respones?.data.interviews.userCreatedInterview)
    }
    getData()
  },[])

  useEffect(()=>{
    if(tab==="usersInterview"){
      setInterview(userInterview)
    }else if(tab=='userCreatedInterview'){
      setInterview(userCreatedInterview)
  }
  },[tab])
  const joinInterview=(id:string)=>{
    router.push(`interview/${id}`)
  }


    


  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono p-6">
      {/* Header */}
      <div className="flex gap-8 items-center mb-8 border-b border-[#00f3ff] pb-4">
        <h1 className="text-3xl font-bold text-[#00f3ff] flex items-center">
          <FaVideo className="mr-3" />
          Scheduled Interviews
        </h1>
        <div className='flex gap-5 neon-text '>
            <button onClick={ ()=>SetTab('usersInterview')} className=' neon-border p-1'>Scheduled for Me</button>
            <button onClick={()=>SetTab('userCreatedInterview')} className=' neon-border p-1'>Scheduled by Me</button>
        </div>
      </div>

      {/* Interview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview, index) => (
          <div 
            key={index} 
            className="bg-[#111111] border border-[#00f3ff] rounded-lg p-6 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all"
          >
            {/* Position and Type */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-[#00f3ff]">{interview.position}</h2>
              <span className="px-3 py-1 bg-black text-[#00f3ff] border border-[#00f3ff] rounded-full text-xs">
                {interview.interviewType}
              </span>
            </div>

            {/* Date and Time */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-300">
                <FaCalendarAlt className="text-[#00f3ff] mr-3" />
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaClock className="text-[#00f3ff] mr-3" />
                <span>{interview.time}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MdAccessTime className="text-[#00f3ff] mr-3 text-lg" />
                <span>{interview.duration}</span>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-4">
              <div className="flex items-center text-gray-300 mb-2">
                <FaUserTie className="text-[#00f3ff] mr-3" />
                <span>Host: User_{interview.hostId}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaUsers className="text-[#00f3ff] mr-3" />
                <span>Participant: User_{interview.participantId}</span>
              </div>
            </div>

            {/* Notes */}
            {interview.notes && (
              <div className="mb-4">
                <div className="flex items-center text-gray-300 mb-2">
                  <FaStickyNote className="text-[#00f3ff] mr-3" />
                  <span className="font-semibold">Notes:</span>
                </div>
                <p className="text-gray-400 text-sm pl-8">{interview.notes}</p>
              </div>
            )}

            {/* Join Button and Code */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-800">
              <div className="flex items-center">
                <FaCode className="text-[#00f3ff] mr-2" />
                <span className="text-sm font-mono">{interview.code}</span>
              </div>
              <button onClick={()=>joinInterview(interview.id)} className="px-4 py-2 bg-[#00f3ff] text-black rounded-lg hover:bg-[#00d4e0] transition text-sm">
                Join Interview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {interviews.length === 0 && (
        <div className="text-center py-12 border border-[#00f3ff] border-dashed rounded-lg">
          <FaVideo className="mx-auto text-4xl text-[#00f3ff] mb-4" />
          <h3 className="text-xl font-bold text-[#00f3ff] mb-2">No Scheduled Interviews</h3>
          <p className="text-gray-400 mb-4">You don't have any interviews scheduled yet</p>
          <button className="px-4 py-2 bg-[#00f3ff] text-black rounded-lg hover:bg-[#00d4e0] transition">
            Schedule Your First Interview
          </button>
        </div>
      )}
    </div>

  );
};

// Example usage:



