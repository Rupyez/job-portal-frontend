import {
  Bell,
  BriefcaseBusiness,
  FileUser,
  Menu,
  MessageCircle,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import ProfileDropdown from "./ProfileDropDown";

const navigation = [
  { label: "Find Work", to: "/", icon: BriefcaseBusiness },
  { label: "Portfolio", to: "/portfolio", icon: FileUser },
  { label: "Applications", to: "/applications", icon: FileUser },
  { label: "Community", to: "/community", icon: UsersRound },
];

function getNavClass(isActive: boolean) {
  return [
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-sky-50 text-sky-700"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
  ].join(" ");
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  //Temporary demo counts
  const unreadMessages = user ? 3 : 0;
  const unreadNotifications = user ? 5 : 0;

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <BriefcaseBusiness size={22} />
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Job<span className="text-sky-600"> Track</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) => getNavClass(isActive)}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          {user ? (
            <>
              <Link
                to="/message"
                aria-label={`Messages, ${unreadMessages} unread`}
                className="relative rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-sky-700"
              >
                <MessageCircle size={20} />
                <CountBadge count={unreadMessages} />
              </Link>

              <Link
                to="/notifications"
                aria-label={`Notifications, {unreadNotifications} unread`}
                className="relative rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-sky-700"
              >
                <Bell size={20} />
                <CountBadge count={unreadNotifications} />
              </Link>

              <div className="mx-1 h-8 w-px bg-slate-200" />
              <ProfileDropdown user={user} />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 sm:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 sm:hidden">
          <div className="flex flex-col gap-1">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={closeMobileMenu}
                className={({ isActive }) => getNavClass(isActive) + " py-3"}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>

          {user ? (
            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="truncate px-3 py-2 text-sm font-semibold text-slate-800">
                {user.firstName} {user.lastName}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/messages"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-700"
                >
                  <MessageCircle size={17} />
                  Messages ({unreadMessages})
                </Link>

                <Link
                  to="/notifications"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-700"
                >
                  <Bell size={17} />
                  Alerts ({unreadNotifications})
                </Link>
              </div>

              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="mt-2 block rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
              >
                My profile
              </Link>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
              >
                Log in
              </Link>

              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="rounded-lg bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
