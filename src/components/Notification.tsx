import { allNotificationService, readNotificationService } from '@/service/notification';
import { RootState } from '@/store/store';
import { nofication } from '@/types/users';
import socket from '@/utils/socket';
import { toastLite } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTimes, FaBell, FaCheckDouble, FaBellSlash } from 'react-icons/fa';
import { useSelector } from 'react-redux';




const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<nofication[]>([]);


  const user = useSelector((state: RootState) => state.auth.user)




    useEffect(() => {

      if (user) {
        socket.emit("join-user-room", user.id)
      }

      // console.log(socket.rooms, "rooms"); // Set with all joined rooms


      console.log(user, "joined user");




      const handleNotification=(data)=>{

        console.log("haii notification", data);
        toastLite(data.message)
        
        setNotifications(prev => [...prev, data])
        
      }
      socket.on("notification",handleNotification)

    return ()=>{
      socket.off("notification",handleNotification)
    }
    

    }, [])




  useEffect(() => {

    const run = async () => {

      if (isOpen) {
        const response = await allNotificationService()
        console.log(response.data);

        setNotifications(response.data.allNotification)
      }
    }

    run()
    console.log("open");

  }, [isOpen])


  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const dismissNotification = async (id: string) => {

    const response = await readNotificationService(id)



    setNotifications(notifications.filter(n => n.id !== id));
  };

  const router=useRouter()

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={toggleDrawer}
        className="fixed top-4  p-2  rounded-full  transition-colors shadow-lg"
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
                <FaCheckDouble />
                <span></span>
              </button>



              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <FaBellSlash className="text-4xl mb-3" />
                  <p className="text-lg">No notifications yet</p>
                  <p className="text-sm">We'll notify you when something arrives</p>
                </div>
              ) : (

                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${notification.isRead ? 'bg-[#111111] opacity-80' : 'bg-[#0ef]/10'} border border-[#0ef]/20 hover:border-[#0ef]/50 transition-colors relative`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white">{notification.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                          {
                            notification.link && (
                              <>
                                <span  onClick={() => dismissNotification(notification.id)} className="text-xs p-1 text-white rounded mr-5 bg-red-600">Decline</span>
                                <span onClick={()=>router.push(notification.link)} className="text-xs p-1 text-whit rounded bg-green-500">Accept</span>
                              </>
                            )}
                        </div>
                        <span className="text-xs text-gray-400">{new Date(notification.time).toDateString()}</span>
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
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;





