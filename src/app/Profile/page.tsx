"use client"


import {  FaCode, FaUsers, FaTrophy, 
     FaEdit, FaChartLine, FaFire, FaBolt, FaBug ,FaChartPie ,FaProjectDiagram,FaSitemap,FaTable ,
    FaTrophy as FaTrophyBadge, FaBrain, FaCheckCircle, FaTimesCircle, 
    FaExclamationCircle, FaFistRaised } from 'react-icons/fa';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import "@/app/Profile/page"
import Header from '@/components/Header';
import { useSelector } from 'react-redux';
import EditProfileModal from '@/components/UserProfile/EditProfile/EditProfile';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {getUserProfile } from '@/service/getDataService';

const ProfilePage = () => {

const dispatch=  useDispatch()


    
    type FormData = {
      personal: {
        displayName: string;
        username: string;
        email: string;
        phone: string;
        bio: string;
        github: string;
        linkedin: string;
        avatar: string;
      };
      appearance: {
        theme: string;
      };
      preferences: {
        emailNotifications: boolean;
        interviewReminders: boolean;
        contestReminders: boolean;
        language: string;
        timezone: string;
        publicProfile: boolean;
        showActivity: boolean;
      };
    };
    
    
    
    
    const [isLoading, setIsLoading] = useState(false);
    
const [formData, setFormData] = useState<FormData>({
    personal: {
      displayName: "",
      username: "",
      email: "",
      phone: "",
      bio: "",
      github: "",
      linkedin: "",
      avatar:"http://res.cloudinary.com/dmvffxx3d/image/upload/v1745539383/wlz7zbayznqdofk1hja9.png",
    },
    appearance: {
      theme: "cyberpunk",
    },
    preferences: {
      emailNotifications: true,
      interviewReminders: true,
      contestReminders: true,
      language: "english",
      timezone: "gmt-8",
      publicProfile: true,
      showActivity: false,
    },
  });


  let userData=useSelector((state:any)=>state.auth.user)
  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile()
        console.log(response);
        
        const data=response.data.user   
        console.log(data);
         
        setFormData({
          personal: {
            displayName: data.displayName || "",
            username: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
            github: data.github || "",
            linkedin: data.linkedin || "",
            avatar: data.image || "/default-avatar.jpg",
          },
          appearance: {
            theme: data.theme || "cyberpunk"
          },
          preferences: {
            emailNotifications: data.preferences.emailNotifications ,
            interviewReminders: data.preferences.interviewReminders,
            contestReminders: data.preferences.contestReminders,
            language: data.preferences.language,
            timezone: data.preferences.timezone ,
            publicProfile: data.preferences.publicProfile,
            showActivity: data.preferences.showActivity ,
          },
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    console.log(formData,"form data");
    
  }, []);



  return (
    <>
 <Head>
   <title>Profile - CipherStack</title>
  

   
 </Head>
 
 <div className="min-h-screen text-gray-100 flex flex-col relative">
   {/* Scanline overlay */}
   <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.03)_0px,rgba(0,255,255,0.03)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
   
   <Header></Header>


   <main className="container mx-auto px-4 pt-24 pb-8 flex-grow z-0">

     <ProfileHeader   setIsLoading={setIsLoading}  isLoading={isLoading} setFormData={setFormData}    formData={formData}/>
     
     {/* Tabbed Content */}
     <ProfileTabs />
   </main>

   {/* Footer */}
   <Footer />
 </div>
</>
);
};

const ProfileHeader = ({setIsLoading, isLoading,setFormData,formData}) => {


  const [isEditProfile,SetisEditProfile]=useState(false)
  
  const userData = useSelector((state: any) => state.auth.user);
const router=useRouter()

return (
<div className="bg-[#111] rounded-lg neon-border overflow-hidden mb-6">
 <div className="bg-black px-6 py-3 border-b border-[#0ef] flex items-center">
   <div className="text-[#0ef] font-bold ml-4">User Profile</div>
 </div>
 
 <div className="p-6">
   <div className="flex flex-col md:flex-row items-center md:items-start">
     {/* Profile Picture */}
     <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
       <div className="w-24 h-24 rounded-full bg-[#111] border-2 border-[#0ef] overflow-hidden">
         <img src={formData.personal.avatar} alt="Profile" className="w-full h-full object-cover" />
       </div>
     </div>
     
     {/* Profile Info */}
     <div className="flex-grow text-center md:text-left">
       <h1 className="text-2xl font-bold neon-text">{formData.personal.displayName ? formData.personal.displayName :formData.personal.username}</h1>
       <p className="text-gray-400 text-sm">Member since October 2023</p>
       
       <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
         <StatBox value="1425" label="Global Rank" color="text-[#0ef]" />
         <StatBox value="214" label="Problems Solved" color="text-green-400" />
         <StatBox value="42" label="Submissions" color="text-orange-400" />
         <StatBox value="15" label="Contest Rating" color="text-yellow-400" />
       </div>
     </div>
     
     {/* Action Buttons */}
     <div className="flex-shrink-0 mt-4 md:mt-0 space-y-2">
       <button onClick={()=>SetisEditProfile(!isEditProfile)} className="px-4 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded-md hover:bg-[#0ef] hover:text-black transition duration-300 w-full">
         <FaEdit className="inline mr-2" /> Edit Profile  

       </button>

        {isEditProfile &&
          <EditProfileModal  setIsLoading={setIsLoading}  isLoading={isLoading} setFormData={setFormData}    formData={formData} onClose={()=>SetisEditProfile(!isEditProfile)}></EditProfileModal>
        }




       <button onClick={()=>router.push("/results")} className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-md hover:border-[#0ef] hover:text-[#0ef] transition duration-300 w-full">
         <FaChartLine className="inline mr-2" /> Battle Results
       </button>
     </div>
   </div>
   
   {/* Progress Bars */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
     <ProgressBar label="Easy Problems" value={126} max={350} color="green-100" />
     <ProgressBar label="Medium Problems" value={82} max={783} color="yellow-100" />
     <ProgressBar label="Hard Problems" value={6} max={204} color="red-100" />
   </div>
 </div>
</div>
);
};

const StatBox = ({ value, label, color }) => (
<div className="text-center">
<div className={`text-xl font-bold ${color}`}>{value}</div>
<div className="text-gray-400 text-xs">{label}</div>
</div>
);

const ProgressBar = ({ label, value, max, color }) => {
const percentage = Math.round((value / max) * 100);

return (
<div>
 <div className="flex justify-between text-sm mb-1">
   <span>{label}</span>
   <span className={`text-${color}`}>{value}/{max}</span>
 </div>
 <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
   <div 
     className={`h-full bg-${color} transition-all duration-500`}
     style={{ width: `${percentage}%` }}
   />
 </div>
</div>
);
};








const ProfileTabs = () => {
const [activeTab, setActiveTab] = useState('overview');

return (
<div className="bg-[#111] rounded-lg neon-border overflow-hidden">
 <div className="flex border-b border-gray-800">
   {['overview', 'submissions', 'badges', 'contests', 'settings'].map((tab) => (
     <button
       key={tab}
       className={`px-6 py-4 capitalize ${activeTab === tab ? 'text-[#0ef] border-b-2 border-[#0ef]' : 'text-gray-400 hover:text-[#0ef]'}`}
       onClick={() => setActiveTab(tab)}
     >
       {tab}
     </button>
   ))}
 </div>
 
 <div className="p-6">
   {activeTab === 'overview' && <OverviewTab />}
   {activeTab === 'submissions' && <SubmissionsTab />}
   {activeTab === 'badges' && <BadgesTab />}
   {activeTab === 'contests' && <ContestsTab />}
   {activeTab === 'settings' && <SettingsTab />}
 </div>
</div>
);
};

const OverviewTab = () => {
return (
<>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   <RecentActivity />
   <StatsSection />
 </div>
 
 <EarnedBadges />
 <RecentSubmissions />
 <ChallengeHistory />
</>
);
};

const RecentActivity = () => {
const activities = [
{ time: "2 hours ago", text: "Solved Binary Hack", link: "#" },
{ time: "Yesterday", text: "Participated in Weekly Contest #42", link: "#" },
{ time: "3 days ago", text: "Earned badge Problem Solver", color: "text-yellow-400" },
{ time: "5 days ago", text: "Solved String to Integer (atoi)", link: "#" },
{ time: "1 week ago", text: "Solved Two Sum", link: "#" }
];

return (
<div>
 <h2 className="text-xl font-bold neon-text mb-4">Recent Activity</h2>
 <div className="timeline-container pl-5">
   {activities.map((activity, index) => (
     <div key={index} className="timeline-item mb-4">
       <div className="text-sm">
         <span className="text-gray-400">{activity.time}</span>
         <p className="text-white">
           {activity.link ? (
             <a href={activity.link} className="text-[#0ef] hover:underline">{activity.text}</a>
           ) : (
             <span className={activity.color || ""}>{activity.text}</span>
           )}
         </p>
       </div>
     </div>
   ))}
 </div>
</div>
);
};

const StatsSection = () => {
return (
<div>
 <h2 className="text-xl font-bold neon-text mb-4">Coding Streak</h2>
 <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-800 mb-6">
   <div className="flex items-center justify-between mb-4">
     <StatBox value="7 Days" label="Current Streak" color="[#0ef]" />
     <StatBox value="21 Days" label="Longest Streak" color="[#0ef]" />
   </div>
   
   <ContributionGraph />
 </div>
 
 <CategoryStats />
</div>
);
};

const ContributionGraph = () => {
const contributions = [20, 50, 30, 80, 40, 60, 70];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

return (
<>
 <div className="flex items-end justify-between mt-6 space-x-1 p-2 h-24">
   {contributions.map((value, index) => (
     <div key={index} className="chart-bar flex-1">
       <div 
         className="chart-fill bg-[#0ef] bg-opacity-30 hover:bg-opacity-70 transition-all"
         style={{ height: `${value}%` }}
       />
     </div>
   ))}
 </div>
 <div className="flex justify-between text-xs text-gray-500 mt-2">
   {days.map((day, index) => (
     <span key={index}>{day}</span>
   ))}
 </div>
</>
);
};

const CategoryStats = () => {
const categories = [
{ icon: FaChartPie, name: "Arrays & Strings", count: 92 },
{ icon: FaProjectDiagram, name: "LinkedList & Trees", count: 65 },
{ icon: FaSitemap, name: "Graph Algorithms", count: 27 },
{ icon: FaTable, name: "Dynamic Programming", count: 30 }
];

return (
<>
 <h2 className="text-xl font-bold neon-text mb-4">Category Stats</h2>
 <div className="grid grid-cols-2 gap-4">
   {categories.map((category, index) => (
     <div key={index} className="bg-black bg-opacity-50 p-3 rounded border border-gray-800">
       <div className="flex items-center">
         <category.icon className="text-[#0ef] mr-3" />
         <div>
           <div className="text-sm">{category.name}</div>
           <div className="text-xs text-gray-400">{category.count} problems</div>
         </div>
       </div>
     </div>
   ))}
 </div>
</>
);
};

const EarnedBadges = () => {
const badges = [
{ icon: FaFire, name: "14-Day Streak" },
{ icon: FaBolt, name: "Quick Solver" },
{ icon: FaBug, name: "Bug Hunter" },
{ icon: FaTrophyBadge, name: "Contest Winner" },
{ icon: FaBrain, name: "Problem Solver" }
];

return (
<div className="mt-8">
 <h2 className="text-xl font-bold neon-text mb-4">Earned Badges</h2>
 <div className="flex flex-wrap gap-6">
   {badges.map((badge, index) => (
     <div key={index} className="text-center">
       <div className="badge w-20 h-20 flex items-center justify-center">
         <badge.icon className="text-[#0ef] text-3xl" />
       </div>
       <div className="mt-2 text-sm">{badge.name}</div>
     </div>
   ))}
 </div>
</div>
);
};

const RecentSubmissions = () => {
const submissions = [
{ status: "Accepted", problem: "Binary Hack", time: "2 hours ago", color: "green-400", icon: FaCheckCircle },
{ status: "Wrong Answer", problem: "String to Integer (atoi)", time: "Yesterday", color: "red-400", icon: FaTimesCircle },
{ status: "Time Limit", problem: "Regular Expression Matching", time: "3 days ago", color: "yellow-400", icon: FaExclamationCircle },
{ status: "Accepted", problem: "Two Sum", time: "1 week ago", color: "green-400", icon: FaCheckCircle }
];

return (
<div className="mt-8">
 <div className="flex justify-between items-center mb-4">
   <h2 className="text-xl font-bold neon-text">Recent Submissions</h2>
   <a href="#" className="text-[#0ef] text-sm hover:underline">View All</a>
 </div>
 
 <div className="overflow-x-auto">
   <table className="min-w-full text-sm">
     <thead>
       <tr className="bg-black text-gray-400 border-b border-gray-800">
         <th className="py-3 px-4 text-left">Status</th>
         <th className="py-3 px-4 text-left">Problem</th>
         <th className="py-3 px-4 text-center">Language</th>
         <th className="py-3 px-4 text-center">Runtime</th>
         <th className="py-3 px-4 text-center">Memory</th>
         <th className="py-3 px-4 text-center">Submitted</th>
       </tr>
     </thead>
     <tbody>
       {submissions.map((sub, index) => (
         <tr key={index} className="border-b border-gray-800 hover:bg-black">
           <td className="py-3 px-4">
             <span className={`text-${sub.color}`}>
               <sub.icon className="inline mr-1" /> {sub.status}
             </span>
           </td>
           <td className="py-3 px-4">
             <a href="#" className="text-[#0ef] hover:underline">{sub.problem}</a>
           </td>
           <td className="py-3 px-4 text-center">Python</td>
           <td className="py-3 px-4 text-center">{sub.status === "Accepted" ? "42ms" : "-"}</td>
           <td className="py-3 px-4 text-center">{sub.status === "Wrong Answer" ? "-" : "14.2MB"}</td>
           <td className="py-3 px-4 text-center text-gray-400">{sub.time}</td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
</div>
);
};

const ChallengeHistory = () => {
return (
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
 <ChallengeSection />
 <PointsSection />
</div>
);
};

const ChallengeSection = () => {
const challenges = [
{ type: "group", name: "Algorithm Masters", result: "Won", points: "+150", time: "2 days ago" },
{ type: "group", name: "Code Warriors", result: "Lost", points: "+50", time: "1 week ago" },
{ type: "1v1", opponent: "CodeMaster42", result: "Victory", points: "+75", time: "12 hours ago" },
{ type: "1v1", opponent: "AlgoNinja", result: "Draw", points: "+25", time: "3 days ago" }
];

return (
<div className="bg-[#111] rounded-lg neon-border p-4">
 <div className="flex justify-between items-center mb-4">
   <h2 className="text-xl font-bold neon-text">Challenge History</h2>
   <div className="flex items-center space-x-2">
     <span className="text-[#0ef]"><FaTrophy className="inline mr-2" /> Points: 2,450</span>
   </div>
 </div>

 <div className="space-y-3">
   {challenges.map((challenge, index) => (
     <div key={index} className="bg-black bg-opacity-50 p-3 rounded border border-gray-800">
       <div className="flex justify-between items-center">
         <div>
           <h4 className="text-white">
             {challenge.type === "group" ? challenge.name : `You vs ${challenge.opponent}`}
           </h4>
           <p className="text-sm text-gray-400">
             {challenge.type === "group" ? "Team Size: 4/5" : "1v1 Battle"}
           </p>
         </div>
         <div className="text-right">
           <span className={`text-${challenge.result === "Won" || challenge.result === "Victory" ? "green" : challenge.result === "Lost" ? "red" : "yellow"}-400`}>
             {challenge.result}
           </span>
           <p className="text-sm text-[#0ef]">{challenge.points} points</p>
         </div>
       </div>
       <div className="mt-2 text-xs text-gray-500">{challenge.time}</div>
     </div>
   ))}
 </div>
</div>
);
};

const PointsSection = () => {
const achievements = [
{ icon: FaFistRaised, name: "Battle Master", description: "Won 5 1v1 battles in a row", points: "+100" },
{ icon: FaUsers, name: "Team Player", description: "Participated in 10 group challenges", points: "+150" }
];

return (
<div className="bg-[#111] rounded-lg neon-border p-4">
 <h2 className="text-xl font-bold neon-text mb-4">Points & Achievements</h2>
 
 <div className="mb-6">
   <div className="flex justify-between items-center mb-2">
     <span className="text-gray-300">Total Points Earned</span>
     <span className="text-[#0ef] font-bold">2,450</span>
   </div>
   <div className="space-y-2">
     <div className="flex justify-between text-sm">
       <span className="text-gray-400">From Challenges</span>
       <span className="text-[#0ef]">1,200</span>
     </div>
     <div className="flex justify-between text-sm">
       <span className="text-gray-400">From 1v1 Battles</span>
       <span className="text-[#0ef]">750</span>
     </div>
     <div className="flex justify-between text-sm">
       <span className="text-gray-400">From Group Battles</span>
       <span className="text-[#0ef]">500</span>
     </div>
   </div>
 </div>

 <div>
   <h3 className="text-lg text-[#0ef] mb-3">Recent Achievements</h3>
   <div className="space-y-3">
     {achievements.map((achievement, index) => (
       <div key={index} className="flex items-center bg-black bg-opacity-50 p-3 rounded border border-gray-800">
         <div className="badge w-12 h-12 mr-3 flex items-center justify-center">
           <achievement.icon className="text-[#0ef] text-xl" />
         </div>
         <div>
           <h4 className="text-white">{achievement.name}</h4>
           <p className="text-sm text-gray-400">{achievement.description}</p>
           <p className="text-xs text-[#0ef]">{achievement.points} bonus points</p>
         </div>
       </div>
     ))}
   </div>
 </div>
</div>
);
};

const SubmissionsTab = () => <div>Submissions content</div>;
const BadgesTab = () => <div>Badges content</div>;
const ContestsTab = () => <div>Contests content</div>;
const SettingsTab = () => <div>Settings content</div>;

const Footer = () => {
return (
<footer className="w-full bg-black bg-opacity-90 border-t border-[#0ef] z-10">
 <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
   <p><FaCode className="inline mr-2 text-[#0ef]" /> Copyright © 2024 CipherStack</p>
 </div>
</footer>
);
};

export default ProfilePage;