// components/Premium.js
import { getAllPlanDetailsForUsers } from '@/service/PremiumServices';
import { toastError } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaCrown, FaGem, FaChartLine } from 'react-icons/fa';





 export interface Plan {
    _id?: string;
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
  // const [plans, setPlans] = useState<Plan[]>([]);

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

  useEffect(()=>{
      try{
        const  getData=async()=>{
            
            const response=await getAllPlanDetailsForUsers()
            console.log(response.data.plans);
            setPlans(response.data.plans)
            console.log(response);
          }
          // getData()  
        }catch(error){
          toastError("error on fetching data")
        }
  })

  const plans = [
    {
      title: "Monthly Premium",
      price: "19.99",
      period: "month",
      badge: false,
      features: [
        "All premium features",
        "Cancel anytime"
      ]
    },
    {
      title: "Annual Premium",
      price: "199.99",
      period: "year",
      badge: true,
      features: [
        "All premium features",
        "Save 17% ($40)"
      ]
    },
    {
      title: "Monthly Premium",
      price: "19.99",
      period: "month",
      badge: false,
      features: [
        "All premium features",
        "Cancel anytime"
      ]
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="w-full md:w-1/2">
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
                {plan.badge && (
                  <div className="absolute -top-3 right-3 bg-[#0ef] text-black text-xs px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0ef] mb-2">
                  {plan.title}
                </h3>
                <div className="text-3xl font-bold mt-2 mb-4">
                  ${plan.price}
                  <span className="text-sm text-gray-400">/{plan.period}</span>
                </div>
                <div className="space-y-3 mb-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <FaCheckCircle className="text-green-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <button className="w-full px-4 py-2 bg-[#0ef] text-black rounded font-bold hover:bg-[#0df] transition duration-300">
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