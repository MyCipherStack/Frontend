




export interface challenge {
    challengeName: string
    status: string
    createdAt: string
    joinCode: string
    participants: string
    duration: number
    problems:{name:string,id:string}[],
    type: string
    maxParticipants: number
    updatedAt?: string
    startTime?: string
    isBlocked?:boolean
    _id?:string

}



export interface pairProgrammingChallenge {
    challengeName: string           
    status: string
    createdAt: string   
    joinCode: string
    participants: string
    duration: string
    type: string
    startTime?: string
    updatedAt?: string
    _id?: string
}
   