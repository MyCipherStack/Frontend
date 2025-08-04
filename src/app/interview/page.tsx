
"use client"

import { useState } from 'react';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { FaVideo, FaCode, FaPlus, FaCalendar, FaClock, FaUser, FaUsers, FaStickyNote, FaPlay, FaEdit, FaEye } from 'react-icons/fa';
import { getUserInteviews, scheduleInterview } from '@/service/interviewService';
import React from 'react';
import InvitedUsers from '@/components/UsersInvite';
import { MdAccessTime, MdTrendingUp, MdSecurity, MdHighQuality } from 'react-icons/md';
import { toastError, toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import ReportButton from '@/components/Report';

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
  id: string
}

const InterviewPortal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    interviewType: '',
    date: '',
    time: '',
    duration: '30',
    notes: '',
    isInvite: true,
  });

  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [sessionType, setSessionType] = useState<'invite' | 'sharecode'>('invite');
  const [tab, SetTab] = useState<"userCreatedInterview" | "usersInterview">("userCreatedInterview")
  const [userCreatedInterview, SetUserCreatedInterview] = useState<Interview[]>([])
  const [userInterview, SetUserInterview] = useState<Interview[]>([])
  const [interviews, setInterview] = useState<Interview[]>([])
  const router = useRouter()

  useEffect(() => {
    setFormData((pre) => ({ ...pre, isInvite: sessionType === "invite" }))
  }, [sessionType])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };

  const schedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.position || !formData.interviewType || !formData.date || !formData.time || !formData.duration || !formData.notes) {
      return toastError("Please fill in all fields.");
    }

    if (formData.isInvite) {
      if (invitedUsers.length === 0) {
        return toastError("Select any user ")
      }
    }

    try {
      const response = await scheduleInterview({ formData, sessionType, invitedUsers })
      if (response?.status) {
        toastSuccess("Interview Scheduled")
        SetUserCreatedInterview(prev => [...prev, response.data.Interview])
        setIsModalOpen(false)
        setFormData({
          position: '',
          interviewType: '',
          date: '',
          time: '',
          duration: '30',
          notes: '',
          isInvite: true,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    const getData = async () => {
      const respones = await getUserInteviews()
      console.log(respones?.data.interviews.userCreatedInterview);
      SetUserInterview(respones?.data.interviews.userInterviews)
      SetUserCreatedInterview(respones?.data.interviews.userCreatedInterview)
      setInterview(respones?.data.interviews.userCreatedInterview)
    }
    getData()
  }, [])

  useEffect(() => {
    if (tab === "usersInterview") {
      setInterview(userInterview)
    } else if (tab == 'userCreatedInterview') {
      setInterview(userCreatedInterview)
    }
  }, [tab, userCreatedInterview, userInterview])
  
  const joinInterview = (id: string) => {
    router.push(`interview/${id}`)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black-100">
        {/* Create Interview Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Schedule New Interview</h2>
                  <p className="text-gray-600 mt-1">Create a professional interview session</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <select name="position" value={formData.position} onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Position</option>
                      <option value="senior-dev">Senior Developer</option>
                      <option value="frontend-dev">Frontend Developer</option>
                      <option value="backend-dev">Backend Developer</option>
                      <option value="fullstack-dev">Full Stack Developer</option>
                      <option value="devops">DevOps Engineer</option>
                      <option value="data-scientist">Data Scientist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
                    <select name="interviewType" value={formData.interviewType} onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select Type</option>
                      <option value="technical">Technical Interview</option>
                      <option value="coding">Coding Challenge</option>
                      <option value="system-design">System Design</option>
                      <option value="behavioral">Behavioral Interview</option>
                      <option value="mock">Mock Interview</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange}
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleInputChange}
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select name="duration" value={formData.duration} onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <InvitedUsers allowedUser={1} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} sessionType={sessionType} setSessionType={setSessionType} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                            placeholder="Add any specific requirements, topics to cover, or special instructions..."></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button onClick={schedule}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                    Schedule Interview
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Interview Portal</h1>
                <p className="mt-2 text-gray-600">Manage and schedule your technical interviews</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                  <FaPlus className="mr-2" />
                  Create Interview
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaVideo className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                  <p className="text-2xl font-semibold text-gray-900">1,247</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MdTrendingUp className="text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">94.2%</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUsers className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-semibold text-gray-900">5,892</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MdSecurity className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-semibold text-gray-900">99.9%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button onClick={() => SetTab('usersInterview')} 
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${tab === 'usersInterview' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <FaEye className="inline mr-2" />
                  Scheduled for Me
                </button>
                <button onClick={() => SetTab('userCreatedInterview')} 
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${tab === 'userCreatedInterview' 
                          ? 'border-blue-500 text-blue-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <FaEdit className="inline mr-2" />
                  Created by Me
                </button>
              </nav>
            </div>
          </div>

          {/* Interview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview, index) => (
              <div key={index} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{interview.position}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {interview.interviewType}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="text-gray-400 mr-3 w-4" />
                      <span className="text-sm">{interview.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="text-gray-400 mr-3 w-4" />
                      <span className="text-sm">{interview.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MdAccessTime className="text-gray-400 mr-3 w-4" />
                      <span className="text-sm">{interview.duration} minutes</span>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center text-gray-600 mb-1">
                      <FaUser className="text-gray-400 mr-2 w-3" />
                      <span className="text-xs">Host: User_{interview.hostId}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaUsers className="text-gray-400 mr-2 w-3" />
                      <span className="text-xs">Participant: User_{interview.participantId}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {interview.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaStickyNote className="text-gray-400 mr-2 w-3" />
                        <span className="text-xs font-medium">Notes</span>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{interview.notes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-600">
                      <FaCode className="mr-1" />
                      {interview.code}
                    </div>
                    <button onClick={() => joinInterview(interview.id)} 
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      <FaPlay className="mr-1 w-3" />
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {interviews.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FaVideo className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You don't have any interviews scheduled yet. Create your first interview to get started.
              </p>
              <button onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                <FaPlus className="mr-2" />
                Schedule Your First Interview
              </button>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MdHighQuality className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">HD Video Quality</h3>
              <p className="text-gray-600 text-sm">Crystal clear video and audio for professional interviews</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FaCode className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Coding</h3>
              <p className="text-gray-600 text-sm">Live code editor with syntax highlighting and collaboration</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MdSecurity className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">End-to-end encryption and secure interview sessions</p>
            </div>
          </div>
        </div>

        <ReportButton />
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <FaVideo className="text-blue-600 mr-2" />
                <span className="text-xl font-semibold text-gray-900">CipherStack</span>
              </div>
              <p className="text-gray-600 mb-4">© 2024 CipherStack. All rights reserved.</p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InterviewPortal;



