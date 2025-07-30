// "use client"

// import socket from '@/utils/socket';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { FaMicrophone, FaVideo, FaDesktop, FaRecordVinyl, FaCode, FaPaperPlane, FaComments, FaLock } from 'react-icons/fa';
// import React from 'react';
// import Header from '@/components/Header';
// import { useParams, useRouter } from 'next/navigation';
// import { joinInteview } from '@/service/interviewService';
// import { toastError, toastSuccess } from '@/utils/toast';
// import { MdClose } from 'react-icons/md';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';



// const InterviewViewPage = () => {
//   // Refs for video elements
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const screenShareRef = useRef<HTMLVideoElement>(null);

//   // State for media controls
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [timer, setTimer] = useState('00:00:00');
//   const [message, setMessage] = useState('');

//   const [messages, setMessages] = useState([
//     { sender: 'System', text: 'Interview session started' },
//     { sender: 'Interviewer', text: 'Hello! Welcome to your interview. Are you ready to begin?' }
//   ]);

//   // Media stream references
//   const localStreamRef = useRef<MediaStream | null>(null);
//   const screenStreamRef = useRef<MediaStream | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
//   const startTimeRef = useRef<number | null>(null);
//   const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
//   const incomingTrackTypes = useRef<string[]>([]);
  
  
//   const peerConnectionRef = useRef<RTCPeerConnection>(null)
//   const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }



//   const [isLocked, setIsLocked] = useState(true);
//   const [timeRemaining, setTimeRemaining] = useState('');
//   const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
//   const [roomId, setRoomId] = useState<string | null>(null);
//   const [isHost,setIsHost]=useState(false)
//   const user=useSelector((state:RootState)=>state.auth.user)
//   const [isScreenSharing,setIsScreenSharing]=useState(false)
  

  
//   const params=useParams()
//   const id=decodeURIComponent(params.id)

//   const route=useRouter()
  
//   useEffect(() => {
//     if (!scheduledTime) return;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = scheduledTime.getTime() - now.getTime();

//       if (diff <= 0) {
//         setIsLocked(false);
//         clearInterval(interval);
//         return;
//       }

//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [scheduledTime]);



//   useEffect(() => {
//     socket.on("track-type", ({ type }) => {
//       incomingTrackTypes.current.push(type); // queue type: 'screen' or 'camera'
//     });
  
//     return () => {
//       socket.off("track-type");
//     };
//   }, []);

// let alreadyInitialized=useRef(false)

// socket.on("joined",async({roomId})=>{
//   alreadyInitialized.current=false
//   console.log("ishost",isHost);
  
//   if(isHost){
//     initializeMedia(roomId,true)

//   }
// })









// const handleOffer =useCallback(async (data: RTCSessionDescriptionInit,roomId:string) => {
//   console.log("guest received offer", data);
//   console.log("guest received offer roomid,",roomId);

//   const pc = peerConnectionRef.current;

//   if (!pc) {
//     console.warn("Peer connection not ready");
//     return;
//   }

//   await pc.setRemoteDescription(new RTCSessionDescription(data));
//   const answer = await pc.createAnswer();
//   await pc.setLocalDescription(answer);
//   console.log("📡 Guest sending answer...");
//   socket.emit("answer", { roomId, data: answer });

//   // 🔥 Flush queued candidates
//   for (const c of pendingCandidatesRef.current) {
//     console.log("🌊 Flushing queued candidate", c);
//     await pc.addIceCandidate(c);
//   }
//   pendingCandidatesRef.current = [];
// },[])


// const handlerAnswer=useCallback(async (data: RTCSessionDescriptionInit,roomId:string) => {

//   if ( peerConnectionRef.current?.signalingState === "have-local-offer") {
//       await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));  //  this must happen only ONCE
//     } else {
//       console.warn("Unexpected signaling state:", peerConnectionRef.current?.signalingState);
//     }
  
// },[])





// const handelCandidate =useCallback( async (candidate: RTCIceCandidateInit,roomId:string) => {
// const pc = peerConnectionRef.current;
// console.log(pc,"handlecandidate");

// if (!pc) {
//   console.warn("PeerConnection not ready yet");
//   return;
// }

// if (!pc.remoteDescription || pc.remoteDescription.type !== "stable") {
//   console.log("Remote description not set yet, queueing candidate");
//   pendingCandidatesRef.current.push(candidate);
// } else {
//   try {
//     await pc.addIceCandidate(candidate);
//   } catch (err) {
//     console.error("Error adding ICE candidate:", err);
//   }
// }
// },[])












