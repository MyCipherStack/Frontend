"use client"
import Header from '@/components/Header';
import ProblemTable from '@/components/Problems/ProblemTable';
import ReportButton from '@/components/Report';
import { useRouter } from 'next/navigation';

const ProblemsPage = () => {  


   const router=useRouter()
   
  const openProblem=async(name:string)=>{  
   
    router.push(`/problemDetails/${name}`)

  // const problemData=await getDataService("/p")



  }

  return (
    <div className="min-h-screen ">
     <Header></Header>
      
      <div className="container mx-auto px-4 pt-24 pb-8">
      

      
      </div>
      <main>
        <ProblemTable openProblem={openProblem}></ProblemTable>
      </main>
      <ReportButton/>
      <footer className="w-ful border-t border-[#0ef]">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
          <p>© 2024 CipherStack</p>
        </div>
      </footer>
    </div>
  );
};

export default ProblemsPage;