// import { Mail } from "lucide-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import PasswordInput from "./PasswordInput";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //Backend API integration will be added in a later task
//   };

//   const handleGoogleLogin = () => {
//     // Connect to Spring Boot OAuth2 endpoint later.
//     console.log("Google login requested");
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div className="mb-8 text-center">
//         <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
//         <p className="mt-2 text-sm text-gray-500">
//           Sign in to continue your job search
//         </p>
//       </div>

//       <button
//         type="button"
//         onClick={handleGoogleLogin}
//         className="w-full flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
//       >
//         <img
//           src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//           alt=""
//           className="h-5 w-5"
//         />{" "}
//         &nbsp; Continue with Google
//       </button>

//       <div className="my-6 flex items-center gap-4">
//         <div className="h-px flex-1 bg-gray-200" />
//         <span>OR</span>
//         <div className="h-px flex-1 bg-gray-200" />
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label
//             htmlFor="email"
//             className="mb-2 block text-sm font-medium text-gray-700"
//           >
//             Email address
//           </label>
//           <div className="relative">
//             <Mail
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               placeholder="you@example.com"
//               autoComplete="email"
//               required
//               className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="mb-2 flex items-center justify-between">
//             <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
//             <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot Password</Link>
//           </div>

//           <PasswordInput value={password} onChange={setPassword} />
//         </div>

//         <label className="flex items-center gap-2 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={(event) => setRememberMe(event.target.checked)}
//             className="h-4 w-4 rounded border-gray-300 accent-blue-600"
//           />
//           Remember me
//         </label>
//         <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">Sign In</button>
//       </form>

//       <p className="mt-7 text-center text-sm text-gray-600">Don't have an acount ?{' '}
//         <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create an acount</Link>
//       </p>
//     </div>
//   );
// }



import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import PasswordInput from "./PasswordInput";
import { loginUser } from "../../../services/authService";
import { setCredentials } from "../authSlice";
import { useAppDispatch } from "../../../app/hook";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      dispatch(setCredentials(response));
      navigate("/");
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err
          ? (err as { response?: { data?: { message?: string } } })
              .response?.data?.message
          : undefined;

      setError(message || "Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth2 integration will be implemented separately.
      const backendUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

    window.location.href = `${backendUrl}/oauth2/authorization/google`;

  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to continue your job search
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt=""
          className="h-5 w-5"
        />
        &nbsp; Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span>OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password
            </Link>
          </div>

          <PasswordInput value={password} onChange={setPassword} />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-blue-600"
          />
          Remember me
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600 hover:text-blue-700"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

