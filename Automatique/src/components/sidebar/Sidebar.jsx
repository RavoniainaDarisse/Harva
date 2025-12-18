// Sidebar.jsx
import { Search, User, FileText, DollarSign } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="h-screen w-[100%]  text-white flex flex-col">
      {/* Top section */}
      <div className="bg-[#2c2c2c] p-6 pl-15">
        <h1 className="text-[22px] mt-[14%] font-400 mb-4">Toolbar</h1>
        <div className="flex my-[14%] items-center gap-2 text-sm text-gray-300 border-b border-gray-600 pb-2">
  <Search className="w-5 h-5" />

  <input
    type="text"
    placeholder="Search..."
    className="w-full bg-transparent text-[13px] text-gray-300 placeholder-gray-500 focus:outline-none"
  />
</div>

      </div>

      {/* Bottom section */}
      <div className="flex flex-wrap gap-10 p-3 text-sm text-gray-300 ">

        <div className="flex hover:bg-[#FEFE90] transition-all w-10 px-10 py-5 duration-500 ease-out hover:text-black  w-30 h-30 flex-col justify-center items-center">
          <User className="w-6 h-6 mb-1 aspect-auto" />
          <span>Profil</span>
        </div>
        <div className="flex hover:bg-[#FEFE90] w-10  transition-all duration-500 ease-out hover:text-black flex-col w-30 h-30 px-10 justify-center items-center">
          <FileText className="w-6 h-6 mb-1" />
          <span>Notes</span>
        </div>
        <div className="flex hover:bg-[#FEFE90] transition-all w-10 px-10 duration-500 ease-out   hover:text-black flex-col w-30 h-30 justify-center items-center">
          <DollarSign className="w-6 h-6 mb-1" />
          <span>Revenue</span>
        </div>
      </div>
    </div>
  );
}
