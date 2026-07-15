import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Eye,
  Receipt,
  BarChart3,
  UserCircle,
  Info,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/watchlist", label: "Watchlist", icon: Eye },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/about", label: "About Project", icon: Info },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 lg:static top-0 left-0 h-full w-64 bg-base-900 border-r border-base-700 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-base-700">
          <TrendingUp className="text-accent-green" size={24} />
          <span className="font-bold text-lg text-white">StockFolio</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-blue/15 text-accent-blue"
                    : "text-slate-400 hover:bg-base-800 hover:text-slate-200"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-base-700 text-xs text-slate-500">
          B.Tech CSE Mini Project
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
