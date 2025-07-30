// [
// Best value tag show when name contain anuval
// ]

import { getAllPlanDetails, getSubcriptionData, subscribePlan } from '@/service/PremiumServices';
import { IRazorpayHandler, verifyPayment } from '@/service/verifyPayment';
import { RootState } from '@/store/store';
import { toastError, toastSuccess } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaCrown, FaChartLine, FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export interface Plan {
  _id: string;
  name: string;
  price: number;
  cycle: string;
  features: { text: string; enabled: boolean }[];
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

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch all plans
        const plansResponse = await getAllPlanDetails();
        console.log("paln", plansResponse.data.plans)
        setPlans(plansResponse.data.plans);

        // Fetch current subscription
        try {
          if (user) {

            const subscriptionData = await getSubcriptionData();
            console.log("subcriotion Data", subscriptionData.data.data.planId);

            if (subscriptionData && subscriptionData.data.data.planId) {
              setCurrentPlanId(subscriptionData.data.data.planId);
            }

          }
          // if (subscriptionResponse.data && subscriptionResponse.data.plan) {
          //   setCurrentPlanId(subscriptionResponse.data.plan._id);
          // }
        } catch (subscriptionError) {
          // User might not have a subscription, which is fine
          console.log("No active subscription found");
        }
      } catch (error) {
        toastError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const subscribe = async (id: string) => {
    if (id === currentPlanId) {
      toastError("You are already subscribed to this plan");
      return;
    }

    const loadRazorpayScript = (): Promise<boolean> => {
      return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = process.env.NEXT_PUBLIC_RAZORPAY_SCRIPT_URL || "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
      })
    }

    const loadScript = await loadRazorpayScript()
    if (!loadScript) {
      toastError("Failed to load Razorpay")
      return
    }

    try {
      const response = await subscribePlan(id)
      let orderId = response.data.orderId

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: 1000,
        currency: "INR",
        name: "CipherStack",
        description: "testAPI",
        order_id: orderId,
        handler: async (response: IRazorpayHandler) => {
          const res = await verifyPayment(response)
          if (res.status) {
            toastSuccess("Payment success");
            setCurrentPlanId(id); // Update current plan after successful payment
          } else {
            toastError("Payment failed try again")
          }
        },
        prefill: {
          name: "cipherStack(Dev_Akhil)",
          email: "devakhil@gmail.com",
          contact: "+918138838789"
        },
        theme: {
          color: "#0000"
        },
        modal: {
          ondismiss: function () {
            toastError("Payment closed")
          }
        }
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.on("payment.failed", function (response: unknown) {
        toastError("Payment failed")
        console.log(response);

      })
      razorpay.open()
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error)
        toastError(err.message)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-black min-h-screen flex items-center justify-center">
        <div className="text-[#0ef] text-xl">Loading plans...</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* Text Content */}
          <div className="w-full md:w-1/2 mt-18">
            <h2 className="text-3xl font-bold mb-4 text-[#0ef]">
              <FaCrown className="inline mr-2" />
              {currentPlanId ? 'Your Premium Membership' : 'Upgrade to Premium'}
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {currentPlanId
                ? 'Manage your premium subscription and enjoy exclusive features'
                : 'Unlock exclusive features and accelerate your coding journey'}
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
              <div
                key={index}
                className={`flex flex-col rounded-lg border p-6 relative transition-all duration-300 ${plan._id === currentPlanId
                    ? 'border-[#0ef] bg-[#0ef]/10'
                    : 'border-gray-800 hover:border-[#0ef] bg-black'
                  }`}
              >
                {plan?.name?.toLowerCase().includes("annual") && (
                  <div className="absolute -top-3 right-3 bg-[#0ef] text-black text-xs px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                {plan._id === currentPlanId && (
                  <div className="absolute -top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    CURRENT PLAN
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0ef] mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold mt-2 mb-4 flex ">
                  <FaRupeeSign className='size-6 mt-1' />
                     {plan.price}
                  <span className="text-sm mt-2 text-gray-400">/{plan.cycle}</span>
                </div>
                <div className="space-y-3 mb-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <span><FaCheckCircle className="text-green-400 mr-2" /></span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => subscribe(plan._id)}
                  className={`mt-auto w-full px-4 py-2 rounded font-bold cursor-pointer transition duration-300 ${plan._id === currentPlanId
                      ? 'bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-[#0ef] text-black hover:bg-[#0df]'
                    }`}
                  disabled={plan._id === currentPlanId}
                >
                  {plan._id === currentPlanId ? 'Current Plan' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}