//   useEffect(() => {
    

//     let isInitiator=false
//     const join=async()=>{
//       try{
//             const response=await joinInteview(id)
//             // console.log(response);
            
//             if(response?.data.status){
//                 const startDate=response.data.interview.date
//                 const startTime=response.data.interview.time
                
//                 const interviewDateTime = new Date(`${startDate} ${startTime}`);
//                 setScheduledTime(interviewDateTime);
//                 const now = new Date();
//                 console.log(startDate,startTime,interviewDateTime,now);
//                 setIsLocked(now < interviewDateTime);
//                 setRoomId(response.data.interview.id)
                
//                 isInitiator = response.data.interview.isHost 
//                 // console.log( response.data.interview.isHost);
//                 setIsHost(isInitiator)
//                 initializeMedia(response.data.interview.id, isInitiator);
//             }else{
//                  toastError("invalid interview or something wentwrong")
//                 route.back()
//             }

//         }catch(error){
//             toastError("invalid interview or something wentwrong")
//             route.back()
//         }
//       }
//       if(!alreadyInitialized.current){
//         alreadyInitialized.current = true;
//       join()
//     }



 



//     return () => {
//       // Cleanup media streams
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach(track => track.stop());
//       }
//       // if (screenStreamRef.current) {
//       //   screenStreamRef.current.getTracks().forEach(track => track.stop());
//       // }
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }

//       socket.off("offer",handleOffer )


//       socket.off("answer",handlerAnswer )
      

//       socket.off("candidate",handelCandidate )

//       peerConnectionRef.current?.close();

//     };
//   }, [handleOffer,handlerAnswer,handelCandidate]);



  


//   const initializeMedia = async (roomId,isInitiator) => {
//     try {
      
//       console.log("interiview joined emit");
      
//       socket.emit("join-interview",{roomId})


//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });

//       const pc = new RTCPeerConnection(config)

//       peerConnectionRef.current = pc

//       stream.getTracks().forEach(track => pc.addTrack(track, stream))

//       stream.getVideoTracks().forEach(() => {
//         socket.emit("track-type", { roomId, kind: "video", type: "camera" });
//       });
      
    
//       toggleScreenShare()

//       // STEP 1

//       // WANT TO CREAT A INITIATOR FOR AVOID colliction to handshake
//       if (isInitiator) {
//         console.log("iam the host so i can offer the description");
        
//         const offer = await pc.createOffer();
//         await pc.setLocalDescription(offer);
//         socket.emit("offer", { roomId, data: offer });
//       }


//       socket.on("offer",(data)=>handleOffer(data,roomId) )


//       socket.on("answer",(data)=>handlerAnswer(data,roomId) )
      

//       socket.on("candidate",(data)=>handelCandidate(data,roomId) )







//       /// Localy show same screen 
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
        
//       }


      
//       pc.onicecandidate = (event) => {

//           if (event.candidate) {
//             socket.emit("candidate",{roomId,data: event.candidate})
//           }
//         }



//         pc.ontrack = (event) => {
//             console.log(event,"event");
//             console.log(event.streams);

//             const stream=event.streams[0]
//             const track=event.track

//             if(track.kind==="video"){
//               const label=track.label.toLowerCase()
//               console.log(label,"label");
//               const type=incomingTrackTypes.current.shift()
              
          
//               if(type ==="screen"){
//                 if(screenShareRef.current){
//                   screenShareRef.current.srcObject=stream
//                   setTimeout(()=>{
//                     screenShareRef.current.play().catch((e)=>{
                      
//                       console.log("Err playin screen")})
//                       toastError("err")
//                     },100)

//                   }
//               }else{
//                 if(remoteVideoRef.current){
//                   remoteVideoRef.current.srcObject=stream
//                   setTimeout(() => {
//                     remoteVideoRef.current?.play().catch((e) =>
//                       console.error("Error playing remote video:", e)
//                     );
//                   }, 100);
//                 }
//                 }
//               }


//             }



            


//           // if (remoteVideoRef.current) {
//           //   console.log("remote connect ");
            
//           //   remoteVideoRef.current.srcObject =event.streams[0]
//           //   console.log(event.streams[0]);
            
//           //   setTimeout(() => {
//           //     remoteVideoRef.current?.play().catch((e) =>
//           //       console.error("Error playing remote video:", e)
//           //     );
//           //   }, 100);
//           // }
        


//       localStreamRef.current = stream;
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//     }
//   };

