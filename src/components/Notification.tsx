import socket from '@/utils/socket';
import { toastLite, toastSuccess } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { FaTimes, FaBell, FaCheckDouble } from 'react-icons/fa';
import { useSelector } from 'react-redux';




const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'System Update Available',
      message: 'Version 2.3.5 is ready to install',
      time: 'Just now',
      isRead: false
    },
    {
      id: '2',
      title: 'Security Alert',
      message: 'Unusual activity detected in your account',
      time: '5 min ago',
      isRead: false
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You have 3 unread conversations',
      time: '1 hour ago',
      isRead: true
    }
    
  ]);


   const user = useSelector((state) => state.auth.user)
 



  useEffect(()=>{

    if(user){
      socket.emit("join-user-room",user.id)
    }
  
      
console.log(socket.rooms,"rooms"); // Set with all joined rooms


    console.log(user,"joined user");
    
    


  socket.on("notification",(data)=>{

    console.log("haii notification",data);
    
    // toastSuccess(data.message)
    toastLite(data.message)
    setNotifications(prev=>[...prev,data])

  })

  },[])


  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Notification Bell */}
      <button 
        onClick={toggleDrawer}
        className="fixed top-4 right-44 z-40 p-2  rounded-full  transition-colors shadow-lg"
      >
        <FaBell />
        {notifications.some(n => !n.isRead) && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '400px', maxWidth: '100vw', boxShadow: '-4px 0 24px #0ef4' }}
      >
        <div className="bg-[#111111] rounded-l-lg border-l border-[#0ef] h-full flex flex-col">
          {/* Header */}
          <div className="bg-black px-6 py-4 border-b border-[#0ef] flex items-center justify-between">
            <div className="text-[#0ef] font-bold text-lg">Notifications</div>
            <button 
              onClick={closeDrawer}
              className="text-gray-400 hover:text-[#0ef] text-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-6">
              <button
                onClick={markAllAsRead}
                className="w-full mb-4 px-4 py-2  font-bold rounded  transition-colors flex items-center justify-end  gap-2"
              >
                <FaCheckDouble/>
                <span></span>
              </button>

              <div className="space-y-3">
                {notifications.map((notification,index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${notification.isRead ? 'bg-[#111111] opacity-80' : 'bg-[#0ef]/10'} border border-[#0ef]/20 hover:border-[#0ef]/50 transition-colors relative`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white">{notification.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <button 
                      onClick={() => dismissNotification(notification.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-[#0ef] text-sm"
                    >
                      <FaTimes />
                    </button>
                    {!notification.isRead && (
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#0ef] rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;