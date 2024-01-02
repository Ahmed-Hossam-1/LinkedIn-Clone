import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.userState.user);
  return user?.email ? children : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
