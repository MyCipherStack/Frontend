
"use client"

import { useState } from 'react';
import Header from '@/components/Header';
import { useEffect } from 'react';
import { FaVideo, FaCode, FaPlus, FaCalendar, FaClock, FaUser, FaUsers, FaStickyNote, FaPlay, FaEdit, FaEye, FaRocket } from 'react-icons/fa';
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
    const now = new Date();
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    e.preventDefault()
    if (!formData.position || !formData.interviewType || !formData.date || !formData.time || !formData.duration || !formData.notes) {
      return toastError("Please fill in all fields.");
    }
    if (selectedDate < now) {
      toastError("Selected date and time cannot be in the past.");
      return;
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Create Interview Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-gray-700">
              <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-white">Schedule New Interview</h2>
                  <p className="text-blue-100 mt-1">Create a professional interview session</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-white hover:text-blue-100 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Position</label>
                    <select name="position" value={formData.position} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white">
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
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Interview Type</label>
                    <select name="interviewType" value={formData.interviewType} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white">
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
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Datee</label>
                    <input type="date" name="date" min={new Date().toString()} value={formData.date} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Duration</label>
                  <select name="duration" value={formData.duration} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white">
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <InvitedUsers allowedUser={1} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} sessionType={sessionType} setSessionType={setSessionType} />

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Additional Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-700 text-white h-32 resize-none"
                    placeholder="Add any specific requirements, topics to cover, or special instructions..."></textarea>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium">
                    Cancel
                  </button>
                  <button onClick={schedule}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg">
                    <FaRocket className="inline mr-2" />
                    Schedule Interview
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full mb-6 shadow-lg">
              {/* <FaVideo className="mr-3" /> */}

            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Ace Your Interviews
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of technical interviews with our AI-powered platform.
              Real-time coding, system design challenges, and professional evaluation.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center mb-12">
            <button onClick={() => setIsModalOpen(true)}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <FaRocket className="inline mr-3 group-hover:animate-bounce" />
              Create New Interview
            </button>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                  <FaVideo className="text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total Interviews</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
                  <MdTrendingUp className="text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-white">94.2%</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white">
                  <FaUsers className="text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">5,892</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
                  <MdSecurity className="text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Security Score</p>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-2xl shadow-lg p-2 border border-gray-700 max-w-md mx-auto">
              <div className="flex">
                <button onClick={() => SetTab('usersInterview')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${tab === 'usersInterview'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'}`}>
                  <FaEye className="inline mr-2" />
                  Scheduled for Me
                </button>
                <button onClick={() => SetTab('userCreatedInterview')}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${tab === 'userCreatedInterview'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'}`}>
                  <FaEdit className="inline mr-2" />
                  Created by Me
                </button>
              </div>
            </div>
          </div>

          {/* Interview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews.map((interview, index) => (
              <div key={index} className="group bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{interview.position}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-200 border border-blue-700">
                        {interview.interviewType}
                      </span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-blue-400">
                      <FaEdit className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-300">
                      <FaCalendar className="text-blue-400 mr-3 w-5" />
                      <span className="font-medium">{interview.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaClock className="text-blue-400 mr-3 w-5" />
                      <span className="font-medium">{interview.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MdAccessTime className="text-blue-400 mr-3 w-5" />
                      <span className="font-medium">{interview.duration} minutes</span>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border border-gray-600">
                    <div className="flex items-center text-gray-300 mb-2">
                      <FaUser className="text-blue-400 mr-3 w-4" />
                      <span className="text-sm font-medium">Host: User_{interview.hostId}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaUsers className="text-blue-400 mr-3 w-4" />
                      <span className="text-sm font-medium">Participant: User_{interview.participantId}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {interview.notes && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border border-gray-600">
                      <div className="flex items-center text-gray-300 mb-2">
                        <FaStickyNote className="text-blue-400 mr-3 w-4" />
                        <span className="text-sm font-semibold">Notes</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{interview.notes}</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                    <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg border border-gray-600">
                      <FaCode className="text-blue-400 mr-2" />
                      <span className="text-sm font-mono text-gray-300">{interview.code}</span>
                    </div>
                    <button onClick={() => joinInterview(interview.id)}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg">
                      <FaPlay className="inline mr-2" />
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {interviews.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-8 border border-gray-600">
                <FaVideo className="text-blue-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No interviews scheduled</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                You don't have any interviews scheduled yet. Create your first interview to get started.
              </p>
              <button onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl">
                <FaRocket className="mr-3" />
                Schedule Your First Interview
              </button>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MdHighQuality className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">HD Video Quality</h3>
              <p className="text-gray-400">Crystal clear video and audio for professional interviews</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <FaCode className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real-time Coding</h3>
              <p className="text-gray-400">Live code editor with syntax highlighting and collaboration</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <MdSecurity className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Secure & Private</h3>
              <p className="text-gray-400">End-to-end encryption and secure interview sessions</p>
            </div>
          </div>
        </div>

        <ReportButton />

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <FaVideo className="text-blue-400 mr-3 text-2xl" />
                <span className="text-2xl font-bold text-white">CipherStack</span>
              </div>
              <p className="text-gray-400 mb-6">© 2024 CipherStack. All rights reserved.</p>
              <div className="flex justify-center space-x-8">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Support</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Documentation</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default InterviewPortal;



