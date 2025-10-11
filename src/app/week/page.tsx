"use client"

import React, { useEffect, useRef } from 'react';


function WeekPage() {

 const myRef=useRef(0);




    const handleIncrement = () => {

       const intervalId = setInterval(() => {
            if( myRef.current.value>=10){
                clearInterval(intervalId);
                return;
            }
            console.log("Interval running",myRef.current.value);
            myRef.current.value=Number(myRef.current.value)+1;

        },1000);   

    }


    const handleDecrement = () => {

        const intervalId = setInterval(() => {
            if( myRef.current.value<=0){
                clearInterval(intervalId);
                return;
            }   
            console.log("Interval running",myRef.current.value);
            myRef.current.value=Number(myRef.current.value)-1;

        },1000);

    }

    return( <>
    <div>Week Page</div>
    <div onClick={() => handleIncrement()}>+</div>
    <input type="text" ref={myRef} />

    <div onClick={() => handleDecrement()}>-</div>
    </>);
}


export default WeekPage;