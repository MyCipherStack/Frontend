import DashBoard from "@/components/Admin/DashBoards"
import AdminNavbar from "@/components/Admin/NavBar"


let AdminDashBoard=()=>{
    return (
        <>
        <AdminNavbar status={"dashboard"}></AdminNavbar>
        <DashBoard></DashBoard>
        
        </>
    )
}


export default AdminDashBoard