import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = (props) => {
  const { isUserLoggedIn } = useAuth();

  return (
    <>
      {isUserLoggedIn ? (
        <Route {...props} />
      ) : (
        <Navigate
          state={{
            from: props.path
          }}
          replace
          to="/login"
        />
      )}
    </>
  );
};