//   // Toggle microphone
//   const toggleMicrophone = () => {
//     if (localStreamRef.current) {
//       const audioTracks = localStreamRef.current.getAudioTracks();
//       audioTracks.forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsMuted(!isMuted);
//     }
//   };

//   // Toggle video
//   const toggleVideo = () => {
//     if (localStreamRef.current) {
//       const videoTracks = localStreamRef.current.getVideoTracks();
//       videoTracks.forEach(track => {
//         track.enabled = !track.enabled;
//       });
//       setIsVideoOff(!isVideoOff);
//     }
//   };



//   // Start/stop screen recording
//   const toggleScreenRecording = async () => {
//     if (mediaRecorderRef.current?.state === 'recording') {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//       stopTimer();
//       return;
//     }
//   }
//     const toggleScreenShare=async()=>{
//       console.log("open screenshare");
      
//       const pc=peerConnectionRef.current
//       const localStream=localStreamRef.current
//       socket.emit("track-type", { roomId, kind: "video", type: "screen" });

//       // if(!pc || !localStream) return

//       if(!isScreenSharing){
//         try{
//           const screenStream=await navigator.mediaDevices.getDisplayMedia({video:true})
          
//           const screenTrack=screenStream.getVideoTracks()[0]

//           pc.addTrack(screenTrack,screenStream)

//           if(screenShareRef.current){
//             // screenShareRef.current.srcObject=screenStream
//           }

//           // screenShareRef.current=screenStream

//           socket.emit("track-type", { roomId, kind: "video", type: "screen" });
//           setIsScreenSharing(true)

        
          
          
//           screenTrack.onended=()=>{
//             screenShareRef.current!.srcObject = null;
//             // stopScreenShare()
//           }
//         }catch(error){
//           toastError("error in sharing screen try again")
//         }
//       }

//     }


//     // try {
//     //   const stream = await navigator.mediaDevices.getDisplayMedia({
//     //     video: true,
//     //     audio: true
//     //   });

//     //   if (screenShareRef.current) {
//     //     screenShareRef.current.srcObject = stream;
//     //   }

//     //   screenStreamRef.current = stream;
//     //   const recorder = new MediaRecorder(stream);
//     //   const chunks: BlobPart[] = [];

//     //   recorder.ondataavailable = (e) => {
//     //     if (e.data.size > 0) {
//     //       chunks.push(e.data);
//     //     }
//     //   };

//     //   recorder.onstop = () => {
//     //     const blob = new Blob(chunks, { type: 'video/webm' });
//     //     const url = URL.createObjectURL(blob);
//     //     const a = document.createElement('a');
//     //     a.href = url;
//     //     a.download = 'interview-recording.webm';
//     //     a.click();

//     //     if (screenShareRef.current) {
//     //       screenShareRef.current.srcObject = null;
//     //     }
//     //     stream.getTracks().forEach(track => track.stop());
//     //   };

//     //   recorder.start();
//     //   mediaRecorderRef.current = recorder;
//     //   setIsRecording(true);
//     //   startTimer();
//     // } catch (err) {
//     //   console.error('Error starting screen recording:', err);
//     // }
  

//   // Timer functions
//   const startTimer = () => {
//     startTimeRef.current = Date.now();
//     timerIntervalRef.current = setInterval(updateTimer, 1000);
//   };

//   const stopTimer = () => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }
//     setTimer('00:00:00');
//     startTimeRef.current = null;
//   };

//   const updateTimer = () => {
//     if (startTimeRef.current) {
//       const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
//       const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
//       const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
//       const seconds = (elapsed % 60).toString().padStart(2, '0');
//       setTimer(`${hours}:${minutes}:${seconds}`);
//     }
//   };

//   // Chat functions
//   const sendMessage = () => {
//     if (message.trim()) {
//       setMessages([...messages, { sender: 'You', text: message }]);
//       setMessage('');
//       // Here you would typically send the message to the other participant
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-gray-200 font-mono">
//       <Header/>
//       {isLocked && scheduledTime && <LockedModal timeRemaining={timeRemaining} setIsLocked={setIsLocked} scheduledTime={scheduledTime} route={route} />}
//       {/* Main Content */}
//       <div className="container mx-auto pt-16 px-4 flex h-[calc(100vh-80px)]">
//         {/* Left Panel - Video Calls */}
//         <div className="w-3/4  pr-4 flex flex-col  ">
//           {/* Video Windows */}
//           <div className="grid grid-cols-2 gap-2 flex-grow">
//             {/* Main Video Window */}
//             <div className="col-span-2 h-[calc(55vh-80px)]  bg-black border border-[#00f3ff] object-contain rounded-lg relative">
//               <video
//                 ref={remoteVideoRef}
//                 className="w-full h-full  rounded-lg"
//                 autoPlay
                
