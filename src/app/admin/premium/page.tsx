"use client";
import AdminNavbar from "@/components/Admin/NavBar";
import React from "react";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";

interface Plan {
  id: string;
  name: string;
  price: number;
  cycle: string;
  features: string[];
  trial: number;
  status: string;
  activeUsers?: number;
  revenue?: number;
}

interface FeatureToggle {
  name: string;
  enabled: boolean;
  description: string;
}

const PremiumPlanManagement = () => {
  const [plans, setPlans] = useState<Record<string, Plan>>({
    monthly: {
      id: "monthly",
      name: "Monthly Premium",
      price: 19.99,
      cycle: "monthly",
      features: [
        "Access to all premium problems",
        "Advanced problem hints",
        "Premium-only contests",
      ],
      trial: 7,
      status: "active",
      activeUsers: 842,
      revenue: 16831.58,
    },
    annual: {
      id: "annual",
      name: "Annual Premium",
      price: 199.99,
      cycle: "annual",
      features: [
        "All monthly premium features",
        "2 months free",
        "Priority support",
      ],
      trial: 14,
      status: "active",
      activeUsers: 406,
      revenue: 81195.94,
    },
  });

  // const [features, setFeatures] = useState<FeatureToggle[]>([
  //   {
  //     name: "Premium Problems",
  //     enabled: true,
  //     description: "Exclusive access to advanced problem sets and solutions",
  //   },
  //   {
  //     name: "Premium Contests",
  //     enabled: true,
  //     description: "Special contests with higher rewards and recognition",
  //   },
  //   {
  //     name: "Advanced Analytics",
  //     enabled: true,
  //     description: "Detailed performance metrics and insights",
  //   },
  // ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [modalFeatures, setModalFeatures] = useState<
    { text: string; enabled: boolean }[]
  >([]);

  const showCreatePlanModal = () => {
    setCurrentPlan(null);
    setModalFeatures([
      { text: "", enabled: true },
      { text: "", enabled: true },
    ]);
    setShowModal(true);
  };

  const editPlan = (planId: string) => {
    const plan = plans[planId];
    setCurrentPlan(plan);
    setModalFeatures(plan.features.map((f) => ({ text: f, enabled: true })));
    setShowModal(true);
  };

  const closePlanModal = () => {
    setShowModal(false);
    setCurrentPlan(null);
  };

  const addFeatureInput = () => {
    setModalFeatures([...modalFeatures, { text: "", enabled: true }]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...modalFeatures];
    newFeatures.splice(index, 1);
    setModalFeatures(newFeatures);
  };

  const updateFeature = (index: number, text: string) => {
    const newFeatures = [...modalFeatures];
    newFeatures[index].text = text;
    setModalFeatures(newFeatures);
  };

  const toggleFeatureEnabled = (index: number) => {
    const newFeatures = [...modalFeatures];
    newFeatures[index].enabled = !newFeatures[index].enabled;
    setModalFeatures(newFeatures);
  };

  // const togglePremiumFeature = (index: number) => {
  //   const newFeatures = [...features];
  //   newFeatures[index].enabled = !newFeatures[index].enabled;
  //   setFeatures(newFeatures);
  // };

  const savePlan = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      id: currentPlan?.id || `plan_${Date.now()}`,
      name: (document.getElementById("planName") as HTMLInputElement).value,
      price: parseFloat(
        (document.getElementById("planPrice") as HTMLInputElement).value
      ),
      cycle: (document.getElementById("planCycle") as HTMLSelectElement).value,
      trial:
        parseInt(
          (document.getElementById("trialPeriod") as HTMLInputElement).value
        ) || 0,
      status: (document.getElementById("planStatus") as HTMLSelectElement)
        .value,
      features: modalFeatures
        .filter((f) => f.text.trim())
        .map((f) => f.text.trim()),
      activeUsers: currentPlan?.activeUsers || 0,
      revenue: currentPlan?.revenue || 0,
    };

    if (currentPlan) {
      setPlans({
        ...plans,
        [currentPlan.id]: formData,
      });
    } else {
      setPlans({
        ...plans,
        [formData.id]: formData,
      });
    }

    closePlanModal();
  };

  const deletePlan = () => {
    if (currentPlan) {
      const newPlans = { ...plans };
      delete newPlans[currentPlan.id];
      setPlans(newPlans);
      closePlanModal();
    }
  };

  return (
    <div className="">
      {/* Header */}
      <AdminNavbar />

      {!showModal && (
        <>
          <div className="content-area  bg-[#111111] rounded-lg  overflow-hidden mb-8">
            <div className="flex justify-between pb-12">
              <h1 className="text-2xl   font-bold neon-text">Premium</h1>
              <div
                className="flex items-center gap-2"
                onClick={() => showAddProblem(true)}
              >
                <button
                  onClick={showCreatePlanModal}
                  className="px-4 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df] transition duration-300"
                >
                  <FaPlus className="inline mr-2" />
                  Create New Plan
                </button>
              </div>
            </div>
            <div className="neon-border">
              <div className="  w-full bg-black px-6 py-3 relative border-b border-[#0ef]">
                <div className="text-[#0ef] font-bold ml-20">
                  Active Subscription Plans
                </div>
              </div>
              <div className="p-2 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.values(plans).map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-black rounded-lg border border-gray-800 p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#0ef]">
                            {plan.name}
                          </h3>
                          <div className="text-3xl font-bold mt-2">
                            ${plan.price}
                            <span className="text-sm text-gray-400">
                              /{plan.cycle}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editPlan(plan.id)}
                            className="p-2 text-[#0ef] hover:text-white"
                          >
                            <FaEdit />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white">
                            <FaEllipsisV />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        {plan.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center text-gray-300"
                          >
                            <FaCheck className="text-green-400 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm text-gray-400 border-t border-gray-800 pt-4">
                        <div>
                          Active Users:{" "}
                          <span className="text-white">{plan.activeUsers}</span>
                        </div>
                        <div>
                          Revenue:{" "}
                          <span className="text-green-400">
                            ${plan.revenue?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 


      <div className="bg-[#111111] rounded-lg border border-[#0ef] [box-shadow:0_0_10px_#0ef] overflow-hidden mb-8">
        <div className="bg-black px-6 py-3 relative border-b border-[#0ef]">
          <div className="text-[#0ef] font-bold ml-20">Premium Features</div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-black rounded-lg border border-gray-800 p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">{feature.name}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={feature.enabled}
                      onChange={() => togglePremiumFeature(i)}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0ef]"></div>
                  </label>
                </div>
                <div className="text-sm text-gray-400">
                  {feature.description}
                </div>
              </div>
                         ))}
                                  </div>
        </div>
      </div> */}
        </>
      )}
      {/* Create/Edit Plan Modal */}
      {showModal && (
        <div className="content-area bg-black bg-opacity-90   flex items-center justify-center z-50">
          <div className="bg-[#111111] rounded-lg border border-[#0ef] [box-shadow:0_0_10px_#0ef] w-full mx-4 ">
            <div className="bg-black px-6 py-3 relative border-b border-[#0ef]">
              <div className="text-[#0ef] font-bold ml-20">
                {currentPlan ? `Edit ${currentPlan.name}` : "Create New Plan"}
              </div>
              <button
                onClick={closePlanModal}
                className="absolute right-4 top-3 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={savePlan} className="space-y-6">
                {/* Plan Name */}
                <div>
                  <label className="block text-gray-400 mb-2">Plan Name</label>
                  <input
                    type="text"
                    id="planName"
                    defaultValue={currentPlan?.name || ""}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-2 rounded focus:border-[#0ef] focus:outline-none"
                    placeholder="e.g. Monthly Premium"
                    required
                  />
                </div>

                {/* Price and Cycle */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        id="planPrice"
                        defaultValue={currentPlan?.price || ""}
                        step="0.01"
                        min="0"
                        className="w-full bg-black border border-gray-800 text-white pl-8 pr-4 py-2 rounded focus:border-[#0ef] focus:outline-none"
                        placeholder="19.99"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Billing Cycle
                    </label>
                    <select
                      id="planCycle"
                      defaultValue={currentPlan?.cycle || "monthly"}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-2 rounded focus:border-[#0ef] focus:outline-none"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-gray-400 mb-2">Features</label>
                  <div className="space-y-3 mb-4">
                    {modalFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={() => toggleFeatureEnabled(i)}
                          className="rounded text-[#0ef]"
                        />
                        <input
                          type="text"
                          value={feature.text}
                          onChange={(e) => updateFeature(i, e.target.value)}
                          className="flex-1 bg-black border border-gray-800 text-white px-4 py-2 rounded"
                          placeholder="Enter feature"
                        />
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-300 px-2"
                          onClick={() => removeFeature(i)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addFeatureInput}
                    className="text-[#0ef] hover:text-white text-sm mt-2"
                  >
                    <FaPlus className="inline mr-1" />
                    Add Feature
                  </button>
                </div>

                {/* Trial Period and Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">
                      Trial Period (days)
                    </label>
                    <input
                      type="number"
                      id="trialPeriod"
                      defaultValue={currentPlan?.trial || 7}
                      min="0"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-2 rounded focus:border-[#0ef] focus:outline-none"
                      placeholder="7"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Status</label>
                    <select
                      id="planStatus"
                      defaultValue={currentPlan?.status || "active"}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-2 rounded focus:border-[#0ef] focus:outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 pt-4 border-t border-gray-800">
                  {currentPlan && (
                    <button
                      type="button"
                      onClick={deletePlan}
                      className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                    >
                      <FaTrashAlt className="inline mr-2" />
                      Delete Plan
                    </button>
                  )}
                  <div className="flex gap-4 ml-auto">
                    <button
                      type="button"
                      onClick={closePlanModal}
                      className="px-4 py-2 bg-transparent border border-gray-600 text-gray-400 rounded hover:border-gray-500 hover:text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0ef] text-black rounded hover:bg-[#0df]"
                    >
                      Save Plan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPlanManagement;
