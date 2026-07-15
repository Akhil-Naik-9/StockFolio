import { Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const DashboardNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-base-900/95 backdrop-blur border-b border-base-700 px-4 py-3">
      <button
        className="lg:hidden text-slate-300"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="hidden lg:block text-slate-400 text-sm">
        Welcome back, <span className="text-white font-medium">{user?.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-base-800 border border-base-600 rounded-full px-3 py-1.5">
          <User size={16} className="text-slate-400" />
          <span className="text-sm text-slate-200">{user?.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
