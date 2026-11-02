
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { setCredentials, logout } from "../authSlice";
import { refreshAuthToken } from "../../../services/authService";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({
  children,
}: AuthInitializerProps) {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        if (isMounted) setIsInitializing(false);
        return;
      }

      try {
        const response = await refreshAuthToken(refreshToken);

        if (isMounted) {
          dispatch(setCredentials(response));
        }
      } catch {
        sessionStorage.removeItem("refreshToken");
        dispatch(logout());
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isInitializing) {
    return <div>Restoring your session...</div>;
  }

  return <>{children}</>;
}