//               />
//               <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Interviewer</div>
//             </div>

//             {/* Participant Video */}
//             <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
//               <video
//                 ref={localVideoRef}
//                 className="w-full h-full object-contain rounded-lg"
//                 autoPlay
//               />
//               <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">You</div>
//             </div>

//             {/* Screen Share Window */}
//             <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
//               <video
//                 ref={screenShareRef}
//                 className="w-full h-full object-cover rounded-lg"
//                 autoPlay
//               />
//               <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Screen Share</div>
//               {isRecording && (
//                 <div className="absolute top-4 left-4 flex items-center">
//                   <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
//                   <span className="text-xs text-white">{timer}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="mt-4 flex justify-center space-x-4 p-4 bg-black border border-[#00f3ff] rounded-lg">
//             <button
//               onClick={toggleMicrophone}
//               className={`p-3 rounded-full border ${isMuted ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//             >
//               <FaMicrophone className="text-xl" />
//             </button>

//             <button
//               onClick={toggleVideo}
//               className={`p-3 rounded-full border ${isVideoOff ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//             >
//               <FaVideo className="text-xl" />
//             </button>

//             <button
//               onClick={toggleScreenShare}
//               className={`p-3 rounded-full border ${isRecording ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//             >
//               <FaDesktop className="text-xl" />
//             </button>

//             <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
//               <FaRecordVinyl className="text-xl" />
//             </button>

//             <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
//               <FaCode className="text-xl" />
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Chat */}
//         <div className="w-1/4 bg-black bg-opacity-70 border border-[#00f3ff] border-opacity-10 rounded-xl h-[calc(100vh-8rem)] flex flex-col backdrop-blur-sm">
//           <div className="p-4 border-b border-gray-700">
//             <h2 className="text-lg font-semibold flex items-center">
//               <FaComments className="text-[#00f3ff] mr-2" />
//               Interview Chat
//             </h2>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00f3ff] scrollbar-track-gray-800">
//             {messages.map((msg, index) => (
//               <div key={index} className="flex flex-col space-y-1">
//                 <span className="text-xs text-gray-400">{msg.sender}</span>
//                 <div className="bg-black border border-[#00f3ff] rounded-lg p-3 text-sm">
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="p-4 border-t border-gray-700">
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="flex-grow bg-black border border-[#00f3ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00f3ff]"
//                 placeholder="Type your message..."
//               />
//               <button
//                 onClick={sendMessage}
//                 className="p-2 rounded-lg bg-black border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition"
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewViewPage;





// const LockedModal = ({setIsLocked,scheduledTime,timeRemaining,route}) => (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//       <div className="bg-[#111111] border-2 border-yellow-500 rounded-lg p-6 max-w-md w-full">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-yellow-400 flex items-center">
//             <FaLock className="mr-2" />
//             Interview Locked
//           </h2>
//           <button 
//             onClick={() =>route.back()}
//             className="text-gray-400 hover:text-white"
//           >
//             <MdClose size={24} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <span className="text-gray-300">Scheduled Time:</span>
//             <span>{scheduledTime?.toLocaleDateString()} {scheduledTime?.toLocaleTimeString()}</span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-gray-300">Time Remaining:</span>
//             <span className="text-2xl font-mono text-yellow-400">{timeRemaining}</span>
//           </div>

//           <div className="mt-6 p-4 bg-black rounded-lg border border-gray-700">
//             <p className="text-center text-gray-300">
//               This interview session will unlock automatically when it's time to start.
//             </p>
//             <p className="text-center text-yellow-400 mt-2">
//               Please come back at the scheduled time.
//             </p>
//           </div>

//           <button
//             onClick={() =>route.back()}
//             className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );















//   // __------------------------------------------------------------------
//   // 2nd full with screen 











//   "use client"
  
//   import socket from '@/utils/socket';
//   import { useCallback, useEffect, useRef, useState } from 'react';
//   import { FaMicrophone, FaVideo, FaDesktop, FaRecordVinyl, FaCode, FaPaperPlane, FaComments, FaLock } from 'react-icons/fa';
//   import React from 'react';
//   import Header from '@/components/Header';
//   import { useParams, useRouter } from 'next/navigation';
//   import { joinInteview } from '@/service/interviewService';
//   import { toastError, toastSuccess } from '@/utils/toast';
//   import { MdClose } from 'react-icons/md';
//   import { useSelector } from 'react-redux';
//   import { RootState } from '@/store/store';
  
  
  
