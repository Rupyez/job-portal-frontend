
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../../app/hook";
import { exchangeOAuth2Code } from "../../../services/authService"
import { setCredentials } from "../authSlice";

export default function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const code = searchParams.get("code");

    if (!code) {
      setError("Google authentication did not return an authorization code.");
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        const response = await exchangeOAuth2Code(code);

        dispatch(setCredentials(response));
        navigate("/", { replace: true });
      } catch {
        setError(
          "Unable to complete Google sign-in. Please try again."
        );
      }
    };

    completeGoogleLogin();
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
        {error ? (
          <>
            <h1 className="text-xl font-semibold text-red-600">
              Authentication failed
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              {error}
            </p>

            <button
              onClick={() => navigate("/login", { replace: true })}
              className="mt-6 rounded-lg bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
            >
              Return to login
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />

            <h1 className="mt-5 text-xl font-semibold text-slate-900">
              Completing Google sign-in
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we securely authenticate your account.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
