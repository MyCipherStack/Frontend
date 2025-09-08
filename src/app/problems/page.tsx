"use client"
import Header from '@/components/Header';
import ProblemTable from '@/components/Problems/ProblemTable';
import ReportButton from '@/components/Report';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FourSquare } from 'react-loading-indicators';

const ProblemsPage = () => {


  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const openProblem = async (name: string) => {

    setIsLoading(true)

    router.push(`/problemDetails/${name}`)

    // const problemData=await getDataService("/p")

    // setIsLoading(false)


  }

  return (
    <div className="min-h-screen ">
      <Header></Header>

      <div className="container mx-auto px-4 pt-24 pb-8">



      </div>
      <main>
        <ProblemTable openProblem={openProblem}></ProblemTable>
      </main>
      <ReportButton />
      <footer className="w-ful border-t border-[#0ef]">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
              <FourSquare color="#00ebff" size="small" text="loading page" textColor="#NaNNaNNaN" />
            </div>)
          }
        </div>
      </footer>
    </div>
  );
};

export default ProblemsPage;