//   const InterviewViewPage = () => {
//     // Refs for video elements
//     const localVideoRef = useRef<HTMLVideoElement>(null);
//     const remoteVideoRef = useRef<HTMLVideoElement>(null);
//     const screenShareRef = useRef<HTMLVideoElement>(null);
  
//     // State for media controls
//     const [isMuted, setIsMuted] = useState(false);
//     const [isVideoOff, setIsVideoOff] = useState(false);
//     const [isRecording, setIsRecording] = useState(false);
//     const [timer, setTimer] = useState('00:00:00');
//     const [message, setMessage] = useState('');
  
//     const [messages, setMessages] = useState([
//       { sender: 'System', text: 'Interview session started' },
//       { sender: 'Interviewer', text: 'Hello! Welcome to your interview. Are you ready to begin?' }
//     ]);
  
//     // Media stream references
//     const localStreamRef = useRef<MediaStream | null>(null);
//     const screenStreamRef = useRef<MediaStream | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
//     const startTimeRef = useRef<number | null>(null);
//     const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
//     const incomingTrackTypes = useRef<string[]>([]);
    
    
//     const peerConnectionRef = useRef<RTCPeerConnection>(null)
//     const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
  
  
  
//     const [isLocked, setIsLocked] = useState(true);
//     const [timeRemaining, setTimeRemaining] = useState('');
//     const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
//     const [roomId, setRoomId] = useState<string | null>(null);
//     const [isHost,setIsHost]=useState(false)
//     const user=useSelector((state:RootState)=>state.auth.user)
//     const [isScreenSharing,setIsScreenSharing]=useState(false)
    
  
    
//     const params=useParams()
//     const id=decodeURIComponent(params.id)
  
//     const route=useRouter()
    
//     useEffect(() => {
//       if (!scheduledTime) return;
  
//       const interval = setInterval(() => {
//         const now = new Date();
//         const diff = scheduledTime.getTime() - now.getTime();
  
//         if (diff <= 0) {
//           setIsLocked(false);
//           clearInterval(interval);
//           return;
//         }
  
//         const hours = Math.floor(diff / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
//         setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
//       }, 1000);
  
//       return () => clearInterval(interval);
//     }, [scheduledTime]);
  
  
  
//     useEffect(() => {
//       const handleTrackType = ({ type }) => {
//         incomingTrackTypes.current.push(type); // correctly tracks 'camera' or 'screen'
//       };
    
//       socket.on("track-type", handleTrackType);
    
//       return () => {
//         socket.off("track-type", handleTrackType); // cleanup must match the same function
//       };
//     }, []);
    
//   let alreadyInitialized=useRef(false)
  
//   socket.on("joined",async({roomId})=>{
//     alreadyInitialized.current=false
//     console.log("ishost",isHost);
    
//     if(isHost){
//       initializeMedia(roomId,true)
  
//     }
//   })
  
  
  
  
  
  
  
  
  
//   const handleOffer =useCallback(async (data: RTCSessionDescriptionInit,roomId:string) => {
//     console.log("guest received offer", data);
//     console.log("guest received offer roomid,",roomId);
  
//     const pc = peerConnectionRef.current;
  
//     if (!pc) {
//       console.warn("Peer connection not ready");
//       return;
//     }
  
//     await pc.setRemoteDescription(new RTCSessionDescription(data));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     console.log("📡 Guest sending answer...");
//     socket.emit("answer", { roomId, data: answer });
  
//     // 🔥 Flush queued candidates
//     for (const c of pendingCandidatesRef.current) {
//       console.log("🌊 Flushing queued candidate", c);
//       await pc.addIceCandidate(c);
//     }
//     pendingCandidatesRef.current = [];
//   },[])
  
  
//   const handlerAnswer=useCallback(async (data: RTCSessionDescriptionInit,roomId:string) => {
  
//     if ( peerConnectionRef.current?.signalingState === "have-local-offer") {
//         await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));  //  this must happen only ONCE
//       } else {
//         console.warn("Unexpected signaling state:", peerConnectionRef.current?.signalingState);
//       }
    
//   },[])
  
  
  
  
  
//   const handelCandidate =useCallback( async (candidate: RTCIceCandidateInit,roomId:string) => {
//   const pc = peerConnectionRef.current;
//   console.log(pc,"handlecandidate");
  
//   if (!pc) {
//     console.warn("PeerConnection not ready yet");
//     return;
//   }
  
