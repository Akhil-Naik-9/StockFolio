import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-950 flex flex-col items-center justify-center px-4 text-center">
      <TrendingUp className="text-accent-green mb-4" size={36} />
      <h1 className="text-5xl font-extrabold text-white mb-2">404</h1>
      <p className="text-slate-400 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
