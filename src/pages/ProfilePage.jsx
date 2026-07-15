import { useState } from "react";
import { UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";
import authService from "../services/authService";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    college: user?.college || "",
    course: user?.course || "",
  });
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const updated = await authService.updateProfile(form);
      updateUser(updated);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.password !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setSavingPassword(true);
    try {
      const updated = await authService.updateProfile({ password: passwordForm.password });
      updateUser(updated);
      toast.success("Password changed");
      setPasswordForm({ password: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold text-white mb-1">Profile</h1>
      <p className="text-slate-400 text-sm mb-6">Manage your account details.</p>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-accent-blue/15 text-accent-blue flex items-center justify-center mb-3">
            <UserCircle size={44} />
          </div>
          <p className="font-semibold text-white">{user?.name}</p>
          <p className="text-sm text-slate-400">{user?.email}</p>
          {user?.college && <p className="text-xs text-slate-500 mt-2">{user.college}</p>}
          {user?.course && <p className="text-xs text-slate-500">{user.course}</p>}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleProfileSubmit} className="card p-5 space-y-3">
            <h2 className="font-semibold text-white mb-1">Edit Profile</h2>
            <div>
              <label className="label-text">Full Name</label>
              <input className="input-field" name="name" value={form.name} onChange={handleProfileChange} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">College</label>
                <input className="input-field" name="college" value={form.college} onChange={handleProfileChange} />
              </div>
              <div>
                <label className="label-text">Course</label>
                <input className="input-field" name="course" value={form.course} onChange={handleProfileChange} />
              </div>
            </div>
            <button type="submit" disabled={savingProfile} className="btn-primary">
              {savingProfile ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <form onSubmit={handlePasswordSubmit} className="card p-5 space-y-3">
            <h2 className="font-semibold text-white mb-1">Change Password</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">New Password</label>
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
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
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  minLength={6}
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={savingPassword} className="btn-primary">
              {savingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
