import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <TrendingUp className="text-accent-green" size={26} />
          <span className="font-bold text-xl text-white">StockFolio</span>
        </div>

        <div className="card p-6">
          <h1 className="text-xl font-bold text-white mb-1">Create your account</h1>
          <p className="text-sm text-slate-400 mb-5">Start tracking your stock portfolio today.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="label-text">Full Name</label>
              <input className="input-field" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="label-text">Email</label>
              <input
                className="input-field"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="label-text">Confirm Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-slate-400 text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-blue hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
