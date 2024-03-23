import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { selectToken } from "@/features/usersSlice";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const token = useSelector(selectToken);

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    // Render nothing if !token
    if (!token) return null;

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
