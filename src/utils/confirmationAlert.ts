import Swal from "sweetalert2"


export const confirmationAlert=async(status:string)=>{
    
        const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to  ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, keep it',
      background: '#000', // black background
      color: '#00f0ff',
      buttonsStyling: false,
      customClass: {
        popup: 'bg-black text-cyan-500', // Black background for the popup with cyan text
        title: 'text-white', // White title text
        confirmButton: ' hover:bg-neon-purple-dark text-white font-semibold px-5 py-2 rounded-lg', // Neon purple button
        cancelButton: 'bg-neon-red hover:bg-neon-red-dark text-white font-semibold px-5 py-2 rounded-lg' // Neon red cancel button
      }
        })

        return result.isConfirmed
}