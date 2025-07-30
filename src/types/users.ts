


export interface nofication {
    id: string;
    userId: string;
    type: string;   
    message: string;
    isRead: boolean;
    createdAt: string;
    title: string;
    link: string;   
    time: string; 
}



 export interface UserFormData{
    personal: {
      displayName: string;
      username: string;
      email: string;
      phone: string;
      bio: string;
      github: string;
      linkedin: string;
      image: string;
      role: string,
      subscriptionId: string

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
    streak: object
    ,
  };