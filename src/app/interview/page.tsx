 
"use client"






// components/InterviewPortal.tsx
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
    notes: ''
  });

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

  return (
    <>
    <Header/>
    
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="rounded-xl p-8 max-w-2xl w-full mx-4"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
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
                    type="submit"
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

          {/* Interview Details Card */}
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
          </div>

          {/* Action Buttons */}
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
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
          </div>

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
import { FaMicrophone, FaVideo, FaDesktop, FaRecordVinyl, FaCode, FaPaperPlane, FaComments, FaBell, FaUserCircle, FaCog, FaStar, FaSignOutAlt, FaTerminal, FaCompass, FaTrophy, FaLaptopCode } from 'react-icons/fa';

const InterviewPage = () => {
  // Refs for video elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  
  // State for media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState('00:00:00');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'System', text: 'Interview session started' },
    { sender: 'Interviewer', text: 'Hello! Welcome to your interview. Are you ready to begin?' }
  ]);

  // Media stream references
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const peerConnection=useRef<RTCPeerConnection>(null)


  const config={iceServers:[{urls: 'stun:stun.l.google.com:19302'}]}

  // Initialize media devices
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        const pc=new RTCPeerConnection(config)

        peerConnection.current=pc
      
        stream.getTracks().forEach(track=>pc.addTrack(track,stream))

        pc.onicecandidate=(event)=>{
          if(event.candidate){
            socket.emit("candidate",event.candidate)
          }
        }

        pc.ontrack=(event)=>{
          if(remoteVideoRef.current){
            remoteVideoRef.current.srcObject=event.streams[0]
          }
        }

        socket.on("offer",async(offer:RTCSessionDescription)=>{
          pc.setRemoteDescription(offer)
          const answer=await pc.createAnswer()
          await pc.setLocalDescription(answer)
          socket.emit("answer",answer)
        })

        socket.on("answer",async(answer:RTCSessionDescriptionInit)=>{
          await peerConnection.current?.setRemoteDescription(answer)
        })
        
        socket.on("candidate",async(candidate:RTCIceCandidateInit)=>{
          await peerConnection.current?.addIceCandidate(candidate)
        })



        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // if(remoteVideoRef.current){
        //   remoteVideoRef.current.srcObject=stream
        // }
        
        localStreamRef.current = stream;
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };

    initializeMedia();

    return () => {
      // Cleanup media streams
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Toggle microphone
  const toggleMicrophone = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  // Start/stop screen recording
  const toggleScreenRecording = async () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true,
        audio: true 
      });
      
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }
      
      screenStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interview-recording.webm';
        a.click();
        
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = null;
        }
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      startTimer();
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  // Timer functions
  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerIntervalRef.current = setInterval(updateTimer, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setTimer('00:00:00');
    startTimeRef.current = null;
  };

  const updateTimer = () => {
    if (startTimeRef.current) {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
      const seconds = (elapsed % 60).toString().padStart(2, '0');
      setTimer(`${hours}:${minutes}:${seconds}`);
    }
  };

  // Chat functions
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: 'You', text: message }]);
      setMessage('');
      // Here you would typically send the message to the other participant
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
    <Header/>
      {/* Main Content */}
      <div className="container mx-auto pt-16 px-4 flex h-[calc(100vh-80px)]">
        {/* Left Panel - Video Calls */}
        <div className="w-3/4  pr-4 flex flex-col  ">
          {/* Video Windows */}
          <div className="grid grid-cols-2 gap-2 flex-grow">
            {/* Main Video Window */}
            <div className="col-span-2 h-[calc(55vh-80px)]  bg-black border border-[#00f3ff] object-contain rounded-lg relative">
              <video 
                ref={remoteVideoRef} 
                className="w-full h-full  rounded-lg" 
                autoPlay 
                muted
              />
              <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Interviewer</div>
            </div>
            
            {/* Participant Video */}
            <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
              <video 
                ref={localVideoRef}
                className="w-full h-full object-contain rounded-lg" 
                autoPlay
              />
              <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">You</div>
            </div>
            
            {/* Screen Share Window */}
            <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
              <video 
                ref={screenShareRef} 
                className="w-full h-full object-cover rounded-lg" 
                autoPlay
              />
              <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Screen Share</div>
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-white">{timer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex justify-center space-x-4 p-4 bg-black border border-[#00f3ff] rounded-lg">
            <button 
              onClick={toggleMicrophone}
              className={`p-3 rounded-full border ${isMuted ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
            >
              <FaMicrophone className="text-xl" />
            </button>
            
            <button 
              onClick={toggleVideo}
              className={`p-3 rounded-full border ${isVideoOff ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
            >
              <FaVideo className="text-xl" />
            </button>
            
            <button 
              onClick={toggleScreenRecording}
              className={`p-3 rounded-full border ${isRecording ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
            >
              <FaDesktop className="text-xl" />
            </button>
            
            <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
              <FaRecordVinyl className="text-xl" />
            </button>
            
            <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
              <FaCode className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="w-1/4 bg-black bg-opacity-70 border border-[#00f3ff] border-opacity-10 rounded-xl h-[calc(100vh-8rem)] flex flex-col backdrop-blur-sm">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold flex items-center">
              <FaComments className="text-[#00f3ff] mr-2" />
              Interview Chat
            </h2>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00f3ff] scrollbar-track-gray-800">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <span className="text-xs text-gray-400">{msg.sender}</span>
                <div className="bg-black border border-[#00f3ff] rounded-lg p-3 text-sm">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow bg-black border border-[#00f3ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00f3ff]"
                placeholder="Type your message..."
              />
              <button 
                onClick={sendMessage}
                className="p-2 rounded-lg bg-black border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  InterviewPage;
