import { RootState } from '@/store/store';
import socket from '@/utils/socket';
import { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaCog, FaPaperPlane, FaInfoCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';


const PairProgrammingSidebar = ({ challengeId, navigatorName }:{
  challengeId: string;
  navigatorName: string;  
}) => {
  const roomId = challengeId
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user)
  const bottomRef = useRef<HTMLDivElement>(null)
  const localStremRef = useRef<MediaStream| null>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const remoteAudioRef = useRef<HTMLAudioElement>(null)

  const [messages, setMessages] = useState([
    { userName: 'you', text: 'Hey', time: '10:22 AM' },

  ]);

  const handleSendMessage = () => {
    if (message.trim()) {

      setMessages([...messages, { userName: 'you', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('')
      socket.emit("send-message", { roomId, userName: user?.name, text: message, time: new Date().toLocaleDateString([], { hour: "2-digit", minute: "2-digit" }) })

    }

  };

  const startVoiceCall = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    localStremRef.current = localStream
    const peerConnection = new RTCPeerConnection()

    peerConnectionRef.current = peerConnection

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream)
    })

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', { roomId, data: { candidate: event.candidate } })
      }
    }

    peerConnection.ontrack = (event) => {
      if(remoteAudioRef.current){

        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch((err) => console.error("Audio play error", err));
      }else{
         console.warn("remoteAudioRef is not ready yet");
      }
    };

    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    socket.emit('signal', { roomId, data: offer })
  }





  useEffect(() => {
    startVoiceCall()


    socket.on('signal', async (data) => {
      if(!peerConnectionRef.current) return;
      if (data.type === 'offer') {
        await peerConnectionRef?.current.setRemoteDescription(new RTCSessionDescription(data))
        const answer = await peerConnectionRef.current.createAnswer()
        await peerConnectionRef.current.setLocalDescription(answer)
        socket.emit('signal', { roomId, data: answer })
      } else if (data.type == 'answer') {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data))
      } else if (data.candidate) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate))
      }
    })




  }, [roomId])


  useEffect(() => {


    const handler = async (response: { userName: string, text: string, time: string }) => {

      console.log(response, "message recived");

      setMessages((prevState) => [...prevState, { ...response }])
      console.log(response, "get message Data");
    }


        socket.on("receive-message", handler)


    // const pairUpdate = false

    // if (!pairUpdate) {

    //   socket.emit("join-pairProgramming", { roomId: challenge._id, userName: userData.name })

    //   socket.on("pairProgram-update", ({ userName }) => {
    //     setNavigatorName(userName)
    //     pairUpdate


    //     if (userName)
    //       console.log("user joined", userName)

    //     return () => {
    //       // socket.off("receive-message", handler);

    //     }




    //   })

    // }


    return () => { socket.off('signal') }
  }, [])


  const handleMuteToggle = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    socket.emit('mute-status-changed', {
      roomId,
      userId: user?.id, // or user.name if unique
      isMuted: newMuteState,
    });

    // Optional: actually mute/unmute microphone
    localStremRef.current?.getAudioTracks().forEach(track => {
      track.enabled = !newMuteState;
    });
  };



  //REMOTE USER MUTE STATUS
  const [remoteUserMuted, setRemoteUserMuted] = useState(false);

  useEffect(() => {
    const handleRemoteMuteChange = ({ userId, isMuted }:{
      userId: string,
      isMuted: boolean
    }) => {
      console.log(userId, isMuted);

      if (userId !== user?.id) {
        setRemoteUserMuted(isMuted);
      }
    };

    socket.on('mute-status-changed', handleRemoteMuteChange);

    return () => {
      socket.off('mute-status-changed', handleRemoteMuteChange);
    };
  }, [user?.id]);

  // ---------------------------------------------------------------------



  useEffect(() => {

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  return (
    <div className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-80 z-30 overflow-auto bg-[#000000] border border-[#0ef] shadow-[0_0_10px_#0ef] transition-transform duration-300 ${isCollapsed ? 'translate-x-[270px]' : ''}`}>

      {/* Header */}
      <div className='p-1 cursor-pointer' onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? "Open" : "Close"}</div>
      <div className="bg-black px-6 py-1 relative border-b border-[#0ef]">
        <div className="text-[#0ef] font-bold ml-20">Collaboration</div>
      </div>

      <div className="p-4 h-[calc(100vh-180px)] flex flex-col">
        {/* Participants */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Participants</h3>
          <div className="space-y-2">
            <div className="p-2 rounded flex items-center bg-black bg-opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden mr-2">
                <img src="https://via.placeholder.com/32" alt="You" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm">You ({user?.name})</div>
                <div className="text-xs text-green-400">Driver</div>
              </div>
            </div>
            <div className="p-2 rounded flex items-center bg-black bg-opacity-50">
              <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden mr-2">
                <img src="https://via.placeholder.com/32" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm">{navigatorName}</div>
                <div className="text-xs text-blue-400">Navigator</div>
              </div>
            </div>
          </div>
        </div>

        {/* Collaborative Editing */}
        <div className="mb-4 bg-black bg-opacity-50 p-3 rounded">

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">Live collaboration active</span>
            </div>

          </div>
          <div className="text-xs text-gray-400 mt-2">
            <p>Both participants can edit code simultaneously in real-time</p>
            <div className="mt-2 flex items-center gap-2">
              <FaInfoCircle className="text-[#0ef]" />
              <span>Changes are synchronized automatically</span>
            </div>
          </div>
        </div>

        {/* Current Activity */}
        {/* <div className="mb-4 bg-black bg-opacity-50 p-3 rounded">
          <h3 className="text-md font-bold mb-2">Current Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0ef]"></div>
                <span className="text-sm">You (CyberNinja)</span>
              </div>
              <span className="text-xs text-[#0ef]">Editing line 14</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm">CodeMaster</span>
              </div>
              <span className="text-xs text-green-400">Editing line 7</span>
            </div>
          </div>
        </div> */}

        {/* Voice Chat */}
        <div className="mb-4 bg-black bg-opacity-50 p-3 rounded">
          <h3 className="text-md font-bold mb-2">Voice Chat</h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="relative mr-2">
                <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden flex items-center justify-center">
                  <img src="https://via.placeholder.com/32" alt="You" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  {isMuted ? (
                    <FaMicrophoneSlash className="text-xs text-red-400" />
                  ) : (
                    <FaMicrophone className="text-xs text-green-400" />
                  )}
                </div>
              </div>
              <div className="text-sm">You({user?.name})</div>
            </div>
            <div className="flex gap-2">
              <button
                className={`p-2 ${isMuted ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'} rounded hover:opacity-80 transition`}
                title="Mute"
                onClick={() => handleMuteToggle()}
              >
                <FaMicrophone />
              </button>
              <button className="p-2 bg-black border border-gray-700 text-gray-400 rounded hover:border-[#0ef] hover:text-[#0ef] transition" title="Settings">
                <FaCog />
              </button>
              <audio ref={remoteAudioRef}></audio>
            </div>
          </div>

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div className="relative mr-2">
                <div className="w-8 h-8 rounded-full bg-[#111111] border-2 border-[#0ef] overflow-hidden flex items-center justify-center">
                  <img src="https://via.placeholder.com/32" alt="Partner" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center">
                  {remoteUserMuted ? (
                    <FaMicrophoneSlash className="text-xs text-red-400" />
                  ) : (
                    <FaMicrophone className="text-xs text-green-400" />
                  )}
                </div>
              </div>
              <div className="text-sm">{navigatorName}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="voice-level">
                <div className="flex gap-1">
                  <div className="w-1 h-2 bg-gray-700 rounded"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded"></div>
                  <div className="w-1 h-2 bg-gray-700 rounded"></div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{!remoteUserMuted ? "" : "Muted"}</span>
            </div>
          </div>

          {/* <div className="mt-3 pt-3 border-t border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Voice Connection: <span className="text-green-400">Strong</span></span>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-transparent border border-gray-700 text-gray-400 rounded py-1 hover:border-red-500 hover:text-red-500 transition duration-300">
                <FaPhoneSlash className="inline mr-1" /> Leave Call
              </button>
              <button className="flex-1 bg-transparent border border-[#0ef] text-[#0ef] rounded py-1 hover:bg-[#0ef] hover:text-black transition duration-300">
                <FaVolumeUp className="inline mr-1" /> Volume
              </button>
            </div>
          </div> */}
        </div>

        {/* Chat Section */}
        <div className="chat-container flex-1 flex flex-col h-96">
          <h3 className="text-lg font-bold mb-2">Chat</h3>
          <div className="chat-messages flex-1 overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div key={index} className="message mb-3">
                <div className="flex items-center mb-1">
                  <span className={`font-bold ${msg.sender === 'partner' ? 'text-blue-400' : 'text-[#0ef]'}`}>
                    {msg.userName === 'you' ? 'you' : msg.userName}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                </div>
                <p className="text-gray-300">{msg.text}</p>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
          <div className="flex mt-auto">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow bg-black border border-gray-700 rounded-l px-3 py-2 focus:border-[#0ef] focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />

            <button
              className="bg-[#0ef] px-4 py-2 rounded-r hover:bg-[#0df] transition duration-300 flex items-center justify-center"
              onClick={handleSendMessage}
            >
              <FaPaperPlane className="mr-2" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairProgrammingSidebar;
