"use client"

import { decrement, increament } from "@/features/counterSlice"
import { createContext, useContext, useState } from "react"
import { useFormContext } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

// import { loginSuccess, logOut } from "@/features/auth/userAuthSlice"
// import React, { forwardRef, useCallback, useMemo, useRef, useState ,} from "react"
// import { useDispatch, useSelector } from "react-redux"




// const  Week=()=>{

//     let [name,setName]=useState("")
//     let [number,setNumber]=useState(1)
//     let [isValid,setValid]=useState(false)
//     const [position,setPostion]=useState({})


//     const user=useSelector(state=>state.auth.user)

//     const dispatch=useDispatch()
//     const mycallback=useCallback((e)=>{
//         setName(e.target.value)
//     },[])

//     const calutaltion=useMemo(()=>{
//         return number*1000000
        
//     },[number])

//     const childRef=useRef(0)
    
//     const handler=()=>{
        
//         setName(childRef.current.value)

//         dispatch(loginSuccess({id:"e",name,email:"e"}))
//     }
//     let toggle=()=>{
//         setValid(!isValid)
//         console.log("toggle",isValid);
//         dispatch(logOut())
        
        
//     }

//     const handlerMouseMove=(e)=>[
//         setPostion({x:e.clientX,y:e.clientY})
//     ]
    
//     return (
//         <>
//         <div  onMouseMove={handlerMouseMove} className="h-screen w-full " onContextMenu={(e)=>e.preventDefault()} >
//             <h1 className="text-5xl text-center text-green-200" onDoubleClick={(e)=>alert("double clicked")}>workout</h1>
//             <div className="text-center text-3xlxl">user:{user?.name}</div>
//             <input type="text" onChange={mycallback} />
//             <div>{name}</div>
//             <div onClick={handler}>childRef value  {name}</div>
//             <input type="checkbox" checked={isValid} />
//           <button onClick={()=>toggle()}>click to toggle</button>

//             <button>{calutaltion}  calutaltionData</button>

//             <div className="text-center">mouse position x:{position.x}y:{position.y}</div>


//             <NavBar ref={childRef}></NavBar>
//             <MemorisedChild/>
//         </div>
//         </>
//     )


// }

// export default Week




// const  NavBar=forwardRef((pros,ref)=>{
//     return (
//         <>
//         <h1>NAVBAR</h1>
//         <input type="text" ref={ref} />
//         </>
//     )
// })


//  function useCustomToggle(value:boolean){
//     const [status,setToggle]=useState(value)

//     const toggleHandler=()=>{
//         setToggle(prev=>!prev)
//     }

//     return [status,toggleHandler]

//  }


// const  Child=()=>{

//     const [status,toggleHandler]=useCustomToggle(false)

//     console.log(status);
    


//     return (
//         <>
        
//         <h1>NAVBAR</h1>
//         <h1>status:{status===true}</h1>
//         <input type="checkbox" checked={status} />
//         <button onClick={()=>toggleHandler()}>Toggle</button>
//         </>
//     )
// }

//  const MemorisedChild =React.memo(Child)





// import {increment,decrement} from "@/features/counterSlice"




// const Week=()=>{

//     const dispatch=useDispatch()
//     const couter=useSelector((state)=>state.counter)
//     return (
//         <>
//         <div className="">

//         <h1 className=" text-5xl">Couter {couter.count}</h1>
//         <button onClick={()=>dispatch(decrement(null))} >-</button>
//         <button onClick={()=>dispatch(increament(null))} >+</button>
//         </div>

//         </>
//     )


// }

// export default Week


 const UserContex=createContext({})

const Week=()=>{
    
    const [name,setName]=useState("akhil")
    return (

        <>
    <UserContex.Provider value={{name}}>
        <div>profile page</div>
        <Nav></Nav>
    </UserContex.Provider>
        </>
    )
}


const Nav=()=>{
    
    const user=useContext(UserContex)

    return (
        <>
        <div>nav</div>
        <div>{user.name}</div>

        </>
    )
}



export default Week