//   if (!pc.remoteDescription || pc.remoteDescription.type !== "stable") {
//     console.log("Remote description not set yet, queueing candidate");
//     pendingCandidatesRef.current.push(candidate);
//   } else {
//     try {
//       await pc.addIceCandidate(candidate);
//     } catch (err) {
//       console.error("Error adding ICE candidate:", err);
//     }
//   }
//   },[])
  
  
  
  
  
  
  
  
  
  
  
  
//     useEffect(() => {
      
  
//       let isInitiator=false
//       const join=async()=>{
//         try{
//               const response=await joinInteview(id)
//               // console.log(response);
              
//               if(response?.data.status){
//                   const startDate=response.data.interview.date
//                   const startTime=response.data.interview.time
                  
//                   const interviewDateTime = new Date(`${startDate} ${startTime}`);
//                   setScheduledTime(interviewDateTime);
//                   const now = new Date();
//                   console.log(startDate,startTime,interviewDateTime,now);
//                   setIsLocked(now < interviewDateTime);
//                   setRoomId(response.data.interview.id)
                  
//                   isInitiator = response.data.interview.isHost 
//                   // console.log( response.data.interview.isHost);
//                   setIsHost(isInitiator)
//                   initializeMedia(response.data.interview.id, isInitiator);
//               }else{
//                    toastError("invalid interview or something wentwrong")
//                   route.back()
//               }
  
//           }catch(error){
//               toastError("invalid interview or something wentwrong")
//               route.back()
//           }
//         }
//         if(!alreadyInitialized.current){
//           alreadyInitialized.current = true;
//         join()
//       }
  
  
  
   
  
  
  
//       return () => {
//         // Cleanup media streams
//         if (localStreamRef.current) {
//           localStreamRef.current.getTracks().forEach(track => track.stop());
//         }
//         // if (screenStreamRef.current) {
//         //   screenStreamRef.current.getTracks().forEach(track => track.stop());
//         // }
//         if (timerIntervalRef.current) {
//           clearInterval(timerIntervalRef.current);
//         }
  
//         socket.off("offer",handleOffer )
  
  
//         socket.off("answer",handlerAnswer )
        
  
//         socket.off("candidate",handelCandidate )
  
//         peerConnectionRef.current?.close();
  
//       };
//     }, [handleOffer,handlerAnswer,handelCandidate]);
  
  
  
    
  
  
//     const initializeMedia = async (roomId,isInitiator) => {
//       try {
        
//         console.log("interiview joined emit");
        
//         socket.emit("join-interview",{roomId})
  
  
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true
//         });
  
//         const pc = new RTCPeerConnection(config)
  
//         peerConnectionRef.current = pc
  
  
//         pc.onnegotiationneeded = async () => {
//           try {
//             const offer = await pc.createOffer();
//             await pc.setLocalDescription(offer);
//             socket.emit("offer", { roomId, data: offer });
//           } catch (err) {
//             console.error("Negotiation failed", err);
//           }
//         };
  
        
  
//         stream.getTracks().forEach(track => pc.addTrack(track, stream))
  
//         stream.getVideoTracks().forEach(() => {
//           socket.emit("track-type", { roomId, kind: "video", type: "camera" });
//         });
        
      
//         // toggleScreenShare()
  
//         // STEP 1
  
//         // WANT TO CREAT A INITIATOR FOR AVOID colliction to handshake
//         if (isInitiator) {
//           console.log("iam the host so i can offer the description");
          
//           const offer = await pc.createOffer();
//           await pc.setLocalDescription(offer);
//           socket.emit("offer", { roomId, data: offer });
//         }
  
  
//         socket.on("offer",(data)=>handleOffer(data,roomId) )
  
  
//         socket.on("answer",(data)=>handlerAnswer(data,roomId) )
        
  
//         socket.on("candidate",(data)=>handelCandidate(data,roomId) )
  
  
  
  
  
  
  
//         /// Localy show same screen 
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
          
//         }
  
  
        
//         pc.onicecandidate = (event) => {
  
//             if (event.candidate) {
//               socket.emit("candidate",{roomId,data: event.candidate})
//             }
//           }
  
  
  
//           pc.ontrack = (event) => {
//               console.log(event,"event");
//               console.log(event.streams);
  
//               const stream=event.streams[0]
//               const track=event.track
  
              
  
//               if(track.kind==="video"){
//                 const label=track.label.toLowerCase()
//                 console.log(label,"label");
//                 const type=incomingTrackTypes.current.shift()
                
  
            
