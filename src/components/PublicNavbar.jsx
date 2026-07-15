import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const PublicNavbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-base-950/90 backdrop-blur border-b border-base-800">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TrendingUp className="text-accent-green" size={22} />
          <span className="font-bold text-lg text-white">StockFolio</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white px-3 py-2">
            Login
          </Link>
          <Link to="/register" className="btn-primary text-sm">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;
