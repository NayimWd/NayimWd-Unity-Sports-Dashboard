import cn from "../../utils/cn"

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table = ({children, className}: TableProps) => {
  return (
    <div className='bg-surface w-full overflow-x-auto'>
      <table className={cn("w-full text-sm border-collapse font-inter", className)}>
        {children}
      </table>
    </div>
  )
}

export default Table

// import { useState } from "react";
// import { ChevronDown, ChevronUp, Search } from "lucide-react";

// const dummyData = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "User" },
//   { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Moderator" },
//   { id: 5, name: "Charlie White", email: "charlie@example.com", role: "Admin" },
//   { id: 6, name: "Diana Prince", email: "diana@example.com", role: "User" },
// ];

// const roles = ["All", "Admin", "User", "Moderator"];

// export default function ElegantTable() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("All");
//   const [sortAsc, setSortAsc] = useState(true);
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 4;

//   const filteredData = dummyData
//     .filter((item) =>
//       (filterRole === "All" || item.role === filterRole) &&
//       (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.email.toLowerCase().includes(searchTerm.toLowerCase()))
//     )
//     .sort((a, b) => {
//       if (sortAsc) return a.name.localeCompare(b.name);
//       return b.name.localeCompare(a.name);
//     });

//   const paginatedData = filteredData.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   return (
//     <div className="px-4 py-6 md:px-8 font-inter text-font">
//       <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
//         {/* Search */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
//           <input
//             type="text"
//             placeholder="Search by name or email"
//             className="pl-10 pr-4 py-2 border border-inputBorder rounded-md bg-surface text-font placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Filter */}
//         <select
//           className="border border-inputBorder rounded-md bg-surface text-font py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           {roles.map((role) => (
//             <option key={role} value={role}>
//               {role}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg shadow-sm">
//         <table className="min-w-full table-auto bg-surface border border-border">
//           <thead className="bg-subSurface text-subtext">
//             <tr>
//               <th className="text-left px-4 py-3">ID</th>
//               <th className="text-left px-4 py-3 cursor-pointer" onClick={() => setSortAsc(!sortAsc)}>
//                 Name
//                 {sortAsc ? <ChevronUp className="inline ml-1 h-4 w-4" /> : <ChevronDown className="inline ml-1 h-4 w-4" />}
//               </th>
//               <th className="text-left px-4 py-3">Email</th>
//               <th className="text-left px-4 py-3">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((item) => (
//                 <tr key={item.id} className="border-t border-border hover:bg-subSurface/60">
//                   <td className="px-4 py-3">{item.id}</td>
//                   <td className="px-4 py-3">{item.name}</td>
//                   <td className="px-4 py-3">{item.email}</td>
//                   <td className="px-4 py-3">{item.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="px-4 py-6 text-center text-muted" colSpan={4}>
//                   No matching results.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-6">
//         <p className="text-sm text-muted">
//           Showing {paginatedData.length} of {filteredData.length} results
//         </p>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-3 py-1.5 bg-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-3 py-1.5 bg-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
