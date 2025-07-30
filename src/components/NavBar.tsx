
// import Link from "next/link";

// interface NavbarProps {
//   title: string;
//   links?: { name: string; href: string }[];
// }

// export default function Navbar({ title, links }: NavbarProps) {
  
//   return (
//     <nav className="w-full bg-black bg-opacity-90 border-b border-[#0ef] fixed top-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Dynamic Title */}
//         <div className="text-xl neon-text">
//           {title} <i className="fas fa-terminal"></i>
//         </div>

//         {/* Navigation Links for Home Page */}
//         {links ? (
//           <div className="flex space-x-6">
//             {links.map((link) => (
//               <Link key={link.href} href={link.href} className="neon-text hover:text-[#0ef] transition-colors">
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         ) : (
//           /* Login/Signup Button */
//           <Link href={title === "Login" ? "/signup" : "/login"} className="neon-text hover:text-[#0ef] transition-colors"> 
//             <i className={`fas ${title === "Login" ? "fa-user-plus" : "fa-sign-in-alt"} mr-2`}></i>
//             {title === "Login" ? "Sign Up" : "Login"}
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// }
