// src/constants/routes.ts
// Centralized route constants for API endpoints

export const API_ROUTES = {


  USER: {
    LOGIN: "/api/user/login",
    REGISTER: "/api/user/register",
    LOGOUT: "/api/user/logout",
    ARENA: {
      CREATE_GROUP_CHALLENGE: "/api/user/arena/createGroupChallenge",
    },
    JOIN_GROUP_CHALLENGE: "/api/user/joinGroupChallenge",
    CREATE_PAIR_PROGRAMMING: "/api/user/createPairProgramming",
    JOIN_PAIR_PROGRAMMING: "/api/user/joinPairProgramming",
    ACTIVE_CHALLENGES: "/api/user/activeChallenges",
    START_CHALLENGE: "/api/user/startChallenge",
<<<<<<< Updated upstream
    CHALLENGE_RESULTS: "/api/user/challengeResults",
=======
    CHALLENGE_RESULTS:(params:string)=> `/api/user/challengeResults?${params}`,
>>>>>>> Stashed changes
    CHALLENGE_LEADERBOARD: (challengeId: string) => `/api/user/challenge/${challengeId}/leaderBoard`,
    PAIR_PROGRAMMING_REQUEST: "/api/user/pairProgrammingRequest",
    VERIFY_PAYMENT: "/api/user/verifyPayment",
    VERIFY_OTP: "/api/user/verifyOtp",
    RESET_PASSWORD: "/api/user/resetPassword",
    RESEND_OTP: "/api/user/resendOtp",
    PROBLEM: {
      ADD: "/api/admin/addProblem",
      EDIT: "/api/admin/editProblem",
      RUN: "/api/user/problem/run",
      SUBMIT: "/api/user/problem/submit",
      USER_SUBMISSIONS: "/api/user/userSubmissions",
      ACCEPTED_USER_PROBLEMS: "/api/user/acceptedUserProblems",
      SOLUTION: (problemId: string) => `/api/user/problem/${problemId}/solution`,
    },
    PROFILE: "/api/user/profile",
    PROFILE_RESET_PASSWORD: "/api/user/profile/resetPassword",
    FORGOT_PASSWORD_OTP: "/api/user/forgotPasswordOtp",
    FORGOT_PASSWORD_VERIFY: "/api/user/forgotPasswordVerify",
    NOTIFICATION: "/api/user/notification",
    READ_NOTIFICATION: "/api/user/readNotification",
    SUBMISSIONS: (problemId: string) => `/api/user/submissions?problemId=${problemId}`,
    RECENT_SUBMISSION: "/api/user/recentSubmission",
    SCHEDULE_INTERVIEW: "/api/user/scheduleInterview",
    GET_USER_INTERVIEWS: "/api/user/getUserInteviews",
    JOIN_INTERVIEW: "/api/user/joinInterView",
    PROBLEMS: "/api/user/problems",
    PROBLEM_DETAILS: "/api/user/problemDetails",
    ALL_PLANS: "/api/user/allPlans",
    CREATE_PAYMENT: "/api/user/createPayment",
    SUBSCRIPTION_DATA: "/api/user/subscriptionData",
    REPORT: "/api/user/report",
  },



  ADMIN: {
    LOGIN: "/api/admin/login",
    LOGOUT: "/api/admin/logout",
    GET_ALL_GROUP_CHALLENGES: "/api/admin/getAllGroupChallenges",
    GET_ALL_PAIR_PROGRAMMING:(params:string)=> `/api/admin/getAllPairProgramming?${params}`,
    CHALLENGE_CHANGE_STATUS: "/api/admin/challengeChangeStatus",
    CHANGE_STATUS_PAIR_PROGRAM: "/api/admin/changeStatusPairProgarm",
    USERS: `/api/admin/user`,
    ADMIN_ALL_PLANS: "/api/admin/adminAllPlans",
    CREATE_PREMIUM_PLAN: "/api/admin/createPremiumPlan",
    EDIT_PREMIUM_PLAN: "/api/admin/editPremiumPlan",
    REPORT: "/api/admin/report",
    ALL_REPORT:(params:string)=> `api/admin/report?${params}`,
    DASHBOARD:(params:string)=>`/api/admin/dashboard?${params}`,
    TRANSACTIONS:(params:string)=>`/api/admin/transations?${params}`
  },
};
