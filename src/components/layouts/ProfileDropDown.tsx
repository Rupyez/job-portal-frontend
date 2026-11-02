
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

import { logout } from "../../features/auth/authSlice";
import type { AuthUser } from "../../features/auth/types/auth.types";
import { logoutUser } from "../../services/authService";
import { useAppDispatch, useAppSelector } from "../../app/hook";

interface ProfileDropdownProps {
  user: AuthUser;
}

export default function ProfileDropdown({
  user,
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const refreshToken = useAppSelector(
    (state) => state.auth.refreshToken
  );

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  const initials = fullName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      // Always clear the local session.
      dispatch(logout());
      sessionStorage.removeItem("refreshToken");

      setOpen(false);
      navigate("/login", { replace: true });
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-slate-100"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt=""
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
            {initials}
          </span>
        )}

        <ChevronDown size={16} className="text-slate-500" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl"
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate font-semibold text-slate-900">
                {fullName}
              </p>
              <p className="truncate text-sm text-slate-500">
                {user.email}
              </p>
            </div>

            <Link
              role="menuitem"
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              <UserRound size={17} />
              My profile
            </Link>

            <Link
              role="menuitem"
              to="/profile#settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Settings size={17} />
              Settings
            </Link>

            <button
              role="menuitem"
              type="button"
              disabled={loading}
              onClick={handleLogout}
              className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={17} />
              {loading ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
