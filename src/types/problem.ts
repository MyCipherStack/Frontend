


export interface submissions {

    userId: string,

    problemId: string,

    code: string,

    language: string,

    status: string,

    runTime: number,

    memory: number,

    passedTestCases: number,

    totalTestCases: number,

    error: string,

    failingTestCaseResult?: {
        input?: string | null,
        output?: string | null
        compile_output?: string | null
    } | null,


    createdAt?: string,

    id?: string
}





export type typeTestCase = {

    _id?: string;

    input: string;

    // target: number;
    
    output: string;

    status: boolean

    testCaseNo: number,

    
    isSample: boolean;

    error?: string;

    compile_output?: string;

    logOut?: string;

    explanation: string;
};



export interface IProblem {
    _id?: string;
    title: string;
    problemId: string;
    difficulty: string;
    timeLimit: number;
    memoryLimit: number;
    tags: string;
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string;
    hint: string;
    testCases: typeTestCase[];
    functionSignatureMeta: {
        name: string,
        parameters: string[],
        returnType: { type: string }
    }
    starterCode: Record<string, string>;
    acceptance:{submitted: number, accepted: number},
    status: boolean;
    updatedAt: string,
    isPremium: boolean;


}