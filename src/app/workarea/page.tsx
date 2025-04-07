"use client"

import { useState, useEffect, useRef } from 'react';
import "@/app/workarea/page.css"
import VerificationInput from '@/components/PasswordComponent.tsx/EnteOtp';

const VerificationStep = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0] font-mono">
    <main className="flex-grow flex items-center justify-center px-4 py-12">
    <div className="bg-[#111111] rounded-lg border border-[#0ef] shadow-[0_0_10px_rgba(0,238,255,0.5)] w-96 max-w-md overflow-hidden relative">
    <div className="p-6">


    <VerificationInput/>


    </div>
    </div>
    </main>
    </div>
    </>
  )
};

export default VerificationStep;