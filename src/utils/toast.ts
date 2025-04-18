import { toast } from "react-toastify"


export const toastSuccess=(message:string)=>{
      toast.success(message,{
                    position:"top-right",
                    autoClose:2000,
                    style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"}
                  })

    
}

export const toastError=(messages:string)=>{
    toast.error(messages,{
        position:"top-right",
      autoClose:3000,
      style:{color:" #0ef", textShadow: "0 0 8px #0ef", backgroundColor:"#000",border: "1px solid #0ef"},
      
    })
}