//                 if(type==="screen"){
//                   toastSuccess("screen")
           
               
//                   if(screenShareRef.current){
//                     screenShareRef.current.srcObject=stream
//                     const screen=  screenShareRef.current
//                     setTimeout(()=>{
//                       screen.play().catch((e)=>{
//                         console.log("Err playin screen")})
//                         toastError("loading screen.....")
//                       },500)
  
//                     }
//                 }else{
//                 toastSuccess("camera")
  
//                   if(remoteVideoRef.current){
//                     remoteVideoRef.current.srcObject=stream
//                     setTimeout(() => {
//                       remoteVideoRef.current?.play().catch((e) =>
//                         console.error("Error playing remote video:", e)
//                       );
//                     }, 500);
//                   }
//                   }
//                 }
  
  
//               }
  
  
  
              
  
  
  
  
//         localStreamRef.current = stream;
//       } catch (err) {
//         console.error('Error accessing media devices:', err);
//       }
//     };
  
//     // Toggle microphone
//     const toggleMicrophone = () => {
//       if (localStreamRef.current) {
//         const audioTracks = localStreamRef.current.getAudioTracks();
//         audioTracks.forEach(track => {
//           track.enabled = !track.enabled;
//         });
//         setIsMuted(!isMuted);
//       }
//     };
  
//     // Toggle video
//     const toggleVideo = () => {
//       if (localStreamRef.current) {
//         const videoTracks = localStreamRef.current.getVideoTracks();
//         videoTracks.forEach(track => {
//           track.enabled = !track.enabled;
//         });
//         setIsVideoOff(!isVideoOff);
//       }
//     };
  
  
  
//     // Start/stop screen recording
//     const toggleScreenRecording = async () => {
//       if (mediaRecorderRef.current?.state === 'recording') {
//         mediaRecorderRef.current.stop();
//         setIsRecording(false);
//         stopTimer();
//         return;
//       }
//     }
//       const toggleScreenShare=async()=>{
//         console.log("open screenshare");
        
//         const pc=peerConnectionRef.current
//         const localStream=localStreamRef.current
        
//         // if(!pc || !localStream) return
        
//         if(!isScreenSharing){
//           try{
//             const screenStream=await navigator.mediaDevices.getDisplayMedia({video:true})
            
//             const screenTrack=screenStream.getVideoTracks()[0]
            
//             pc.addTrack(screenTrack,screenStream)
            
//             socket.emit("track-type", { roomId, kind: "video", type: "screen" });
//             if(screenShareRef.current){
//               // screenShareRef.current.srcObject=screenStream
//             }
  
//             // screenShareRef.current=screenStream
  
//             // socket.emit("track-type", { roomId, kind: "video", type: "screen" });
//             setIsScreenSharing(true)
  
          
            
            
//             screenTrack.onended=()=>{
//               screenShareRef.current!.srcObject = null;
//               // stopScreenShare()
//             }
//           }catch(error){
//             toastError("error in sharing screen try again")
//           }
//         }
  
//       }
  
  
     
  
//     // Timer functions
//     const startTimer = () => {
//       startTimeRef.current = Date.now();
//       timerIntervalRef.current = setInterval(updateTimer, 1000);
//     };
  
//     const stopTimer = () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//         timerIntervalRef.current = null;
//       }
//       setTimer('00:00:00');
//       startTimeRef.current = null;
//     };
  
//     const updateTimer = () => {
//       if (startTimeRef.current) {
//         const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
//         const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
//         const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
//         const seconds = (elapsed % 60).toString().padStart(2, '0');
//         setTimer(`${hours}:${minutes}:${seconds}`);
//       }
//     };
  
//     // Chat functions
//     const sendMessage = () => {
//       if (message.trim()) {
//         setMessages([...messages, { sender: 'You', text: message }]);
//         setMessage('');
//         // Here you would typically send the message to the other participant
//       }
//     };
  
//     const handleKeyPress = (e: React.KeyboardEvent) => {
//       if (e.key === 'Enter') {
//         sendMessage();
//       }
//     };
  
