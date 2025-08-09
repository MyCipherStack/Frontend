"use client"

import socket from '@/utils/socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaVideo, FaDesktop, FaPaperPlane, FaComments, FaLock } from 'react-icons/fa';
import React from 'react';
import Header from '@/components/Header';
import { useParams, useRouter } from 'next/navigation';
import { joinInteview } from '@/service/interviewService';
import { toastError, toastSuccess } from '@/utils/toast';
import { MdClose } from 'react-icons/md';
import { FaPhoneSlash } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';




const InterviewViewPage = () => {
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
  const [isLocked, setIsLocked] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)


  const [oppName, setOppName] = useState("")

  interface MessageType {
    text: string;
    userName: string;
    time: string;
    sender?: string;
  }

  const [messages, setMessages] = useState<MessageType[]>([
    { text: 'Interview session started', userName: "you", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },

  ]);



  const user = useSelector((state: RootState) => state.auth.user)


  // Chat functions
  const sendMessage = () => {
    console.log("sendmessage");

    if (message.trim()) {

      setMessages([...messages, { userName: 'you', text: message, time: new Date().toLocaleDateString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('')
      socket.emit("iSend-message", { roomId, userName: user?.name, text: message, time: new Date().toLocaleDateString([], { hour: "2-digit", minute: "2-digit" }) })

    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  let run = true
  useEffect(() => {

    if (run) {
      run = false
      const handler = async (response: { userName: string, text: string, time: string }) => {

        console.log(response, "message recived");

        setMessages((prevState) => [...prevState, { ...response }])
        console.log(response, "get message Data");
      }


      socket.on("receive-message", handler)

      return () => { socket.off('signal') }
    }
  }, [])


  // Media stream references
  const localStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const incomingTrackTypes = useRef<string[]>([]);


  const peerConnectionRef = useRef<RTCPeerConnection>(null)
  const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }






  const params = useParams()
  const id = decodeURIComponent(params.id as string)

  const route = useRouter()

  useEffect(() => {
    if (!scheduledTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = scheduledTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLocked(false);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduledTime]);



  useEffect(() => {
    const handleTrackType = ({ type }: { type: string }) => {
      incomingTrackTypes.current.push(type); // correctly tracks 'camera' or 'screen'
    };

    socket.on("track-type", handleTrackType);

    return () => {
      socket.off("track-type", handleTrackType); // cleanup must match the same function
    };
  }, []);

  let alreadyInitialized = useRef(false)

  // Handle when another user joins the room
  useEffect(() => {
    const handleUserJoined = ({ roomId, oppName }: { roomId: string, oppName: string }) => {
      console.log("Another user joined:", oppName);
      setOppName(oppName);
      
      // If we're already initialized, just update the opponent name
      // The WebRTC connection will be established through the offer/answer flow
    };

    socket.on("joined", handleUserJoined);

    return () => {
      socket.off("joined", handleUserJoined);
    };
  }, []);









  const handleOffer = useCallback(async (data: RTCSessionDescriptionInit, roomId: string) => {
    console.log("guest received offer", data);
    console.log("guest received offer roomid,", roomId);

    const pc = peerConnectionRef.current;

    if (!pc) {
      console.warn("Peer connection not ready");
      return;
    }

    await pc.setRemoteDescription(new RTCSessionDescription(data));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    console.log("📡 Guest sending answer...");
    socket.emit("answer", { roomId, data: answer });

    // 🔥 Flush queued candidates
    for (const c of pendingCandidatesRef.current) {
      console.log("🌊 Flushing queued candidate", c);
      await pc.addIceCandidate(c);
    }
    pendingCandidatesRef.current = [];
  }, [])


  const handlerAnswer = useCallback(async (data: RTCSessionDescriptionInit) => {
    const pc = peerConnectionRef.current;
    
    if (!pc) {
      console.warn("PeerConnection not available for answer");
      return;
    }

    console.log("Handling answer, current signaling state:", pc.signalingState);
    
    if (pc.signalingState === "have-local-offer") {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(data));
        console.log("Remote description set successfully");
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    } else {
      console.warn("Cannot set remote description in state:", pc.signalingState);
    }
  }, [])





  const handelCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
    const pc = peerConnectionRef.current;
    console.log(pc, "handlecandidate");

    if (!pc) {
      console.warn("PeerConnection not ready yet");
      return;
    }

    if (!pc.remoteDescription || pc.signalingState !== "stable") {
      console.log("Remote description not set yet, queueing candidate");
      pendingCandidatesRef.current.push(candidate);
    } else {
      try {
        await pc.addIceCandidate(candidate);
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    }
  }, [])












  useEffect(() => {


    let isInitiator = false
    const join = async () => {
      try {
        const response = await joinInteview(id)
        // console.log(response);

        if (response?.data.status) {
          const startDate = response.data.interview.date
          const startTime = response.data.interview.time

          const interviewDateTime = new Date(`${startDate} ${startTime}`);
          setScheduledTime(interviewDateTime);
          const now = new Date();
          console.log(startDate, startTime, interviewDateTime, now);
          setIsLocked(now < interviewDateTime);
          setRoomId(response.data.interview.id)

          isInitiator = response.data.interview.isHost
          // console.log( response.data.interview.isHost);
          setIsHost(isInitiator)
          initializeMedia(response.data.interview.id, isInitiator, user?.name!);
        } else {
          toastError("invalid interview or something wentwrong")
          route.back()
        }

      } catch (error) {
        toastError("invalid interview or something wentwrong")
        route.back()
      }
    }
    if (!alreadyInitialized.current) {
      alreadyInitialized.current = true;
      join()
    }







    // Set up socket event listeners once
    const handleOfferWrapper = (data: any) => {
      if (roomId) {
        handleOffer(data, roomId);
      }
    };

    socket.on("offer", handleOfferWrapper);
    socket.on("answer", handlerAnswer);
    socket.on("candidate", handelCandidate);

    return () => {
      // Cleanup media streams
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Clean up socket listeners
      socket.off("offer", handleOfferWrapper);
      socket.off("answer", handlerAnswer);
      socket.off("candidate", handelCandidate);

      // Close peer connection
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [handleOffer, handlerAnswer, handelCandidate, roomId]);






  const initializeMedia = async (roomId: string, isInitiator: boolean, userName: string) => {
    try {

      console.log("interiview joined emit");

      socket.emit("join-interview", { roomId, userName })


      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      const pc = new RTCPeerConnection(config)

      peerConnectionRef.current = pc


      let isNegotiating = false;
      
      pc.onnegotiationneeded = async () => {
        if (isNegotiating) {
          console.log("Already negotiating, skipping...");
          return;
        }
        
        try {
          isNegotiating = true;
          console.log("Starting negotiation, signaling state:", pc.signalingState);
          
          if (pc.signalingState !== "stable") {
            console.log("Not in stable state, waiting...");
            return;
          }
          
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          console.log("Sending offer...");
          socket.emit("offer", { roomId, data: offer });
        } catch (err) {
          console.error("Negotiation failed", err);
        } finally {
          isNegotiating = false;
        }
      };



      // Add tracks to peer connection
      stream.getTracks().forEach(track => {
        console.log("Adding track:", track.kind, track.label);
        pc.addTrack(track, stream);
      });

      // Emit track type for video tracks
      stream.getVideoTracks().forEach(() => {
        socket.emit("track-type", { roomId, kind: "video", type: "camera" });
      });

      // Force negotiation for the initiator after a short delay to ensure both sides are ready
      if (isInitiator) {
        console.log("Host initiating connection...");
        setTimeout(async () => {
          if (pc.signalingState === "stable" && !isNegotiating) {
            try {
              isNegotiating = true;
              const offer = await pc.createOffer();
              await pc.setLocalDescription(offer);
              console.log("Host sending initial offer");
              socket.emit("offer", { roomId, data: offer });
            } catch (err) {
              console.error("Failed to create initial offer:", err);
              isNegotiating = false;
            }
          }
        }, 1000);
      }


      // Socket event listeners are set up in the main useEffect to avoid duplicates







      /// Locally show same screen 
      if (localVideoRef.current) {
        const localVideo = localVideoRef.current;
        localVideo.srcObject = stream;
        
        // Local video should play immediately since it's muted
        localVideo.play().catch((e) => {
          console.error("Error playing local video:", e);
          // Retry after a short delay
          setTimeout(() => {
            localVideo.play().catch(console.error);
          }, 500);
        });
      }



      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", { roomId, data: event.candidate });
        }
      };

      // Handle signaling state changes
      pc.onsignalingstatechange = () => {
        console.log("Signaling state changed to:", pc.signalingState);
        if (pc.signalingState === "stable") {
          isNegotiating = false;
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        console.log("Connection state changed to:", pc.connectionState);
        if (pc.connectionState === "connected") {
          console.log("✅ WebRTC connection established successfully");
          toastSuccess("Connection established");
        } else if (pc.connectionState === "failed") {
          console.error("❌ WebRTC connection failed");
          toastError("Connection failed - trying to reconnect...");
          // Could implement reconnection logic here
        }
      };

      // Handle ICE connection state changes
      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
      };



      pc.ontrack = (event) => {
        console.log( "event",event,);
        console.log("stream",event.streams);
        
        const stream = event.streams[0]
        const track = event.track
        
        console.log("track",track);


        if (track.kind === "video") {
          const label = track.label.toLowerCase()
          console.log(label, "label");
          const type = incomingTrackTypes.current.shift()

          console.log("type",type);


          if (type === "screen") {
            toastSuccess("screen")
            toastSuccess("screen")
            console.log("screen");

            if (screenShareRef.current) {
              const screenElement = screenShareRef.current;
              screenElement.pause();
              screenElement.srcObject = stream;
              
              const playScreen = async () => {
                try {
                  screenElement.load();
                  await screenElement.play();
                  console.log("Screen share playing successfully");
                  toastSuccess("Screen share connected");
                } catch (e) {
                  console.error("Error playing screen share:", e);
                  setTimeout(() => {
                    screenElement.play().catch(console.error);
                  }, 1000);
                }
              };
              
              screenElement.addEventListener('loadedmetadata', playScreen, { once: true });
              setTimeout(playScreen, 500);
            }
          } else {
            // toastSuccess("camera")

            if (remoteVideoRef.current) {
              // Stop any existing playback before setting new stream
              const videoElement = remoteVideoRef.current;
              videoElement.pause();
              videoElement.srcObject = stream;
              
              // Wait for video to be ready before playing
              const playVideo = async () => {
                try {
                  videoElement.load();
                  await videoElement.play();
                  console.log("Remote video playing successfully");
                } catch (e) {
                  console.error("Error playing remote video:", e);
                  // Retry after a short delay
                  setTimeout(() => {
                    videoElement.play().catch(console.error);
                  }, 1000);
                }
              };
              
              // Use loadedmetadata event to ensure video is ready
              videoElement.addEventListener('loadedmetadata', playVideo, { once: true });
              
              // Fallback timeout
              setTimeout(playVideo, 500);
            }
          }
        }


      }








      localStreamRef.current = stream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          toastError('Camera and microphone access denied. Please allow permissions and refresh.');
        } else if (err.name === 'NotFoundError') {
          toastError('No camera or microphone found. Please connect media devices.');
        } else if (err.name === 'NotReadableError') {
          toastError('Camera or microphone is already in use by another application.');
        } else {
          toastError('Error accessing media devices. Please check your camera and microphone.');
        }
      }
    }
  };

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
  }
  const toggleScreenShare = async () => {
    console.log("open screenshare");

    const pc = peerConnectionRef.current
    // const localStream=localStreamRef.current

    if(!pc) return

    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })

        const screenTrack = screenStream.getVideoTracks()[0]

        pc.addTrack(screenTrack, screenStream)

        socket.emit("track-type", { roomId, kind: "video", type: "screen" });
        
        // Display screen share locally
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = screenStream;
          screenShareRef.current.play().catch((e) => {
            console.log("Error playing local screen share:", e);
          });
        }

        setIsScreenSharing(true)




        screenTrack.onended = () => {
          if (screenShareRef.current) {
            screenShareRef.current.srcObject = null;
          }
          setIsScreenSharing(false);
          console.log("Screen sharing ended");
        }
      } catch (error) {
        console.log(error);

        toastError("error in sharing screen try again")
      }
    } else {
      // Stop screen sharing
      try {
        const pc = peerConnectionRef.current;
        if (pc && screenShareRef.current?.srcObject) {
          const screenStream = screenShareRef.current.srcObject as MediaStream;
          screenStream.getTracks().forEach(track => {
            track.stop();
            pc.removeTrack(pc.getSenders().find(sender => sender.track === track)!);
          });
          screenShareRef.current.srcObject = null;
          setIsScreenSharing(false);
          console.log("Screen sharing stopped manually");
        }
      } catch (error) {
        console.error("Error stopping screen share:", error);
        toastError("Error stopping screen share");
      }
    }

  }




  // // Timer functions
  // const startTimer = () => {
  //   startTimeRef.current = Date.now();
  //   timerIntervalRef.current = setInterval(updateTimer, 1000);
  // };

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



  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      <Header />
      {isLocked && scheduledTime && <LockedModal timeRemaining={timeRemaining} setIsLocked={setIsLocked} scheduledTime={scheduledTime} route={route} />}
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
                className="w-full h-full rounded-lg"
                autoPlay
                playsInline
              />
              <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">{isHost ? oppName : "Interviewer"}</div>
            </div>

            {/* Participant Video */}
            <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
              <video
                ref={localVideoRef}
                className="w-full h-full object-contain rounded-lg"
                autoPlay
                muted
                playsInline
              />
              <div className="absolute bottom-4 left-4 text-sm text-[#00f3ff]">You</div>
            </div>

            {/* Screen Share Window */}
            <div className="h-48 bg-black border border-[#00f3ff] rounded-lg relative">
              <video
                ref={screenShareRef}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                playsInline
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
              onClick={toggleScreenShare}
              className={`p-3 rounded-full border ${isScreenSharing ? 'border-green-500 text-green-500' : 'border-[#00f3ff] text-[#00f3ff]'} hover:bg-[#00f3ff] hover:bg-opacity-20 transition`}
            >
              <FaDesktop className="text-xl" />
            </button>

            <button onClick={() => route.back()}
              className="p-3 rounded-full border border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:bg-opacity-20 transition">
              <FaPhoneSlash className="text-xl" />
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
          {/* <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00f3ff] scrollbar-track-gray-800">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <span className="text-xs text-gray-400">{msg.sender}</span>
                <div className="bg-black border border-[#00f3ff] rounded-lg p-3 text-sm">
                  {msg.text}
                </div>
              </div>
            ))}
          </div> */}
          <div className="chat-messages flex-1 overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div key={index} className="message mb-3 ml-2">
                <div className="flex items-center mb-1">
                  <span className={`font-bold ${msg.userName !== 'you' ? 'text-blue-400' : 'text-[#0ef]'}`}>
                    {msg.userName === 'you' ? 'you' : msg.userName}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{new Date(msg.time).toLocaleTimeString()}</span>
                </div>
                <p className="text-gray-300">{msg.text}</p>
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

export default InterviewViewPage;





interface LockedModalProps {
  setIsLocked: (locked: boolean) => void;
  scheduledTime: Date | null;
  timeRemaining: string;
  route: any;
}

const LockedModal = ({ setIsLocked, scheduledTime, timeRemaining, route }: LockedModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-[#111111] border-2 border-yellow-500 rounded-lg p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-yellow-400 flex items-center">
          <FaLock className="mr-2" />
          Interview Locked
        </h2>
        <button
          onClick={() => route.back()}
          className="text-gray-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Scheduled Time:</span>
          <span>{scheduledTime?.toLocaleDateString()} {scheduledTime?.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Time Remaining:</span>
          <span className="text-2xl font-mono text-yellow-400">{timeRemaining}</span>
        </div>

        <div className="mt-6 p-4 bg-black rounded-lg border border-gray-700">
          <p className="text-center text-gray-300">
            This interview session will unlock automatically when it&apos;s time to start.
          </p>
          <p className="text-center text-yellow-400 mt-2">
            Please come back at the scheduled time.
          </p>
        </div>

        <button
          onClick={() => route.back()}
          className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);