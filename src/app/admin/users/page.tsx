import AdminNavbar from "@/components/Admin/NavBar"
import UserManagement from "@/components/Admin/UserManagement"



let Users=()=>{
    return (
        <>
        <AdminNavbar status={"users"}></AdminNavbar>
        <UserManagement></UserManagement>
        </>
    )
}


export default Users