// [
  // Best value tag show when name contain anuval
// ]


import { getAllPlanDetails, subscribePlan } from '@/service/PremiumServices';
import { IRazorpayHandler, verifyPayment } from '@/service/verifyPayment';
import { toastError, toastSuccess } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaCrown,  FaChartLine } from 'react-icons/fa';



 export interface Plan {
    _id: string;
    name: string;
    price: number;
    cycle: string;
    features:{ text: string; enabled: boolean }[];
    trial: number;
    status: string;
    activeUsers?: number;
    revenue?: number;
  }




  
  export default function Premium() {

    const features = [
    {
      icon: FaCheckCircle,
      title: "Premium Problems",
      description: "500+ premium problems from real tech interviews"
    },
    {
      icon: FaCrown,
      title: "Exclusive Contests",
      description: "Compete in premium-only contests with bigger rewards"
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "Detailed performance tracking and progress insights"
    }
  ]

  const [plans,setPlans]=useState<Plan[]>([])

  useEffect(()=>{
    console.log("asdf");
    
      try{
        const  getData=async()=>{
            
            const response=await getAllPlanDetails()
            console.log("okeeeyyy useEffect");
            
            console.log(response.data.plans);
            setPlans(response.data.plans)
          }
          getData()  
        }catch(error){
          toastError("error on fetching data")
        }
  },[])

  
  let subscribe=async(id:string)=>{


    const loadRazorpayScript=():Promise<boolean>=>{
      return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src="https://checkout.razorpay.com/v1/checkout.js"
        script.onload=()=>resolve(true)
        script.onerror=()=>resolve(false)
        document.body.appendChild(script)
      })
    }
  const loadScript=await loadRazorpayScript()
  if(!loadScript){
    toastError("faild to load Razorpay")
  return }
    try{

      const response=await subscribePlan(id)
      
      let orderId=response.data.orderId

      
      const options=(
     {   
      key:process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount:1000,
        currency:"INR",
        name:"CipherStack",
        description:"testAPI",
        order_id:orderId,
        handler:async(response:IRazorpayHandler)=>{
          console.log(response,"response from razorpay");
          
         const res=await verifyPayment(response)
         if(res.status){toastSuccess("payement success")}else{
          toastError("payment failed try again")
         }
         console.log(status);
         
        },
        prefill:{
          name:"cipherStack(Dev_Akhil)",
          email:"devakhil@gmail.com",
          contact:"+918138838789"
        },
        theme:{
          color:"#0000"
        },
        modal:{    //handle close that window user
          ondismiss:function(){
            toastError("payment closed")
          }
        }
      }

      
      
    )

    const razorpay=new (window as any).Razorpay(options)

    razorpay.on("payment.failed",function(response){
      toastError("payment failed")
      console.log("i want to log this failer in to database");
      
    })



    razorpay.open()



      

    }catch(err:unknown){
      console.log(err);
      
      if(err instanceof Error)
      toastError(err.message)
    }
    
     
  }


  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-black ">
    
      <div className="container mx-auto px- ">
        <div className="flex flex-col md:flex-row h-screen justify-center items-center  gap-10">
          {/* Text Content */}
          <div className="w-full md:w-1/2 ">
            <h2 className="text-3xl font-bold mb-4 text-[#0ef]">
              <FaCrown className="inline mr-2" />
              Upgrade to Premium
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Unlock exclusive features and accelerate your coding journey
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <feature.icon className="text-[#0ef] mt-1 mr-3" />
                  <div>
                    <h4 className="font-bold">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Pricing Cards */}
          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="bg-black rounded-lg border border-gray-800 p-6 relative hover:border-[#0ef] transition-all duration-300">
                {plan?.name?.includes("anual") && (
                  <div className="absolute -top-3 right-3 bg-[#0ef] text-black text-xs px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0ef] mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold mt-2 mb-4">
                  ${plan.price}
                  <span className="text-sm text-gray-400">/{plan.period}</span>
                </div>
                <div className="space-y-3 mb-4">
                  {plan.features.map((feature, idx) => (
                    <div key={feature._id} className="flex items-center text-gray-300">
                      <FaCheckCircle className="text-green-400 mr-2" />
                      {feature.text}
                    </div>
                  ))}
                </div>
                <button onClick={()=>subscribe(plan._id)} className="w-full px-4 py-2 bg-[#0ef] text-black rounded font-bold hover:bg-[#0df] transition duration-300">
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
    
  );
}