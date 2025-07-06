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


export const toastLite = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    style: {
      background: "#fff",
      color: "#333",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      borderRadius: "6px",
      fontSize: "14px",
      padding: "10px 16px",
    },
    icon: false,
  });
};