import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    const { token } = useSelector((state) => state.users);

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