//     return (
//       <div className="min-h-screen bg-black text-gray-200 font-mono">
//         <Header/>
//         {isLocked && scheduledTime && <LockedModal timeRemaining={timeRemaining} setIsLocked={setIsLocked} scheduledTime={scheduledTime} route={route} />}
//         {/* Main Content */}
//         <div className="container mx-auto pt-16 px-4 flex h-[calc(100vh-80px)]">
//           {/* Left Panel - Video Calls */}
//           <div className="w-3/4  pr-4 flex flex-col  ">
//             {/* Video Windows */}
//             <div className="grid grid-cols-2 gap-2 flex-grow">
//               {/* Main Video Window */}
//               <div className="col-span-2 h-[calc(55vh-80px)]  bg-black border border-[#00f3ff] object-contain rounded-lg relative">
//                 <video
//                   ref={remoteVideoRef}
//                   className="w-full h-full  rounded-lg"
//                   autoPlay
                  
//                 />
//                 <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Interviewer</div>
//               </div>
  
//               {/* Participant Video */}
//               <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
//                 <video
//                   ref={localVideoRef}
//                   className="w-full h-full object-contain rounded-lg"
//                   autoPlay
//                 />
//                 <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">You</div>
//               </div>
  
//               {/* Screen Share Window */}
//               <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
//                 <video
//                   ref={screenShareRef}
//                   className="w-full h-full object-cover rounded-lg"
//                   autoPlay
//                 />
//                 <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">Screen Share</div>
//                 {isRecording && (
//                   <div className="absolute top-4 left-4 flex items-center">
//                     <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
//                     <span className="text-xs text-white">{timer}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
  
//             {/* Controls */}
//             <div className="mt-4 flex justify-center space-x-4 p-4 bg-black border border-[#00f3ff] rounded-lg">
//               <button
//                 onClick={toggleMicrophone}
//                 className={`p-3 rounded-full border ${isMuted ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//               >
//                 <FaMicrophone className="text-xl" />
//               </button>
  
//               <button
//                 onClick={toggleVideo}
//                 className={`p-3 rounded-full border ${isVideoOff ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//               >
//                 <FaVideo className="text-xl" />
//               </button>
  
//               <button
//                 onClick={toggleScreenShare}
//                 className={`p-3 rounded-full border ${isRecording ? 'border-red-500 text-red-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
//               >
//                 <FaDesktop className="text-xl" />
//               </button>
  
//               <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
//                 <FaRecordVinyl className="text-xl" />
//               </button>
  
//               <button className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
//                 <FaCode className="text-xl" />
//               </button>
//             </div>
//           </div>
  
//           {/* Right Panel - Chat */}
//           <div className="w-1/4 bg-black bg-opacity-70 border border-[#00f3ff] border-opacity-10 rounded-xl h-[calc(100vh-8rem)] flex flex-col backdrop-blur-sm">
//             <div className="p-4 border-b border-gray-700">
//               <h2 className="text-lg font-semibold flex items-center">
//                 <FaComments className="text-[#00f3ff] mr-2" />
//                 Interview Chat
//               </h2>
//             </div>
  
//             {/* Chat Messages */}
//             <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00f3ff] scrollbar-track-gray-800">
//               {messages.map((msg, index) => (
//                 <div key={index} className="flex flex-col space-y-1">
//                   <span className="text-xs text-gray-400">{msg.sender}</span>
//                   <div className="bg-black border border-[#00f3ff] rounded-lg p-3 text-sm">
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
  
//             {/* Message Input */}
//             <div className="p-4 border-t border-gray-700">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="flex-grow bg-black border border-[#00f3ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00f3ff]"
//                   placeholder="Type your message..."
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="p-2 rounded-lg bg-black border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black transition"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default InterviewViewPage;
  
  
  
  
  
//   const LockedModal = ({setIsLocked,scheduledTime,timeRemaining,route}) => (
//       <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//         <div className="bg-[#111111] border-2 border-yellow-500 rounded-lg p-6 max-w-md w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-yellow-400 flex items-center">
//               <FaLock className="mr-2" />
//               Interview Locked
//             </h2>
//             <button 
//               onClick={() =>route.back()}
//               className="text-gray-400 hover:text-white"
//             >
//               <MdClose size={24} />
//             </button>
//           </div>
  
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Scheduled Time:</span>
//               <span>{scheduledTime?.toLocaleDateString()} {scheduledTime?.toLocaleTimeString()}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-300">Time Remaining:</span>
//               <span className="text-2xl font-mono text-yellow-400">{timeRemaining}</span>
//             </div>
  
//             <div className="mt-6 p-4 bg-black rounded-lg border border-gray-700">
//               <p className="text-center text-gray-300">
//                 This interview session will unlock automatically when it's time to start.
//               </p>
//               <p className="text-center text-yellow-400 mt-2">
//                 Please come back at the scheduled time.
//               </p>
//             </div>
  
//             <button
//               onClick={() =>route.back()}
//               className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );