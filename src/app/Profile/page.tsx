"use client"


import {
  FaCode, FaUsers, FaTrophy,
  FaEdit, FaChartLine,
  FaTrophy as  FaCheckCircle,
  FaExclamationCircle, FaFistRaised,
  FaIdCard,
  FaSyncAlt,
  FaLinkedinIn,
  FaGithub
} from 'react-icons/fa';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import "@/app/Profile/page"
import Header from '@/components/Header';
import EditProfileModal from '@/components/UserProfile/EditProfile/EditProfile';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/service/getDataService';
import { getSubcriptionData } from '@/service/PremiumServices';

const ProfilePage = () => {







  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    personal: {
      displayName: "",
      username: "",
      email: "",
      phone: "",
      bio: "",
      github: "",
      linkedin: "",
      image: "http://res.cloudinary.com/dmvffxx3d/image/upload/v1745539383/wlz7zbayznqdofk1hja9.png",
      role: "",
      subscriptionId: ""
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
    streak: {
            lastActiveDate: null,
            currentStreak: 0,
            higestStreak: 0
          }
  });


  // Load user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserProfile()
        console.log(response);

        const data = response.data.user
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
            image: data.image || "http://res.cloudinary.com/dmvffxx3d/image/upload/v1745539383/wlz7zbayznqdofk1hja9.png",
            role: data.role || "regular",
            subscriptionId: data.subscriptionId
          },
    
          appearance: {
            theme: data.theme || "cyberpunk"
          },
          preferences: {
            emailNotifications: data.preferences.emailNotifications,
            interviewReminders: data.preferences.interviewReminders,
            contestReminders: data.preferences.contestReminders,
            language: data.preferences.language,
            timezone: data.preferences.timezone,
            publicProfile: data.preferences.publicProfile,
            showActivity: data.preferences.showActivity,
          },
          streak: data.streak
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    console.log(formData, "form data");

  }, []);




  return (
    <>

      <div className="min-h-screen text-gray-100 flex flex-col relative">
        {/* Scanline overlay */}

        <div className="fixed inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.03)_0px,rgba(0,255,255,0.03)_1px,transparent_1px,transparent_2px)] pointer-events-none z-10" />
        <Header></Header>


        <main className="container mx-auto px-4 pt-24 pb-8 flex-grow z-0">

          <ProfileHeader setIsLoading={setIsLoading} isLoading={isLoading}
            setFormData={setFormData}
            formData={formData} />

          {/* Tabbed Content */}
          <ProfileTabs streak={formData.streak ?? {
            lastActiveDate: null,
            currentStreak: 0,
            higestStreak: 0
          }} />
        </main>


        <Footer />
      </div>
    </>
  );
};

const ProfileHeader = ({ setIsLoading, isLoading, setFormData, formData }:{
  setIsLoading:Dispatch<SetStateAction<boolean>>,
  isLoading:boolean,
  setFormData:Dispatch<SetStateAction<UserFormData>>
  formData:UserFormData,
}) => {

  const [premiumDetails, setPremiumDetails] = useState(null)

  const [isEditProfile, SetisEditProfile] = useState(false)
  
  const [solvedCount, setSolvedCount] = useState(false)
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [totalProblems, setTotalProblems] = useState({difficulty:"",count:0})
  const [problemCount, setproblemCount] = useState({ easy: 0, medium: 0, hard: 0 })

  const getSubcription = async () => {
    const res = await getSubcriptionData()
    console.log("subscriton daat", res.data.data)
    setPremiumDetails(res.data.data)
  }


  const router = useRouter()

  const onClose = () => {

    setPremiumDetails(null)

  }


  useEffect(() => {
    run()

  }, [])
  const run = async () => {
    const res = await acceptedUserProblems()
    const acceptedData=res.data.acceptedData
    setproblemCount(acceptedData.problemCount)
    setSolvedCount(acceptedData.datas.length)
    setTotalSubmissions(acceptedData.totalSubmissions)
    setTotalProblems(acceptedData.totalProblemsCount)
    
    console.log(res.data.acceptedData, "run problemmmmm");


  }



  return (
    <div className="bg-[#111] rounded-lg neon-border overflow-hidden mb-6">
      <div className="bg-black px-6 py-3 border-b border-[#0ef] flex items-center" onClick={() => getSubcriptionData()}>
        <div className="text-[#0ef] font-bold ml-4">User Profile <span onClick={() => getSubcription()} className='text-red-400 cursor-pointer'>({formData.personal.role} User)<span className='text-xs text-cyan-600'>i</span></span></div>

      </div>
      {
        premiumDetails && <PremiumDetailsModal premiumDetails={premiumDetails} onClose={onClose} />
      }

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Picture */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 rounded-full bg-[#111] border-2 border-[#0ef] overflow-hidden">
              <img src={formData.personal.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
        
          </div>

          {/* Profile Info */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-2xl font-bold neon-text">{formData.personal.displayName ? formData.personal.displayName : formData.personal.username}</h1>
            <p className="text-gray-400 text-sm"> {formData.personal.bio}</p>
      <div className="mt-2 flex gap-2 cursor-pointer">
         <FaLinkedinIn className='' onClick={() => router.push(formData.personal.linkedin)}/>
        <FaGithub className='' onClick={() => router.push(formData.personal.github)}/>
       </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
              <StatBox value="14" label="Global Rank" color="text-[#0ef]" />
              <StatBox value={solvedCount} label="Problems Solved" color="text-green-400" />
              <StatBox value={totalSubmissions} label="Submissions" color="text-orange-400" />
            </div>

 
          </div>




          {/* Action Buttons */}
          <div className="flex-shrink-0 mt-4 md:mt-0 space-y-2">
            <button onClick={() => SetisEditProfile(!isEditProfile)} className="px-4 py-2 bg-transparent border border-[#0ef] text-[#0ef] rounded-md hover:bg-[#0ef] hover:text-black transition duration-300 w-full">
              <FaEdit className="inline mr-2" /> Edit Profile

            </button>

            {isEditProfile &&
              <EditProfileModal setIsLoading={setIsLoading} isLoading={isLoading} setFormData={setFormData} formData={formData} onClose={() => SetisEditProfile(!isEditProfile)}></EditProfileModal>
            }




            <button onClick={() => router.push("/results")} className="px-4 py-2 bg-transparent border border-gray-700 text-gray-400 rounded-md hover:border-[#0ef] hover:text-[#0ef] transition duration-300 w-full">
              <FaChartLine className="inline mr-2" /> Battle Results
            </button>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <ProgressBar label="Easy Problems" value={problemCount.easy} max={totalProblems.easy ?? 0} color="green-400" />
          <ProgressBar label="Medium Problems" value={problemCount.medium} max={totalProblems.medium ?? 0} color="yellow-400" />
          <ProgressBar label="Hard Problems" value={problemCount.hard} max={totalProblems.hard ?? 0} color="red-400" />
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ value, label, color }:{value:number| string| boolean,label:string,color:string}) => (
  <div className="text-center">
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-gray-400 text-xs">{label}</div>
  </div>
);

const ProgressBar = ({ label, value, max, color }:{label:string,value:number,max:number,color:string}) => {
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






  const ProfileTabs = ({ streak }:{streak:{lastActiveDate: string | null,currentStreak: number,higestStreak: number}}) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-[#111] rounded-lg neon-border overflow-hidden">
      <div className="flex border-b border-gray-800">
        {['overview', 'submissions',].map((tab) => (
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
        {activeTab === 'overview' && <OverviewTab streak={streak} />}
        {activeTab === 'submissions' && <RecentSubmissions />}
        {/* {activeTab === 'contests' && <ChallengeHistory />} */}

      </div>
    </div>
  );
};

const OverviewTab = ({ streak }:{streak:{lastActiveDate: string | null,currentStreak: number,higestStreak: number}}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <StatsSection streak={streak} />
      </div>

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
      <h2 className="text-xl font-bold neon-text mb-4"></h2>
      {/* <h2 className="text-xl font-bold neon-text mb-4">Recent Activity</h2> */}
      {/* <div className="timeline-container pl-5">
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
      </div> */}
    </div>
  );
};

const StatsSection = ({ streak }:{streak:{lastActiveDate: string | null,currentStreak: number,higestStreak: number}}) => {

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await userSubmissionsService();
        setSubmissions(response.data.submissions);
      } catch (err) {

        toastError("steak fecting err")

      }
    };

    fetchSubmissions();
  }, []);
  return (
    <div>
      <h2 className="text-xl font-bold neon-text mb-4">Coding Streak</h2>

      <div className="bg-black bg-opacity-50 p-4 rounded-lg border border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <StatBox value={streak.currentStreak ?? "0"} label="Current Streak" color="[#0ef]" />
          <StatBox value={streak.higestStreak ?? "0"} label="Longest Streak" color="[#0ef]" />
        </div>
        <CalendarHeatmapComponent submissions={submissions} />

      </div>
    </div>
  );
};





const RecentSubmissions = () => {


  const [submissions, SetSubmissions] = useState<submissions[]>([])

  const run = async () => {
    const submission = await recentSubmissions()
    SetSubmissions(submission.data.submissions)

  }

  useEffect(() => {

    run()

  }, [])

  const [submissionDetails, SetSubmissionDetails] = useState<submissions>({})
  const [submissionTab, setSubmissionTab] = useState("allSubmission")


  return (



    <div className="mt-8">

      {submissionTab == "allSubmission" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold neon-text">Recent Submissions</h2>
            {/* <a href="#" className="text-[#0ef] text-sm hover:underline">View All</a> */}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>

                <tr className="bg-black text-gray-400 border-b border-gray-800">
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Language</th>
                  <th className="px-4 py-2 text-left">Runtime</th>
                  <th className="px-4 py-2 text-left">Memory</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {submissions.map((submission, idx) => (
                  <tr key={idx} onClick={() => {
                    setSubmissionTab("submissionDetail")
                    SetSubmissionDetails(submission)

                  }}>
                    <td className="px-4 py-2">
                      {submission.status === 'Accepted' ? (
                        <span className="text-green-400 flex items-center">
                          <FaCheckCircle className="mr-1" /> {submission.status}
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center">
                          <FaExclamationCircle className="mr-1" /> {submission.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">{submission.language}</td>
                    <td className="px-4 py-2">{Math.round(submission.runTime)}</td>
                    <td className="px-4 py-2">{submission.memory}</td>
                    <td className="px-4 py-2">{submission.createdAt ? new Date(submission.createdAt).toDateString(): "N/A"}</td>
                    <td className="px-4 py-2">
                      <button className="text-neon-blue hover:underline">
                        <FaCode /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {submissionTab === "submissionDetail" && (
        <SubmissionDetail setSubmissionTab={setSubmissionTab} submissionDetails={submissionDetails} />
      )}
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







import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import CalendarHeatmapComponent from '@/components/CalendarHeatmap';
import { acceptedUserProblems, userSubmissionsService } from '@/service/problemService';
import { toastError } from '@/utils/toast';
import { recentSubmissions } from '@/service/getSubmissions';
import { SubmissionDetail } from '@/components/Problems/Submissions';
import { UserFormData } from '@/types/users';
import { submissions } from '@/types/problem';
import { count } from 'console';



const PremiumDetailsModal = ({ premiumDetails, onClose }:{
  premiumDetails:{}
  onClose:()=>void
}) => {
  useEffect(() => {
    console.log("Modal received premiumDetails:", premiumDetails);
  }, [premiumDetails]);

  if (!premiumDetails) return null;

  // Format dates
  const formatDate = (dateString:string) => {


    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate end date based on cycle
  const calculateEndDate = () => {
    const startDate = new Date(premiumDetails.createdAt);
    if (premiumDetails.cycle === 'monthly') {
      startDate.setMonth(startDate.getMonth() + 1);
    } else if (premiumDetails.cycle === 'annual') {
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
    return startDate;
  };

  // Calculate next payment date
  const calculateNextPayment = () => {
    const now = new Date();
    const nextPayment = new Date(premiumDetails.createdAt);
    while (nextPayment <= now) {
      if (premiumDetails.cycle === 'monthly') {
        nextPayment.setMonth(nextPayment.getMonth() + 1);
      } else {
        nextPayment.setFullYear(nextPayment.getFullYear() + 1);
      }
    }
    return nextPayment;
  };

  return (
    <div className="fixed inset-0 overflow-auto pt-32 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 p-6 max-w-md w-full mx-auto overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0ef] rounded-full"
          aria-label="Close modal"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-1">
              {premiumDetails.name}
            </h3>
            <div className="flex justify-center gap-2 mt-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${premiumDetails.status === 'active'
                ? 'bg-green-500 text-black'
                : 'bg-gray-600 text-white'
                }`}>
                {premiumDetails.status}
              </span>
              {/* {premiumDetails.trial && (
                <span className="inline-block bg-[#0ef] text-black text-xs px-3 py-1 rounded-full">
                  TRIAL ACTIVE
                </span>
              )} */}

              {/* //trial  */}

            </div>
          </div>

          {/* Price and Cycle */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white">
              ${(premiumDetails.price)}
              <span className="text-lg text-gray-400">/{premiumDetails.cycle}</span>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-4">
            <div className="flex items-start">
              <FaIdCard className="text-[#0ef] mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Subscription ID</p>
                <p className="text-white text-sm font-mono">{premiumDetails._id}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCalendarAlt className="text-[#0ef] mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Started On</p>
                <p className="text-white">{formatDate(premiumDetails.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaCalendarAlt className="text-[#0ef] mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Renews On</p>
                <p className="text-white">{new Date(premiumDetails.endDate).toDateString()}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaSyncAlt className="text-[#0ef] mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Billing Cycle</p>
                <p className="text-white capitalize">{premiumDetails.cycle}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Plan Includes:</h4>
            <div className="space-y-2">
              {premiumDetails.features.map((feature) => (
                <div key={feature._id} className="flex items-start text-gray-300">
                  <FaCheckCircle className="text-[#0ef] mt-1 mr-3 flex-shrink-0" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Trial Information */}
          {/* {premiumDetails.trial && (
            <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800">
              <div className="flex items-center">
                <FaCheckCircle className="text-blue-400 mr-2" />
                <span className="text-blue-300 text-sm">
                  {premiumDetails.trial} days trial period active
                </span>
              </div>
            </div>
          )} */}


        </div>
      </div>
    </div>
  );
};
